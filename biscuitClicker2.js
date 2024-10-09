        let canvas = document.querySelector(".canvas")
        let canvases = [new Object,new Object,new Object,new Object,new Object];
        canvases[0].canvas = document.getElementById("canvas0");
        canvases[0].ctx= document.getElementById("canvas0").getContext("2d");
        canvases[1].canvas = document.getElementById("canvas1");
        canvases[1].ctx = document.getElementById("canvas1").getContext("2d");
        canvases[2].canvas = document.getElementById("canvas2");
        canvases[2].ctx = document.getElementById("canvas2").getContext("2d");
        canvases[3].canvas = document.getElementById("canvas3");
        canvases[3].ctx = document.getElementById("canvas3").getContext("2d");
        canvases[4].canvas = document.getElementById("canvas4");
        canvases[4].ctx = document.getElementById("canvas4").getContext("2d");
        canvases.push({canvas:document.getElementById("doughDropCanvas"), ctx:document.getElementById("doughDropCanvas").getContext("2d")});
        let doughDropCanvasCtx = document.getElementById("doughDropCanvas").getContext("2d");
        let text = document.querySelector(".text");
        let buttons = [];
        let hoverAreas = [];
        let spritesCanvas0 = [];
        let spritesCanvas1 = [];
        let spritesCanvas2 = [];
        let spritesCanvas3 = [];
        let spritesCanvas4 = [];
        let displayNumbers = [];
        let displayNumbersUpdateFunctions = [];
        let displayTexts = [];

        let scale;

        window.addEventListener("resize", function() { //when window is resized
  
            if(window.innerWidth / 700 < window.innerHeight / 400) {
                let canvasHeight = (window.innerWidth)*(4/7);
                for(let i=0;i<canvases.length;i++) {
                    canvases[i].canvas.style.width = window.innerWidth;
                    canvases[i].canvas.style.height = canvasHeight;
                };
                scale = window.innerWidth/700;
                for (let i =0;i<displayNumbers.length;i++) {
                    displayNumbers[i].style.left = (displayNumbers[i].xpos*scale).toString() + "px";
                    displayNumbers[i].style.top = ((displayNumbers[i].ypos*scale)+((window.innerHeight-canvasHeight)/2)).toString() + "px";
                    displayNumbers[i].style.fontSize = (displayNumbers[i].magnitude*scale).toString() + "px";
                };
                for (let i =0;i<displayTexts.length;i++) {
                    displayTexts[i].style.left = (displayTexts[i].xpos*scale).toString() + "px";
                    displayTexts[i].style.top = ((displayTexts[i].ypos*scale)+((window.innerHeight-canvasHeight)/2)).toString() + "px";
                    displayTexts[i].style.fontSize = (displayTexts[i].magnitude*scale).toString() + "px";
                };
            } 
            
            
            else {
                let canvasWidth = (window.innerHeight)*(7/4);
                for(let i=0;i<canvases.length;i++) {
                    canvases[i].canvas.style.width = canvasWidth;
                    canvases[i].canvas.style.height = window.innerHeight;
                };
                scale = window.innerHeight/400;
                for (let i =0;i<displayNumbers.length;i++) {
                    displayNumbers[i].style.left = ((displayNumbers[i].xpos*scale)+((window.innerWidth-canvasWidth)/2)).toString() + "px";
                    displayNumbers[i].style.top = (displayNumbers[i].ypos*scale).toString() + "px";
                    displayNumbers[i].style.fontSize = (displayNumbers[i].magnitude*scale).toString() + "px";
                };
                for (let i =0;i<displayTexts.length;i++) {
                    displayTexts[i].style.left = ((displayTexts[i].xpos*scale)+((window.innerWidth-canvasWidth)/2)).toString() + "px";
                    displayTexts[i].style.top = (displayTexts[i].ypos*scale).toString() + "px";
                    displayTexts[i].style.fontSize = (displayTexts[i].magnitude*scale).toString() + "px";
                };
            };
    
        });




        function bakeBiscuits() {
            if (biscuitsPerSecond > dough) {
                biscuits += dough;
                dough = 0;
            } else {
                biscuits += biscuitsPerSecond;
                dough -= biscuitsPerSecond;
            }
            /*if(recalculateBiscuitsPerSecond == true) {
                calculateBiscuitsPerSecond();
                recalculateBiscuitsPerSecond = false;
            };*/
            updateDisplayNumbers()

        };


        let bakeBiscuitsLoop = setInterval(bakeBiscuits, 1000)


        
         //buttons

        function makeButton(xpos,ypos, width,height, onpress) {
            this.pos = [xpos, ypos]; //pos[0] is width  pos[1] is height
            this.dimensions = [width, height]; //dimensions[0] is width  dimensions[1] is height
            this.onpress = onpress; //function for when the button is pressed
        };

        function makeHoverArea(xpos,ypos, width,height, onMouseEnter, onMouseExit) {
            this.pos = [xpos, ypos]; //pos[0] is width  pos[1] is height
            this.dimensions = [width, height]; //dimensions[0] is width  dimensions[1] is height
            this.onMouseEnter = onMouseEnter; //function for when mouse enters
            this.onMouseExit = onMouseExit; // function for when mouse exits 
            this.mouseInside = false; //checks if the mouse is inside the area
        };



        //collision detection
        document.addEventListener("click", function(e) {
            let mouseX = (e.clientX-((window.innerWidth-canvases[0].canvas.offsetWidth)/2)) / scale;
            let mouseY = (e.clientY-((window.innerHeight-canvases[0].canvas.offsetHeight)/2)) / scale;
    
            for(let i = 0; i<buttons.length; i++) {
                if(mouseX > buttons[i].pos[0] && //left
                   mouseX < buttons[i].pos[0] + buttons[i].dimensions[0] && //right
                   mouseY > buttons[i].pos[1] &&//top
                   mouseY < buttons[i].pos[1] + buttons[i].dimensions[1]) { //bottom
                       buttons[i].onpress();
                       break;
                   };
                };

        });

        document.addEventListener("touch", function(e) {
            let mouseX = (e.clientX-((window.innerWidth-canvases[0].canvas.offsetWidth)/2)) / scale;
            let mouseY = (e.clientY-((window.innerHeight-canvases[0].canvas.offsetHeight)/2)) / scale;
    
            for(let i = 0; i<buttons.length; i++) {
                if(mouseX > buttons[i].pos[0] && //left
                   mouseX < buttons[i].pos[0] + buttons[i].dimensions[0] && //right
                   mouseY > buttons[i].pos[1] &&//top
                   mouseY < buttons[i].pos[1] + buttons[i].dimensions[1]) { //bottom
                       buttons[i].onpress();
                       break;
                   };
                };

        });

        document.addEventListener("mousemove",function(e) { //check hover areas
            let mouseX = (e.clientX-((window.innerWidth-canvases[0].canvas.offsetWidth)/2)) / scale;
            let mouseY = (e.clientY-((window.innerHeight-canvases[0].canvas.offsetHeight)/2)) / scale;
    
            for(let i = 0; i<hoverAreas.length; i++) {
                if(mouseX > hoverAreas[i].pos[0] && //left
                   mouseX < hoverAreas[i].pos[0] + hoverAreas[i].dimensions[0] && //right
                   mouseY > hoverAreas[i].pos[1] &&//top
                   mouseY < hoverAreas[i].pos[1] + hoverAreas[i].dimensions[1]) { //bottom
                       if (hoverAreas[i].mouseInside == false) {
                           hoverAreas[i].onMouseEnter();
                           hoverAreas[i].mouseInside = true;
                       };
                   } else {
                    if(hoverAreas[i].mouseInside == true) {
                        hoverAreas[i].onMouseExit();
                        hoverAreas[i].mouseInside = false;
                    };
                   };
                }; 
        });

        document.addEventListener("touch",function(e) { //check hover areas
            let mouseX = (e.clientX-((window.innerWidth-canvases[0].canvas.offsetWidth)/2)) / scale;
            let mouseY = (e.clientY-((window.innerHeight-canvases[0].canvas.offsetHeight)/2)) / scale;
    
            for(let i = 0; i<hoverAreas.length; i++) {
                if(mouseX > hoverAreas[i].pos[0] && //left
                   mouseX < hoverAreas[i].pos[0] + hoverAreas[i].dimensions[0] && //right
                   mouseY > hoverAreas[i].pos[1] &&//top
                   mouseY < hoverAreas[i].pos[1] + hoverAreas[i].dimensions[1]) { //bottom
                       if (hoverAreas[i].mouseInside == false) {
                           hoverAreas[i].onMouseEnter();
                           hoverAreas[i].mouseInside = true;
                       };
                   } else {
                    if(hoverAreas[i].mouseInside == true) {
                        hoverAreas[i].onMouseExit();
                        hoverAreas[i].mouseInside = false;
                    };
                   };
                }; 
        });





        //text writing

        function displayNumber(valueUpdate, xpos, ypos, magnitude, z = 0, beforeText = "", afterText = "", font = "copperplate", fontColour ="orange") {
            let i = displayNumbers.push(document.createElement("div"));
            let i_1 = i-1
            text.appendChild(displayNumbers[i_1]);
            displayNumbers[i_1].style.position = "absolute";

            if(window.innerWidth / 700 < window.innerHeight / 400) {
                let canvasHeight = (window.innerWidth)*(4/7);
                    displayNumbers[i_1].style.left = (xpos*scale).toString() + "px";
                    displayNumbers[i_1].style.top = ((ypos*scale)+((window.innerHeight-canvasHeight)/2)).toString() + "px";
                    displayNumbers[i_1].style.fontSize = (magnitude*scale).toString() + "px";
            } else {
                let canvasWidth = (window.innerHeight)*(7/4);
                    displayNumbers[i_1].style.left = ((xpos*scale)+((window.innerWidth-canvasWidth)/2)).toString() + "px";
                    displayNumbers[i_1].style.top = (ypos*scale).toString() + "px";
                    displayNumbers[i_1].style.fontSize = (magnitude*scale).toString() + "px";
            };

            displayNumbers[i_1].xpos = xpos;
            displayNumbers[i_1].ypos = ypos;
            displayNumbers[i_1].magnitude = magnitude;
            displayNumbers[i_1].style.zIndex = z.toString();
            displayNumbers[i_1].beforeText = beforeText;
            displayNumbers[i_1].afterText = afterText;
            displayNumbers[i_1].style.fontFamily = font;
            displayNumbers[i_1].style.color = fontColour;
            displayNumbers[i_1].innerHTML = ""
            displayNumbersUpdateFunctions.push(valueUpdate) //valueUpdate is a function that defines the number
            updateDisplayNumbers();
            return i-1;
        };

        function updateDisplayNumbers(numberId = 12345678) {
            if (numberId == 12345678) {
              for(let i = 0; i < displayNumbersUpdateFunctions.length; i++) {
                 
                  displayNumbers[i].innerHTML = displayNumbers[i].beforeText + abbreviateNumber(displayNumbersUpdateFunctions[i]()) + displayNumbers[i].afterText
              }
            } else {
                displayNumbers[numberId].innerHTML = displayNumbers[numberId].beforeText + abbreviateNumber(displayNumbersUpdateFunctions[numberId]()) + displayNumbers[numberId].afterText
            }
            
        };

        function displayText(textToDisplay, xpos, ypos, magnitude, z=0, font="copperplate", fontColour="orange") {
            let i = displayTexts.push(document.createElement("div"));
            let i_1 = i-1;
            text.appendChild(displayTexts[i_1]);
            displayTexts[i_1].style.position = "absolute";

            if(window.innerWidth / 700 < window.innerHeight / 400) {
                let canvasHeight = (window.innerWidth)*(4/7);
                    displayTexts[i_1].style.left = (xpos*scale).toString() + "px";
                    displayTexts[i_1].style.top = ((ypos*scale)+((window.innerHeight-canvasHeight)/2)).toString() + "px";
                    displayTexts[i_1].style.fontSize = (magnitude*scale).toString() + "px";
            } else {
                let canvasWidth = (window.innerHeight)*(7/4);
                    displayTexts[i_1].style.left = ((xpos*scale)+((window.innerWidth-canvasWidth)/2)).toString() + "px";
                    displayTexts[i_1].style.top = (ypos*scale).toString() + "px";
                    displayTexts[i_1].style.fontSize = (magnitude*scale).toString() + "px";
            };

            displayTexts[i_1].xpos = xpos;
            displayTexts[i_1].ypos = ypos;
            displayTexts[i_1].magnitude = magnitude;
            displayTexts[i_1].style.zIndex = z.toString();
            displayTexts[i_1].style.fontFamily = font;
            displayTexts[i_1].style.color = fontColour;
            displayTexts[i_1].innerHTML = textToDisplay;
            return i_1;
        };
        let test1 = document.createElement("div")
        document.body.append(test1)
        test1.innerHTML = "pineapple"


        let abbreviations = ["", "K", "M", "B","T","Q","Qn","S","Sp","O","N","D","Ud","Dd","Td"]
        function abbreviateNumber(number) {
            if (number != 0) {
            let placeholderValue = Math.floor(Math.log10(number)/3);
            return (number/(1000**placeholderValue)).toPrecision(3) + abbreviations[placeholderValue] 
            } else {
                return "0";
            };
        };


        //sprite declaration
        function spawnSprite(img, xpos, ypos, width, height, ctx) {
            this.sprite = new Image(width, height);
            this.sprite.src = img;
            this.img = img;
            this.xpos = xpos;
            this.ypos = ypos;
            this.width = width;
            this.height = height;
            let imgtest = this.sprite;
            this.sprite.onload = function() {
              ctx.drawImage(imgtest, xpos, ypos, width, height);
            };
        };

        function redrawCanvas(ctx,sprites) {
            ctx.clearRect(0,0,700,400);
            for(let i = 0; i < sprites.length; i++) {
                ctx.drawImage(sprites[i].sprite, sprites[i].xpos, sprites[i].ypos, sprites[i].width, sprites[i].height);
            };
        };

        function multiSplice(array,indexes=[]) {
            indexes.sort(function(a,b){return b-a});
            for(let i=0;i<indexes.length;i++) {
                array.splice(indexes[i],1);
            };
        } ;
































        //declare variables

        let dough = 0;
        let biscuits = 10;
        let doughClickAmount = 1;
        let fallingDoughArray = [];
        function calculateDoughClickAmount() {
            doughClickAmount = 1*dough1Bonus;
        };
        function clickedDough() {
            dough += doughClickAmount;
            fallingDoughArray.push(new fallingDough((Math.random()*360)+140,30,30,30,"30x30dough_b2.png",0,0));
            updateDisplayNumbers();
        };
        class fallingDough {
            constructor(x,y,width,height,src,rotation=0,speed=0) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.speed = speed;
                this.rotation = rotation;
                this.sprite = new Image(width,height);
                this.sprite.src = src;
            };
            fall() {
                this.y += this.speed;
                this.speed += 1;
            };
            draw() {
                doughDropCanvasCtx.drawImage(this.sprite,this.x,this.y,this.width,this.height);
            };
        };
        function updateFallingDough() {
            doughDropCanvasCtx.clearRect(0,0,700,400);
            for(let i=0; i<fallingDoughArray.length; i++) {
                fallingDoughArray[i].fall()
                if(fallingDoughArray[i].y > 400) {
                    fallingDoughArray.splice(i,1);
                };
                fallingDoughArray[i].draw();
            };
            doughDropCanvasCtx.clearRect(0,0,700,65);
        };
        setInterval(updateFallingDough,33);


        let biscuitsPerSecond = 0;
        let recalculateBiscuitsPerSecond = false;
        function calculateBiscuitsPerSecond() {
            if(recalculateBiscuitsPerSecond == true) {
            biscuitsPerSecond = ovens*oven1Bonus;
            recalculateBiscuitsPerSecond = false;
            };
        };
        setInterval(calculateBiscuitsPerSecond,1000);


        //buildings
        let buildingBuyAmount
        let sellBuildings = false;

        let ovens = 0;
        let ovenCost = 10;
        let ovenCostMulti = 1.3;
        let canAffordOven = true;


  
  
        //upgrades
        let upgradesUnlocked = false;

        function upgradesUnlock() {
            if(ovens >= 5 || upgradesUnlocked == true) {
                upgradesUnlocked = true;
                clearInterval(unlockUpgradesInterval);
            };
        };

        let unlockUpgradesInterval = setInterval(upgradesUnlock,1000);

        let dough1Cost = 50;
        let dough1Bonus = 1;
        let dough1Level = 0;

        let oven1Cost = 450;
        let oven1Bonus = 1;
        let oven1Level = 0;

        let autoClickerUnlocked  = false;
        let autoClickerTime = 2000;
        let autoClicker1CostDough = 500;
        let autoClicker1CostBiscuits = 1500;
        function startAutoClicker() {
            dough += doughClickAmount;
            setTimeout(startAutoClicker,autoClickerTime);
        };






        function loadData() {                                                                                                   //load data
            dough = Number(localStorage.getItem("dough")); 
            biscuits = Number(localStorage.getItem("biscuits"));

            ovens = Number(localStorage.getItem("ovens"));
            ovenCost = 10 * (ovenCostMulti**ovens);

            if (localStorage.getItem("upgradesUnlocked") === "true") {
                upgradesUnlocked = true;
            };
            dough1Level = Number(localStorage.getItem("dough1Level"));
            dough1Cost = 50 * (1.7**dough1Level);
            dough1Bonus = 1.3**dough1Level;
            oven1Level = Number(localStorage.getItem("oven1Level"));
            oven1Bonus = 1.3**oven1Level;
            oven1Cost = 450 * (1.5**oven1Level);

            if(localStorage.getItem("autoClickerUnlocked" === "true")){
                autoClickerUnlocked = true;
                startAutoClicker();
            };
            autoClickerTime = Number(localStorage.getItem("autoClickerTime"));

            calculateDoughClickAmount();
            calculateBiscuitsPerSecond();
            updateDisplayNumbers();
        };

        if(localStorage.getItem("savingSetUp")) {
            loadData();
        };





        //start game

        function startGame() {

        function saveGame() {       
            localStorage.setItem("savingSetUp",true)                                                                                       //save data
            localStorage.setItem("dough",dough.toString());
            localStorage.setItem("biscuits",biscuits.toString());
            localStorage.setItem("ovens",ovens.toString());
            localStorage.setItem("upgradesUnlocked",upgradesUnlocked.toString());
            localStorage.setItem("dough1Level",dough1Level.toString());
            localStorage.setItem("oven1Level",oven1Level.toString());
            localStorage.setItem("autoClickerUnlocked",autoClickerUnlocked.toString());
            localStorage.setItem("autoClickerTime",autoClickerTime());
        };
        setInterval(saveGame,2000)


        spritesCanvas0.push(new spawnSprite("clickingBackground_b2.png",0,0,700,400,canvases[0].ctx));
        buttons.push(new makeButton(65,0, 635,400, function() { //clicking area
            clickedDough()
        }));

        displayNumber(function() {return dough}, 230, 150, 30, 1, "", " dough", "copperplate", "white"); //dough amount
        spritesCanvas0.push(new spawnSprite("30x30dough_b2.png",200,157,30,30,canvases[0].ctx));
        displayNumber(function() {return biscuits}, 230, 200, 30, 1, "", " biscuits", "copperplate", "white"); //biscuit amount
        spritesCanvas0.push(new spawnSprite("30x30biscuit_b2.png",200,207,30,30,canvases[0].ctx));
        displayNumber(function(){return biscuitsPerSecond}, 240, 232, 12, 1, "("," per second)","copperplate","white");




        function spawnMenuButtons() {


        spritesCanvas1.push(new spawnSprite("menuButtonsBg_b2.png",0,0,65,400,canvases[1].ctx));


        spritesCanvas2.push(new spawnSprite("openBuildingsMenuButton_b2.png",0,10,65,75,canvases[2].ctx));


        buttons.push(new makeButton(0,10,65,75, function() { //open buildings menu

            buttons = [];
            spritesCanvas1 = [];
            spritesCanvas2 = [];
            spritesCanvas3 = [];
            canvases[1].ctx.clearRect(0,0,700,400);
            canvases[2].ctx.clearRect(0,0,700,400);
            canvases[3].ctx.clearRect(0,0,700,400);
            canvases[1].ctx.fillStyle = "beige";
            canvases[1].ctx.fillRect(0,0,400,400);





            function drawBuyBuildingButtons() {
                if(canAffordOven == true) {
                    spritesCanvas2[ovenBuyButtonIndex] = new spawnSprite("buyBuildingButtonTrue_b2.png",20,50,360,60,canvases[2].ctx);
                    redrawCanvas(canvases[2].ctx,spritesCanvas2);
                } else {
                    spritesCanvas2[ovenBuyButtonIndex] = new spawnSprite("buyBuildingButtonFalse_b2.png",20,50,360,60,canvases[2].ctx);
                    redrawCanvas(canvases[2].ctx,spritesCanvas2);
                };
            };

            function drawSellBuildingButtons() {
                if(ovens > 0) {
                    spritesCanvas2[ovenBuyButtonIndex] = new spawnSprite("sellBuildingButtonTrue_b2.png",20,50,360,60,canvases[2].ctx);
                    redrawCanvas(canvases[2].ctx,spritesCanvas2);
                } else {
                    spritesCanvas2[ovenBuyButtonIndex] = new spawnSprite("buyBuildingButtonFalse_b2.png",20,50,360,60,canvases[2].ctx);
                    redrawCanvas(canvases[2].ctx,spritesCanvas2);
                };
            };

            function checkForDrawBuyBuildingButtons() {
                if (sellBuildings) {
                    drawSellBuildingButtons();
                    return
                };
                if (biscuits >= ovenCost) {
                    canAffordOven = true;
                } else {
                    canAffordOven = false;
                };
                drawBuyBuildingButtons()
            };

            let drawBuyBuildingButtonsLoop = setInterval(checkForDrawBuyBuildingButtons,200);




            let toggleSellBuildingsButtonIndex = spritesCanvas2.push(new spawnSprite("toggleSellBuildingsSell_b2.png",30,20,50,20,canvases[2].ctx))-1;

            buttons.unshift(new makeButton(30,20,50,20,function() {
                if(sellBuildings) {
                    sellBuildings = false;
                    spritesCanvas2[toggleSellBuildingsButtonIndex] = new spawnSprite("toggleSellBuildingsSell_b2.png",30,20,50,20,canvases[2].ctx);
                    updateDisplayNumbers();
                } else {
                    sellBuildings = true;
                    spritesCanvas2[toggleSellBuildingsButtonIndex] = new spawnSprite("toggleSellBuildingsBuy_b2.png",30,20,50,20,canvases[2].ctx);
                    updateDisplayNumbers();
                };
            }));





            let ovenBuyButtonIndex = (spritesCanvas2.push(new spawnSprite("buyBuildingButtonFalse_b2.png",20,50,360,60,canvases[2].ctx)))-1;
            spritesCanvas3.push(new spawnSprite("70x60oven_b2.png",20,50,70,60,canvases[3].ctx));
            let ovenCostText = displayNumber(function(){if(sellBuildings){if(ovens>0){return ovenCost/3}else{return 0}}return ovenCost},90,80,20,11,""," biscuits","copperplate","black");
            let ovenAmountText = displayNumber(function(){return ovens},90,55,20,11,""," ovens","copperplate","black");
            buttons.push(new makeButton(20,50,360,60,function() {
                if (sellBuildings) { //sell oven
                    if (ovens > 0) {
                        ovens -= 1;
                        biscuits += 1/ovenCostMulti;
                        ovenCost *= 10/13;
                        recalculateBiscuitsPerSecond = true
                        updateDisplayNumbers()
                        return;
                    };
                    return;
                };
                if(biscuits >= ovenCost) { //buy oven
                    biscuits -= ovenCost;
                    ovens += 1
                    ovenCost *= ovenCostMulti;
                    recalculateBiscuitsPerSecond = true;
                    updateDisplayNumbers();
                    return;
                };
            }));




            spritesCanvas2.push(new spawnSprite("60x60X_b2.png",395,8,60,60,canvases[2].ctx));
            buttons.push(new makeButton(395,8,60,60,function() {
                buttons = [];
                buttons.push(new makeButton(65,0, 635,400, function() { 
                    clickedDough()
                }));


            buttons.push(new makeButton(400,0, 300,400, function() { 
                clickedDough()
            }));


                text.removeChild(displayNumbers[ovenCostText]);
                text.removeChild(displayNumbers[ovenAmountText]);
                multiSplice(displayNumbers,[ovenCostText,ovenAmountText]);
                multiSplice(displayNumbersUpdateFunctions,[ovenCostText,ovenAmountText]);
                clearInterval(drawBuyBuildingButtonsLoop);
                spritesCanvas1 = [];
                spritesCanvas2 = [];
                spritesCanvas3 = [];
                canvases[1].ctx.clearRect(0,0,700,400);
                canvases[2].ctx.clearRect(0,0,700,400);
                canvases[3].ctx.clearRect(0,0,700,400);
                sellBuildings = false;
                spawnMenuButtons();

            }));

        }));
















        if(upgradesUnlocked == true) {
            spritesCanvas2.push(new spawnSprite("openUpgradesMenuButton_b2.png",0,100,65,75,canvases[2].ctx));


            buttons.push(new makeButton(0,100,65,75,function() {                                        //opens upgrade menu
                buttons = [];
                spritesCanvas1 = [];
                spritesCanvas2 = [];
                spritesCanvas3 = [];
                canvases[1].ctx.clearRect(0,0,700,400);
                canvases[2].ctx.clearRect(0,0,700,400);
                canvases[3].ctx.clearRect(0,0,700,400);
                spritesCanvas1.push(new spawnSprite("upgradesMenuBg_b2.png",0,0,400,400,canvases[1].ctx));


                spritesCanvas2.push(new spawnSprite("60x60X_b2.png",395,8,60,60,canvases[2].ctx));                       //exit upgrade menu
                buttons.push(new makeButton(395,8,60,60,function() {
                    buttons = [];
                    buttons.push(new makeButton(65,0, 635,400, function() { 
                        clickedDough()
                    }));



                buttons.push(new makeButton(400,0, 300,400, function() { 
                    clickedDough()
                }));


                    clearInterval(redrawBuyUpgradeButtonsInterval);
                    spritesCanvas1 = [];
                    spritesCanvas2 = [];
                    spritesCanvas3 = [];
                    spritesCanvas4 = [];
                    canvases[1].ctx.clearRect(0,0,700,400);
                    canvases[2].ctx.clearRect(0,0,700,400);
                    canvases[2].ctx.globalAlpha = 1;
                    canvases[3].ctx.clearRect(0,0,700,400);
                    canvases[4].ctx.clearRect(0,0,700,400);
                    hoverAreas = [];
                    spawnMenuButtons();
                }));




                spritesCanvas3.push(new spawnSprite("30x30dough_b2.png",185,20,30,30,canvases[3].ctx));                                            //dough 1
                let buyDough1ButtonIndex = spritesCanvas2.push(new spawnSprite("buyUpgradeButtonTrue_b2.png",180,15,40,40,canvases[2].ctx))-1;

                let dough1TitleText;
                let dough1DescriptionText;
                let dough1LevelText;
                let dough1CostText;
                let dough1BonusText;

                hoverAreas.push(new makeHoverArea(180,15,40,40,
                function() { //on mouse enter
                    canvases[4].ctx.fillstyle = "black";
                    canvases[4].ctx.fillRect(225,15,200,300)
                    dough1TitleText = displayText("Dough 1",275,20,20,21,"copperplate","white");
                    dough1DescriptionText = displayText("Increases dough per click by <br>30% (multiplicative)",230,100,10,21,"copperplate","white");
                    dough1CostText = displayNumber(function(){return dough1Cost},230,280,15,21,"Cost: "," biscuits","copperplate","white");
                    dough1BonusText = displayNumber(function(){return dough1Bonus},230,265,12,21,"Current bonus: ","x", "copperplate","white");
                    dough1LevelText = displayNumber(function(){return dough1Level},230,250,12,21,"Current level: ","/20","copperplate","white");
                },
                function() { //on mouse exit
                    canvases[4].ctx.clearRect(0,0,700,400);
                    text.removeChild(displayTexts[dough1TitleText]);
                    text.removeChild(displayTexts[dough1DescriptionText]);
                    text.removeChild(displayNumbers[dough1CostText]);
                    text.removeChild(displayNumbers[dough1BonusText]);
                    text.removeChild(displayNumbers[dough1LevelText]);
                    multiSplice(displayTexts, [dough1TitleText,dough1DescriptionText]);
                    multiSplice(displayNumbers, [dough1CostText,dough1BonusText,dough1LevelText])
                    multiSplice(displayNumbersUpdateFunctions, [dough1CostText,dough1BonusText,dough1LevelText]);
                }));

                buttons.push(new makeButton(180,15,40,40,function() {
                    if(biscuits >= dough1Cost && dough1Level < 30) {
                        biscuits -= dough1Cost;
                        dough1Level += 1;
                        dough1Bonus *= 1.3;
                        dough1Cost *= 1.7;
                        updateDisplayNumbers();
                        calculateDoughClickAmount();
                    };
                }));





                spritesCanvas3.push(new spawnSprite("70x60oven_b2.png",110,20,30,30,canvases[3].ctx));                                              //oven 1
                let buyOven1ButtonIndex = spritesCanvas2.push(new spawnSprite("buyUpgradeButtonTrue_b2.png",105,15,40,40,canvases[2].ctx))-1;

                let oven1TitleText;
                let oven1DescriptionText;
                let oven1LevelText;
                let oven1CostText;
                let oven1BonusText;

                hoverAreas.push(new makeHoverArea(105,15,40,40,
                function(){    //on mouse enter
                    canvases[4].ctx.fillStyle = "black";
                    canvases[4].ctx.fillRect(150,15,200,300);
                    oven1TitleText = displayText("Oven 1",200,20,20,21,"copperplate","white");
                    oven1DescriptionText = displayText("Increases biscuits baked per <br>oven by 10% (multiplicative)",155,100,10,21,"copperplate","white");
                    oven1CostText = displayNumber(function(){return oven1Cost},155,280,15,21,"Cost: "," biscuits","copperplate","white");
                    oven1BonusText = displayNumber(function(){return oven1Bonus},155,265,12,21,"Current bonus: ", "x", "copperplate","white");
                    oven1LevelText = displayNumber(function(){return oven1Level},155,250,12,21,"Current level: ", "/50", "copperplate","white");
                    },
                function(){   //on mouse exit
                    canvases[4].ctx.clearRect(0,0,700,400);
                    text.removeChild(displayTexts[oven1TitleText]);
                    text.removeChild(displayTexts[oven1DescriptionText]);
                    text.removeChild(displayNumbers[oven1CostText]);
                    text.removeChild(displayNumbers[oven1BonusText]);
                    text.removeChild(displayNumbers[oven1LevelText]);
                    multiSplice(displayTexts, [oven1TitleText,oven1DescriptionText]);
                    multiSplice(displayNumbers, [oven1CostText,oven1BonusText,oven1LevelText]);
                    multiSplice(displayNumbersUpdateFunctions, [oven1CostText,oven1BonusText,oven1LevelText]);
                }));

                buttons.push(new makeButton(105,15,40,40,
                    function(){
                        if(biscuits > oven1Cost && oven1Level < 50) {
                            biscuits -= oven1Cost;
                            oven1Level += 1;
                            oven1Bonus *= 1.3;
                            oven1Cost *= 1.5;
                            recalculateBiscuitsPerSecond = true;
                            updateDisplayNumbers();
                        };
                    }));


                

                spritesCanvas3.push(new spawnSprite("30x30cursor_b2.png",260,20,30,30,canvases[3].ctx));                                             //autoclicker1
                spritesCanvas3.push(new spawnSprite("100x100gears_b2.png",260,32,20,20,canvases[3].ctx));
                let buyAutoClicker1ButtonIndex = spritesCanvas2.push(new spawnSprite("buyUpgradeButtonTrue_b2.png",255,15,40,40,canvases[2].ctx))-1;

                let autoClicker1TitleText;
                let autoClicker1DescriptionText;
                let autoClicker1CostDoughText;
                let autoClicker1CostBiscuitsText;

                hoverAreas.push(new makeHoverArea(255,15,40,40,
                function() {      //on mouse enter
                    canvases[4].ctx.fillstyle = "black";
                    canvases[4].ctx.fillRect(300,15,200,300);
                    autoClicker1TitleText = displayText("Autoclicker",320,20,20,21,"copperplate","white");
                    autoClicker1DescriptionText = displayText("Automatically clicks every 2 seconds",305,100,10,21,"copperplate","white");
                    autoClicker1CostDoughText = displayNumber(function(){return autoClicker1CostDough},305,265,15,21,"Cost: ", " dough","copperplate","white");
                    autoClicker1CostBiscuitsText = displayNumber(function(){return autoClicker1CostBiscuits},350,280,15,21,""," biscuits","copperplate","white");
                },
                function(){       //on mouse exit
                    canvases[4].ctx.clearRect(0,0,700,400);
                    text.removeChild(displayTexts[autoClicker1TitleText]);
                    text.removeChild(displayTexts[autoClicker1DescriptionText]);
                    text.removeChild(displayNumbers[autoClicker1CostDoughText]);
                    text.removeChild(displayNumbers[autoClicker1CostBiscuitsText]);
                    multiSplice(displayTexts,[autoClicker1TitleText,autoClicker1DescriptionText]);
                    multiSplice(displayNumbers,[autoClicker1CostDoughText,autoClicker1CostBiscuitsText]);
                    multiSplice(displayNumbersUpdateFunctions,[autoClicker1CostDoughText,autoClicker1CostBiscuitsText]);
                }));

                buttons.push(new makeButton(255,15,200,300,
                    function() {
                        if(dough >= autoClicker1CostDough && biscuits >= autoClicker1CostBiscuits && autoClickerUnlocked == false) {
                            dough -= autoClicker1CostDough;
                            biscuits -= autoClicker1CostBiscuits;
                            autoClickerUnlocked = true;
                            startAutoClicker();
                            updateDisplayNumbers();
                        };
                    }));

                


 



                function redrawBuyUpgradeButtons() {                                                                          //redraw/update buy upgrade buttons 
                    if (dough1Level < 20) {
                        if(biscuits >= dough1Cost) {                                                                                            //dough 1
                            canvases[2].ctx.clearRect(180,15,40,40);
                            spritesCanvas2[buyDough1ButtonIndex] = new spawnSprite("buyUpgradeButtonTrue_b2.png",180,15,40,40,canvases[2].ctx);
                        } else {
                            canvases[2].ctx.clearRect(180,15,40,40);
                            spritesCanvas2[buyDough1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",180,15,40,40,canvases[2].ctx);
                        };
                    } else {
                        canvases[2].clearRect(180,15,40,40);
                        spritesCanvas2[buyDough1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",180,15,40,40,canvases[2].ctx);
                        spritesCanvas2[buyDough1ButtonIndex] = new spawnSprite("upgradeMaxed_b2.png",180,15,40,40,canvases[3].ctx);
                    }

                    if(oven1Level < 50) {
                    if(biscuits >= oven1Cost) {                                                                                              //oven 1
                            canvases[2].ctx.clearRect(105,15,40,40);
                            spritesCanvas2[buyOven1ButtonIndex] = new spawnSprite("buyUpgradeButtonTrue_b2.png",105,15,40,40,canvases[2].ctx);
                        } else {
                            canvases[2].ctx.clearRect(105,15,40,40);
                            spritesCanvas2[buyOven1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",105,15,40,40,canvases[2].ctx);
                        };
                    } else {
                        canvases[2].clearRect(105,15,40,40);
                        spritesCanvas2[buyOven1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",105,15,40,40,canvases[2].ctx);
                        spritesCanvas2[buyOven1ButtonIndex] = new spawnSprite("upgradeMaxed_b2.png",105,15,40,40,canvases[3].ctx)
                    }

                    if (autoClickerUnlocked == false) {                                                                                     //autoclicker 1
                        if(dough >= autoClicker1CostDough && biscuits >= autoClicker1CostBiscuits) {
                            canvases[2].ctx.clearRect(255,15,40,40);
                            spritesCanvas2[buyAutoClicker1ButtonIndex] = new spawnSprite("buyUpgradeButtonTrue_b2.png",255,15,40,40,canvases[2].ctx);
                        } else {
                            canvases[2].ctx.clearRect(255,15,40,40);
                            spritesCanvas2[buyAutoClicker1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",255,15,40,40,canvases[2].ctx);
                        };
                    } else {
                        canvases[2].ctx.clearRect(255,15,40,40);
                        spritesCanvas2[buyAutoClicker1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",255,15,40,40,canvases[2].ctx);
                        spritesCanvas2[buyAutoClicker1ButtonIndex] = new spawnSprite("upgradeMaxed_b2.png",255,15,40,40,canvases[3].ctx);
                    };
                };

                let redrawBuyUpgradeButtonsInterval = setInterval(redrawBuyUpgradeButtons,200);


            }));
        };






        };

        spawnMenuButtons();

      
       };
       setTimeout(startGame,100)





























        if(window.innerWidth / 700 < window.innerHeight / 400) {
            let canvasHeight = (window.innerWidth)*(4/7);
            for(let i=0;i<canvases.length;i++) {
                canvases[i].canvas.style.width = window.innerWidth;
                canvases[i].canvas.style.height = canvasHeight;
            };
            scale = window.innerWidth/700;
            for (let i =0;i<displayNumbers.length;i++) {
                displayNumbers[i].style.left = (displayNumbers[i].xpos*scale).toString() + "px";
                displayNumbers[i].style.top = ((displayNumbers[i].ypos*scale)+((window.innerHeight-canvasHeight)/2)).toString() + "px";
                displayNumbers[i].style.fontSize = (displayNumbers[i].magnitude*scale).toString() + "px";
            };
            for (let i =0;i<displayTexts.length;i++) {
                displayTexts[i].style.left = (displayTexts[i].xpos*scale).toString() + "px";
                displayTexts[i].style.top = ((displayTexts[i].ypos*scale)+((window.innerHeight-canvasHeight)/2)).toString() + "px";
                displayTexts[i].style.fontSize = (displayTexts[i].magnitude*scale).toString() + "px";
            };
        } 
        
        
        else {
            let canvasWidth = (window.innerHeight)*(7/4);
            for(let i=0;i<canvases.length;i++) {
                canvases[i].canvas.style.width = canvasWidth;
                canvases[i].canvas.style.height = window.innerHeight;
            };
            scale = window.innerHeight/400;
            for (let i =0;i<displayNumbers.length;i++) {
                displayNumbers[i].style.left = ((displayNumbers[i].xpos*scale)+((window.innerWidth-canvasWidth)/2)).toString() + "px";
                displayNumbers[i].style.top = (displayNumbers[i].ypos*scale).toString() + "px";
                displayNumbers[i].style.fontSize = (displayNumbers[i].magnitude*scale).toString() + "px";
            };
            for (let i =0;i<displayTexts.length;i++) {
                displayTexts[i].style.left = ((displayTexts[i].xpos*scale)+((window.innerWidth-canvasWidth)/2)).toString() + "px";
                displayTexts[i].style.top = (displayTexts[i].ypos*scale).toString() + "px";
                displayTexts[i].style.fontSize = (displayTexts[i].magnitude*scale).toString() + "px";
            };
        };
