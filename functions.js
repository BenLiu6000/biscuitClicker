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

            for(let i=0;i<tins.length;i++) { 
                if(Tin.checkIfClicked(mouseX,mouseY,tins[i])) {
                    Tin.handleClicked(tins[i])
                };
            };

        });

        document.addEventListener("touchend", function(e) {
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

        let hoverAreasEnterFunctionsToRun = [];  //to prevent ordering issues when entering or exiting multiple hover areas at once
        let hoverAreasExitFunctionsToRun = [];
        document.addEventListener("mousemove",function(e) { //check hover areas
            let mouseX = (e.clientX-((window.innerWidth-canvases[0].canvas.offsetWidth)/2)) / scale;
            let mouseY = (e.clientY-((window.innerHeight-canvases[0].canvas.offsetHeight)/2)) / scale;
    
            for(let i = 0; i<hoverAreas.length; i++) {
                if(mouseX > hoverAreas[i].pos[0] && //left
                   mouseX < hoverAreas[i].pos[0] + hoverAreas[i].dimensions[0] && //right
                   mouseY > hoverAreas[i].pos[1] &&//top
                   mouseY < hoverAreas[i].pos[1] + hoverAreas[i].dimensions[1]) { //bottom
                       if (hoverAreas[i].mouseInside == false) {
                        hoverAreas[i].mouseInside = true;
                        hoverAreasEnterFunctionsToRun.push(i);
                       };
                   } else {
                    if(hoverAreas[i].mouseInside == true) {
                        hoverAreas[i].mouseInside = false;
                        hoverAreasExitFunctionsToRun.push(i);
                    };
                   };
                }; 

            for(let i=0;i<hoverAreasExitFunctionsToRun.length;i++) {
                hoverAreas[hoverAreasExitFunctionsToRun[i]].onMouseExit();
            };
            hoverAreasExitFunctionsToRun = [];
            for(let i=0;i<hoverAreasEnterFunctionsToRun.length;i++) {
                hoverAreas[hoverAreasEnterFunctionsToRun[i]].onMouseEnter();
            };
            hoverAreasEnterFunctionsToRun = [];
        });


        document.addEventListener("touchmove",function(e) { //check hover areas
            let mouseX = (e.clientX-((window.innerWidth-canvases[0].canvas.offsetWidth)/2)) / scale;
            let mouseY = (e.clientY-((window.innerHeight-canvases[0].canvas.offsetHeight)/2)) / scale;
    
            for(let i = 0; i<hoverAreas.length; i++) {
                if(mouseX > hoverAreas[i].pos[0] && //left
                   mouseX < hoverAreas[i].pos[0] + hoverAreas[i].dimensions[0] && //right
                   mouseY > hoverAreas[i].pos[1] &&//top
                   mouseY < hoverAreas[i].pos[1] + hoverAreas[i].dimensions[1]) { //bottom
                       if (hoverAreas[i].mouseInside == false) {
                           hoverAreas[i].mouseInside = true;
                           hoverAreasEnterFunctionsToRun.push(i);
                       };
                   } else {
                    if(hoverAreas[i].mouseInside == true) {
                        hoverAreas[i].mouseInside = false;
                        hoverAreasExitFunctionsToRun.push(i);
                    };
                   };
                }; 

            for(let i=0;i<hoverAreasExitFunctionsToRun.length;i++) {
                hoverAreas[hoverAreasExitFunctionsToRun[i]].onMouseExit();
            };
            hoverAreasExitFunctionsToRun = [];
            for(let i=0;i<hoverAreasEnterFunctionsToRun.length;i++) {
                hoverAreas[hoverAreasEnterFunctionsToRun[i]].onMouseEnter();
            };
            hoverAreasEnterFunctionsToRun = [];
        });

        document.addEventListener("touchstart",function(e) { //check hover areas
            let mouseX = (e.clientX-((window.innerWidth-canvases[0].canvas.offsetWidth)/2)) / scale;
            let mouseY = (e.clientY-((window.innerHeight-canvases[0].canvas.offsetHeight)/2)) / scale;
    
            for(let i = 0; i<hoverAreas.length; i++) {
                if(mouseX > hoverAreas[i].pos[0] && //left
                   mouseX < hoverAreas[i].pos[0] + hoverAreas[i].dimensions[0] && //right
                   mouseY > hoverAreas[i].pos[1] &&//top
                   mouseY < hoverAreas[i].pos[1] + hoverAreas[i].dimensions[1]) { //bottom
                       if (hoverAreas[i].mouseInside == false) {
                           hoverAreas[i].mouseInside = true;
                           hoverAreasEnterFunctionsToRun.push(i);
                       };
                   } else {
                    if(hoverAreas[i].mouseInside == true) {
                        hoverAreas[i].mouseInside = false;
                        hoverAreasExitFunctionsToRun.push(i);
                    };
                   };
                }; 

            for(let i=0;i<hoverAreasExitFunctionsToRun.length;i++) {
                hoverAreas[hoverAreasExitFunctionsToRun[i]].onMouseExit();
            };
            hoverAreasExitFunctionsToRun = [];
            for(let i=0;i<hoverAreasEnterFunctionsToRun.length;i++) {
                hoverAreas[hoverAreasEnterFunctionsToRun[i]].onMouseEnter();
            };
            hoverAreasEnterFunctionsToRun = [];

            for(let i=0;i<tins.length;i++) {
                if(Tin.checkIfClicked(mouseX,mouseY,tins[i])) {
                    Tin.handleClicked(tins[i])
                };
            };
        });





        //text writing

        function displayNumber(valueUpdate, xpos, ypos, magnitude, z = 0, beforeText = "", afterText = "", font = "copperplate", fontColour ="orange", abbreviate=true, fixedValue=0, floatAway=false) {
            let i = displayNumbers.push(document.createElement("div"))-1;
            text.appendChild(displayNumbers[i]);
            displayNumbers[i].style.position = "absolute";

            if(window.innerWidth / 700 < window.innerHeight / 400) {
                let canvasHeight = (window.innerWidth)*(4/7);
                    displayNumbers[i].style.left = (xpos*scale).toString() + "px";
                    displayNumbers[i].style.top = ((ypos*scale)+((window.innerHeight-canvasHeight)/2)).toString() + "px";
                    displayNumbers[i].style.fontSize = (magnitude*scale).toString() + "px";
            } else {
                let canvasWidth = (window.innerHeight)*(7/4);
                    displayNumbers[i].style.left = ((xpos*scale)+((window.innerWidth-canvasWidth)/2)).toString() + "px";
                    displayNumbers[i].style.top = (ypos*scale).toString() + "px";
                    displayNumbers[i].style.fontSize = (magnitude*scale).toString() + "px";
            };

            displayNumbers[i].xpos = xpos;
            displayNumbers[i].ypos = ypos;
            displayNumbers[i].magnitude = magnitude;
            displayNumbers[i].style.zIndex = z.toString();
            displayNumbers[i].beforeText = beforeText;
            displayNumbers[i].afterText = afterText;
            displayNumbers[i].style.fontFamily = font;
            displayNumbers[i].style.color = fontColour;
            displayNumbers[i].style.opacity = 1;
            displayNumbers[i].abbreviate = abbreviate;
            displayNumbers[i].innerHTML = "";
            displayNumbers[i].fixedValue = fixedValue;  //add a new fixedValue attribute to store an element permanently in case a temporarily stored number needs to be dislayed
            displayNumbers[i].floatAway = floatAway // if true then the display number will float away and dissapear, code for this can be found in the updateFallingDoughCanvas loop function somewhere else in functions.js
            displayNumbersUpdateFunctions.push(valueUpdate); //valueUpdate is a function that returns the value of the number
            updateDisplayNumbers();
            return i; //i is the index of this number in the array of all displayed numbers
        };

        let iDNV = 0; //Use a global scope variable so that the index of a display number can be accessed through its value update function
        // iDN stands for i Display Numbers Values
        function updateDisplayNumbers(numberId = 123456789) { //default is 123456789 for when you leave the parameter empty it goes through all the display numbers
            if (numberId == 123456789) {
              for(iDNV = 0; iDNV < displayNumbersUpdateFunctions.length; iDNV++) {
                    if(displayNumbers[iDNV].abbreviate) {
                    displayNumbers[iDNV].innerHTML = displayNumbers[iDNV].beforeText + abbreviateNumber(displayNumbersUpdateFunctions[iDNV]()) + displayNumbers[iDNV].afterText;
                    continue;
                    };
                    displayNumbers[iDNV].innerHTML = displayNumbers[iDNV].beforeText + displayNumbersUpdateFunctions[iDNV]().toString() + displayNumbers[iDNV].afterText;
              };
            } else {
                iDNV = numberId;
                if(displayNumbers[numberId].abbreviate) {
                displayNumbers[numberId].innerHTML = displayNumbers[numberId].beforeText + abbreviateNumber(displayNumbersUpdateFunctions[numberId]()) + displayNumbers[numberId].afterText;
                return;
                };
                displayNumbers[numberId].innerHTML = displayNumbers[numberId].beforeText + displayNumbersUpdateFunctions[numberId]().toString() + displayNumbers[numberId].afterText;
            };
            
        };

        function displayText(textToDisplay, xpos, ypos, magnitude, z=0, font="copperplate", fontColour="orange") {
            let i = displayTexts.push(document.createElement("div"))-1;  
            text.appendChild(displayTexts[i]);
            displayTexts[i].style.position = "absolute";

            if(window.innerWidth / 700 < window.innerHeight / 400) {
                let canvasHeight = (window.innerWidth)*(4/7);
                    displayTexts[i].style.left = (xpos*scale).toString() + "px";
                    displayTexts[i].style.top = ((ypos*scale)+((window.innerHeight-canvasHeight)/2)).toString() + "px";
                    displayTexts[i].style.fontSize = (magnitude*scale).toString() + "px";
            } else {
                let canvasWidth = (window.innerHeight)*(7/4);
                    displayTexts[i].style.left = ((xpos*scale)+((window.innerWidth-canvasWidth)/2)).toString() + "px";
                    displayTexts[i].style.top = (ypos*scale).toString() + "px";
                    displayTexts[i].style.fontSize = (magnitude*scale).toString() + "px";
            };

            displayTexts[i].xpos = xpos;
            displayTexts[i].ypos = ypos;
            displayTexts[i].magnitude = magnitude;
            displayTexts[i].style.zIndex = z.toString();
            displayTexts[i].style.fontFamily = font;
            displayTexts[i].style.color = fontColour;
            displayTexts[i].innerHTML = textToDisplay;
            return i;
        };


        let abbreviations = ["", "K", "M", "B","T","Qa","Qi","Sx","Sp","O","N","De","Ud","Dd","Td","QaD","QiD","SxD","SpD","OcD","Nnd","Vi"]
        function abbreviateNumber(number) {
            if (number >= 1) {
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
            this.sprite.onload = () => {
              ctx.drawImage(this.sprite, xpos, ypos, width, height);
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


        function getCost(cost,costMulti,resourceAmount,buildingsAmount) { //returns the value of a building adjusted for buy or sell and amount to buy/sell
            if(sellBuildings) {                          //eg getValue(ovenCost,ovenCostMulti,biscuits,ovenAmount)
                switch(buyBuildingAmount) {            
                    case 1: 
                    case 5:
                    case 25:
                    case 100:   //this covers the 1,5,25 and 100 cases since each case only stops when it hits a break
                        return geometricSum(cost,buyBuildingAmount,1/costMulti)/2;
                        break;
                    case "max":
                        return geometricSum(cost,buildingsAmount,1/costMulti)/2;
                        break;
                };
            } else {
                switch(buyBuildingAmount) {
                    case 1:
                    case 5:
                    case 25:
                    case 100:
                        return geometricSum(cost,buyBuildingAmount,costMulti);
                        break;
                    case "max":
                        let amount = getAmountToBuy(cost,costMulti,resourceAmount,buildingsAmount);
                        if(amount == 0) {return cost};
                        return geometricSum(cost,amount,costMulti);
                        break;
                };
            };
            return "a"
        };

        function getAmountToBuy(cost,costMulti,resourceAmount,buildingsAmount) {
            return Math.floor(Math.log(((resourceAmount*(costMulti-1))/cost)+1) / Math.log(costMulti))
        };

        function geometricSum(startTerm,amountOfTerms,ratio) {
            return (startTerm*(1-(ratio**(amountOfTerms)))) / (1-ratio);
        };

        function blinkSprite(img,xpos,ypos,width,height,duration,ctx) { //makes an img appear then dissapear after a certain duration of time
            spawnSprite(img,xpos,ypos,width,height,ctx);    //duration is in ms
            setTimeout(() => {
                ctx.clearRect(xpos,ypos,width,height);
            },duration);
        };






        class fallingDough {
            constructor(x,y,width,height,rotation=0,speed=[0,0]) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.speed = speed;
                this.rotation = rotation;
                this.spriteNumber = Math.floor(Math.random()*fallingDoughSprites.length);
                this.animationNumber = 0
            };
            static loadImage(imgSrc,spriteNumber) {
                let img = new Image(30,30);
                img.onload = () => {
                    fallingDoughSprites[spriteNumber].push(img);
                };
                img.src = imgSrc;
            };
            fall(deltaTime) {
                this.x += this.speed[0]*deltaTime;
                this.y += this.speed[1]*deltaTime + (200*deltaTime*deltaTime);
                this.speed[1] += 400*deltaTime;
            };
            draw() {
                doughDropCanvasCtx.drawImage(fallingDoughSprites[this.spriteNumber][Math.floor(this.animationNumber)],this.x,this.y,this.width,this.height);
            };
        };


        fallingDough.loadImage("fallingDough0,0_b2.png",0);
        fallingDough.loadImage("fallingDough0,1_b2.png",0);
        fallingDough.loadImage("fallingDough0,2_b2.png",0);    
        fallingDough.loadImage("fallingDough1,0_b2.png",1);   
        fallingDough.loadImage("fallingDough1,1_b2.png",1);   
        fallingDough.loadImage("fallingDough1,2_b2.png",1);    


        let previousTime;
        function updateFallingDoughCanvas() {
            let currentTime = Date.now();   //deltaTime loop to get how much time has passed between each frame in seconds
            let deltaTime = (currentTime - previousTime)/1000;
            doughDropCanvasCtx.clearRect(0,0,700,400);
            for(let i=0; i<fallingDoughArray.length; i++) { //move and redraw all the falling dough
                fallingDoughArray[i].fall(deltaTime)
                if(fallingDoughArray[i].y > 400) { // despawn if its below the bottom of the canvas
                    fallingDoughArray.splice(i,1);
                    break;
                };
                fallingDoughArray[i].draw();
                fallingDoughArray[i].animationNumber += 20*deltaTime; //handle the annimations
                fallingDoughArray[i].animationNumber %= 3;
            };
            doughDropCanvasCtx.clearRect(0,0,700,65); //clear this rect so it looks like the dough is coming out of the pipe / not being drawn above the pipe at the top

            for(let i=0; i<tins.length; i++) { //handle the tins for the tin bouncing mechanic 
                tins[i].draw();
                tins[i].fall(deltaTime);
            };

            for(let i=0; i<displayNumbers.length; i++) { //handle float away display numbers
                if(displayNumbers[i].floatAway) {
                    displayNumbers[i].style.opacity -= 0.5*deltaTime;
                    if(displayNumbers[i].style.opacity <= 0 && menuOpen == false) {
                        text.removeChild(displayNumbers[i]);
                        displayNumbers.splice(i,1);
                        displayNumbersUpdateFunctions.splice(i,1)
                    };
                };
            };

            previousTime = currentTime;

            requestAnimationFrame(updateFallingDoughCanvas); //call the function again to start the next frame
        }; 





function calculateDoughClickAmount() {
doughClickAmount = 1*dough1Bonus;
};

function clickedDough() {
    dough += doughClickAmount;
    fallingDoughArray.push(new fallingDough((Math.random()*360)+140,30,40,40,0,[(Math.random()*350)-175,0]));
    tinClickCount += 1;
    updateDisplayNumbers();
    if(tin1Level > 0) {
        if (tinClickCount >= tinClicksRequired) {
            tinClickCount = 0;
            let index = tins.push(new Tin((Math.random()*360)+140, -30, 80, 80, (Math.random()*(4*Math.PI))-(2*Math.PI), [(Math.random()*200)-100,0], [0,400], (Math.random()*(4*Math.PI))-(2*Math.PI))) - 1
            tins[index].index = index;
        };
        drawTinDropBar(tinClickCount/tinClicksRequired);
    };
};


function calculateBiscuitsPerSecond() {
    if(recalculateBiscuitsPerSecond == true) {
    biscuitsPerSecond = 1+(ovens*oven1Bonus)+(bakeries*15*bakery1Bonus)+(factories * 90);
    recalculateBiscuitsPerSecond = false;
    };
};
setInterval(calculateBiscuitsPerSecond,1000);

function bakeBiscuits() {
    if (biscuitsPerSecond > dough) {
        biscuits += dough;
        dough = 0;
    } else {
        biscuits += biscuitsPerSecond;
        dough -= biscuitsPerSecond;
    };
    updateDisplayNumbers();

};

function startAutoClicker() {
    dough += doughClickAmount*autoClicker2Bonus;
    setTimeout(startAutoClicker,autoClickerTime);
    updateDisplayNumbers();
};

function rotatePoint(pointX,pointY,axisX,axisY,radians) { //rotates a point clockwise around an axis
    pointX -= axisX; //translate so that the axis point is the origin
    pointY -= axisY; 

    pointX = (pointY*Math.sin(radians)) + (pointX*Math.cos(radians)); //rotate
    pointY = (pointY*Math.cos(radians)) - (pointX*Math.sin(radians));

    pointX += axisX; //translate back
    pointY += axisY; 

    return [pointX,pointY];
};

function getDistance(x1,y1,x2,y2) { //returns the distance between two points ([x1,y1] and [x2,y2])
    return Math.sqrt((x1-x2)**2 + (y1-y2)**2);
};





