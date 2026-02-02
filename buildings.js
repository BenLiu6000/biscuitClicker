function openBuildingsMenu() { //open buildings menu

    menuOpen = true;

    buttons = [];
    hoverAreas = [];
    spritesCanvas1 = [];
    spritesCanvas2 = [];
    spritesCanvas3 = [];
    canvases[1].ctx.clearRect(0,0,700,400);
    canvases[2].ctx.clearRect(0,0,700,400);
    canvases[3].ctx.clearRect(0,0,700,400);
    canvases[4].ctx.clearRect(0,0,700,400);
    canvases[5].ctx.clearRect(0,0,700,400);

    canvases[1].ctx.fillStyle = buildingBackgroundPattern;  //find near top of main.js
    canvases[1].ctx.fillRect(0,0,400,400);


    canvases[1].canvas.classList.add("slide-inAnimation");
    canvases[2].canvas.classList.add("slide-inAnimation");
    canvases[3].canvas.classList.add("slide-inAnimation");
    canvases[4].canvas.classList.add("slide-inAnimation");
    canvases[5].canvas.classList.add("slide-inAnimation");

    canvases[5].canvas.addEventListener("animationend", function() {
        canvases[1].canvas.classList.remove("slide-inAnimation");
        canvases[2].canvas.classList.remove("slide-inAnimation");
        canvases[3].canvas.classList.remove("slide-inAnimation");
        canvases[4].canvas.classList.remove("slide-inAnimation");
        canvases[5].canvas.classList.remove("slide-inAnimation");
    });

    drawBar = false;


  
    function drawBuyBuildingButtons() {
//redrawing the buy buidling buttons to update parts
        if(canAffordOven == true) {
            spritesCanvas2[ovenBuyButtonIndex] = new spawnSprite("buyBuildingButtonTrue_b2.png",20,50,360,60,canvases[2].ctx);
        } else {
            spritesCanvas2[ovenBuyButtonIndex] = new spawnSprite("buyBuildingButtonFalse_b2.png",20,50,360,60,canvases[2].ctx);
        };
        if(canAffordBakery == true) {
            spritesCanvas2[bakeryBuyButtonIndex] = new spawnSprite("buyBuildingButtonTrue_b2.png",20,140,360,60,canvases[2].ctx);
        } else {
            spritesCanvas2[bakeryBuyButtonIndex] = new spawnSprite("buyBuildingButtonFalse_b2.png",20,140,360,60,canvases[2].ctx);
        };
        if(canAffordFactory == true) {
            spritesCanvas2[factoryBuyButtonIndex] = new spawnSprite("buyBuildingButtonTrue_b2.png",20,230,360,60,canvases[2].ctx);
        } else {
            spritesCanvas2[factoryBuyButtonIndex] = new spawnSprite("buyBuildingButtonFalse_b2.png",20,230,360,60,canvases[2].ctx);
        };
        redrawCanvas(canvases[2].ctx,spritesCanvas2);
    };


    function drawSellBuildingButtons() {
        if(ovens > 0) {
            spritesCanvas2[ovenBuyButtonIndex] = new spawnSprite("sellBuildingButtonTrue_b2.png",20,50,360,60,canvases[2].ctx);
        } else {
            spritesCanvas2[ovenBuyButtonIndex] = new spawnSprite("buyBuildingButtonFalse_b2.png",20,50,360,60,canvases[2].ctx);
        };
        if(bakeries > 0) {
            spritesCanvas2[bakeryBuyButtonIndex] = new spawnSprite("sellBuildingButtonTrue_b2.png",20,140,360,60,canvases[2].ctx);
        } else {
            spritesCanvas2[bakeryBuyButtonIndex] = new spawnSprite("buyBuildingButtonFalse_b2.png",20,140,360,60,canvases[2].ctx);
        };
        if(factories > 0) {
            spritesCanvas2[factoryBuyButtonIndex] = new spawnSprite("sellBuildingButtonTrue_b2.png",20,230,360,60,canvases[2].ctx);
        } else {
            spritesCanvas2[factoryBuyButtonIndex] = new spawnSprite("buyBuildingButtonFalse_b2.png",20,230,360,60,canvases[2].ctx);
        };
        redrawCanvas(canvases[2].ctx,spritesCanvas2);
    };


    function checkForDrawBuyBuildingButtons() {
        if (sellBuildings) {
            drawSellBuildingButtons();
            return
        };

        if (biscuits >= getCost(ovenCost,ovenCostMulti,biscuits,ovens)) {
            canAffordOven = true;
        } else {
            canAffordOven = false;
        };

        if (biscuits >= getCost(bakeryCost,bakeryCostMulti,biscuits,bakeries)) {
            canAffordBakery = true;
        } else {
            canAffordBakery = false;
        };

        if (biscuits >= getCost(factoryCost,factoryCostMulti,biscuits,factories)) {
            canAffordFactory = true;
        } else {
            canAffordFactory = false;
        };
        drawBuyBuildingButtons();
    };

    let drawBuyBuildingButtonsLoop = setInterval(checkForDrawBuyBuildingButtons,200);



//some stuff to do with the sell button
    let toggleSellBuildingsButtonIndex = spritesCanvas2.push(new spawnSprite("toggleSellBuildingsSell_b2.png",30,20,50,20,canvases[2].ctx))-1;

    buttons.unshift(new makeButton(30,20,50,20,function() {
        if(sellBuildings) {
            sellBuildings = false;
            spritesCanvas2[toggleSellBuildingsButtonIndex] = new spawnSprite("toggleSellBuildingsSell_b2.png",30,20,50,20,canvases[2].ctx);
            canvases[4].ctx.clearRect(30,20,50,20);    //change colour of hover on change of button
            spawnSprite("hoverRectangleRed_b2.png",30,20,50,20,canvases[4].ctx);
        } else {
            sellBuildings = true;
            spritesCanvas2[toggleSellBuildingsButtonIndex] = new spawnSprite("toggleSellBuildingsBuy_b2.png",30,20,50,20,canvases[2].ctx);
            canvases[4].ctx.clearRect(30,20,50,20);  //change colour of hover on change of button
            spawnSprite("hoverRectangleYellow_b2.png",30,20,50,20,canvases[4].ctx);
        };
        updateDisplayNumbers();
    }));
    hoverAreas.push(new makeHoverArea(30,20,50,20,
        function() { //on enter 
            if(sellBuildings) {
                spawnSprite("hoverRectangleYellow_b2.png",30,20,50,20,canvases[4].ctx);
            } else {
                spawnSprite("hoverRectangleRed_b2.png",30,20,50,20,canvases[4].ctx);
            };
        },
        function() {  //on exit
            canvases[4].ctx.clearRect(30,20,50,20);
        }));



//code for the building buy/sell amount button
    spritesCanvas2.push(new spawnSprite("buyBuildingAmountButtons_b2.png",150,20,200,20,canvases[2].ctx));

    buttons.push(new makeButton(150,20,40,20,function() {                 //set building buy amount to 1
        buyBuildingAmount = 1;
        blinkSprite("hoverRectangleGrey_b2.png",150,20,40,20,100,canvases[3].ctx);
        canvases[5].ctx.clearRect(0,0,700,400);                 //show this as selected 
        spawnSprite("hoverRectangleYellow_b2.png",150,20,40,20,canvases[5].ctx);   
        updateDisplayNumbers();
    }));
    hoverAreas.push(new makeHoverArea(150,20,40,20,
        function() {     //on enter
            spawnSprite("hoverRectangleYellow_b2.png",150,20,40,20,canvases[4].ctx); 
        },
        function() {     //on exit
            canvases[4].ctx.clearRect(150,20,40,20);
    }));

    buttons.push(new makeButton(190,20,40,20,function() {                 //set building buy amount to 5
        buyBuildingAmount = 5;
        blinkSprite("hoverRectangleGrey_b2.png",190,20,40,20,100,canvases[3].ctx);
        canvases[5].ctx.clearRect(0,0,700,400);
        spawnSprite("hoverRectangleYellow_b2.png",190,20,40,20,canvases[5].ctx);   
        updateDisplayNumbers();
    }));
    hoverAreas.push(new makeHoverArea(190,20,40,20,
        function() {     //on enter
            spawnSprite("hoverRectangleYellow_b2.png",190,20,40,20,canvases[4].ctx); 
        },
        function() {     //on exit
            canvases[4].ctx.clearRect(190,20,40,20);
    }));

    buttons.push(new makeButton(230,20,40,20,function() {                 //set building buy amount to 25
        buyBuildingAmount = 25;
        blinkSprite("hoverRectangleGrey_b2.png",230,20,40,20,100,canvases[3].ctx);
        canvases[5].ctx.clearRect(0,0,700,400);
        spawnSprite("hoverRectangleYellow_b2.png",230,20,40,20,canvases[5].ctx);   
        updateDisplayNumbers();
    }));
    hoverAreas.push(new makeHoverArea(230,20,40,20,
        function() {     //on enter
            spawnSprite("hoverRectangleYellow_b2.png",230,20,40,20,canvases[4].ctx); 
        },
        function() {     //on exit
            canvases[4].ctx.clearRect(230,20,40,20);
    }));

    buttons.push(new makeButton(270,20,40,20,function() {                 //set building buy amount to 100
        buyBuildingAmount = 100;
        blinkSprite("hoverRectangleGrey_b2.png",270,20,40,20,100,canvases[3].ctx);
        canvases[5].ctx.clearRect(0,0,700,400);
        spawnSprite("hoverRectangleYellow_b2.png",270,20,40,20,canvases[5].ctx);   
        updateDisplayNumbers();
    }));
    hoverAreas.push(new makeHoverArea(270,20,40,20,
        function() {     //on enter
            spawnSprite("hoverRectangleYellow_b2.png",270,20,40,20,canvases[4].ctx); 
        },
        function() {     //on exit
            canvases[4].ctx.clearRect(270,20,40,20);
    }));

    buttons.push(new makeButton(310,20,40,20,function() {                  //set building buy amount to max
        buyBuildingAmount = "max";
        blinkSprite("hoverRectangleGrey_b2.png",310,20,40,20,100,canvases[3].ctx);
        canvases[5].ctx.clearRect(0,0,700,400);
        spawnSprite("hoverRectangleYellow_b2.png",310,20,40,20,canvases[5].ctx);   
    }));
    hoverAreas.push(new makeHoverArea(310,20,40,20,
        function() {     //on enter
            spawnSprite("hoverRectangleYellow_b2.png",310,20,40,20,canvases[4].ctx); 
        },
        function() {     //on exit
            canvases[4].ctx.clearRect(310,20,40,20);
    }));

    switch(buyBuildingAmount) {  //show currently selected
        case 1:
            spawnSprite("hoverRectangleYellow_b2.png",150,20,40,20,canvases[5].ctx);
            break;
        case 5:
            spawnSprite("hoverRectangleYellow_b2.png",190,20,40,20,canvases[5].ctx);
            break;
        case 25:
            spawnSprite("hoverRectangleYellow_b2.png",230,20,40,20,canvases[5].ctx);
            break;
        case 100:
            spawnSprite("hoverRectangleYellow_b2.png",270,20,40,20,canvases[5].ctx);
            break;
        case "max": 
            spawnSprite("hoverRectangleYellow_b2.png",310,20,40,20,canvases[5].ctx);
            break;
    };



//code for the buttons to buy more of the buildings

    let ovenBuyButtonIndex = (spritesCanvas2.push(new spawnSprite("buyBuildingButtonFalse_b2.png",20,50,360,60,canvases[2].ctx)))-1;    
    spritesCanvas3.push(new spawnSprite("70x60oven_b2.png",20,50,70,60,canvases[3].ctx));
    let ovenCostText = displayNumber(function(){return getCost(ovenCost,ovenCostMulti,biscuits,ovens)},90,80,20,11,""," biscuits","copperplate","black");
    displayNumbers[ovenCostText].classList.add("slide-inAnimation");
    let ovenAmountText = displayNumber(function(){return ovens},90,55,20,11,""," ovens","copperplate","black",false);
    displayNumbers[ovenAmountText].classList.add("slide-inAnimation");
    hoverAreas.push(new makeHoverArea(20,50,360,60,
        function() {
            if(sellBuildings) {          //on enter
                spawnSprite("hoverRectangleRed_b2.png",20,50,360,60,canvases[4].ctx);
            } else {
                spawnSprite("hoverRectangleYellow_b2.png",20,50,360,60,canvases[4].ctx);
            };
        },
        function() {
            canvases[4].ctx.clearRect(20,50,360,60);    //on exit
        }));

    buttons.push(new makeButton(20,50,360,60,function() {
        blinkSprite("hoverRectangleGrey_b2.png",20,50,360,60,100,canvases[5].ctx);
        if (sellBuildings) {    //sell oven
            if (ovens > 0) {
                let amountToSell = buyBuildingAmount == "max"? ovens:buyBuildingAmount;
                ovens -= amountToSell;
                biscuits += getCost(ovenCost,ovenCostMulti,biscuits,ovens);
                ovenCost *= 1/ovenCostMulti**amountToSell;
                recalculateBiscuitsPerSecond = true;
                updateDisplayNumbers();
                return;
            };
            return;
        };
        if(biscuits >= ovenCost) {    //buy oven
            biscuits -= getCost(ovenCost,ovenCostMulti,biscuits,ovens);  //subtract the cost of the ovens
            let amountToBuy = buyBuildingAmount == "max"? getAmountToBuy(ovenCost,ovenCostMulti,biscuits,ovens):buyBuildingAmount;  //get the amount of ovens to add if its buy max
            ovens += amountToBuy
            ovenCost *= ovenCostMulti**amountToBuy;
            recalculateBiscuitsPerSecond = true;
            bakeriesUnlocked = true;
            updateDisplayNumbers();
            return;
        };
    }));


    let bakeryBuyButtonIndex = (spritesCanvas2.push(new spawnSprite("buyBuildingButtonFalse_b2.png",20,140,360,60,canvases[2].ctx)))-1;
    spritesCanvas3.push(new spawnSprite("70x60bakery_b2.png",25,145,60,50,canvases[3].ctx));
    let bakeryCostText = displayNumber(function(){return getCost(bakeryCost,bakeryCostMulti,biscuits,bakeries)},90,170,20,11,""," biscuits","copperplate","black");
    displayNumbers[bakeryCostText].classList.add("slide-inAnimation");
    let bakeryAmountText = displayNumber(function(){return bakeries},90,145,20,11,""," bakeries","copperplate","black",false);
    displayNumbers[bakeryAmountText].classList.add("slide-inAnimation");
    hoverAreas.push(new makeHoverArea(20,140,360,60,
        function() {
            if(sellBuildings) {          //on enter
                spawnSprite("hoverRectangleRed_b2.png",20,140,360,60,canvases[4].ctx);
            } else {
                spawnSprite("hoverRectangleYellow_b2.png",20,140,360,60,canvases[4].ctx);
            };
        },
        function() {
            canvases[4].ctx.clearRect(20,140,360,60);    //on exit
        }));

    buttons.push(new makeButton(20,140,360,60,function() {
        blinkSprite("hoverRectangleGrey_b2.png",20,140,360,60,100,canvases[5].ctx);
        if (sellBuildings) { //sell bakery
            if (bakeries > 0) {
                let amountToSell = buyBuildingAmount == "max"? bakeries:buyBuildingAmount;  //get the amount of bakeries to sell if set to max
                bakeries -= amountToSell;
                biscuits += getCost(bakeryCost,bakeryCostMulti,biscuits,bakeries);
                bakeryCost *= (1/bakeryCostMulti)**amountToSell;
                recalculateBiscuitsPerSecond = true;
                updateDisplayNumbers();
                return;
            };
            return;
        };
        if(biscuits >= bakeryCost) { //buy bakery
            biscuits -= getCost(bakeryCost,bakeryCostMulti,biscuits,bakeries);  //subtract the cost of the bakeries
            let amountToBuy = buyBuildingAmount == "max"? getAmountToBuy(bakeryCost,bakeryCostMulti,biscuits,bakeries):buyBuildingAmount;  //get the amount ot buy if buying max
            bakeries += amountToBuy;
            bakeryCost *= bakeryCostMulti**amountToBuy;
            recalculateBiscuitsPerSecond = true;
            updateDisplayNumbers();
            return;
        };
    }));;


    let factoryBuyButtonIndex = (spritesCanvas2.push(new spawnSprite("buyBuildingButtonFalse_b2.png",20,230,360,60,canvases[2].ctx)))-1;
    spritesCanvas3.push(new spawnSprite("70x60factory_b2.png",25,235,60,50,canvases[3].ctx));
    let factoryCostText = displayNumber(function(){return getCost(factoryCost,factoryCostMulti,biscuits,factories)},90,250,20,11,""," biscuits","copperplate","black");
    displayNumbers[factoryCostText].classList.add("slide-inAnimation");  //so the text slides in with the rest of the menu
    let factoryAmountText = displayNumber(function(){return factories},90,235,20,11,""," factories","copperplate","black",false);
    displayNumbers[factoryAmountText].classList.add("slide-inAnimation");
    hoverAreas.push(new makeHoverArea(20,230,360,60,
        function() {
            if(sellBuildings) {          //on enter
                spawnSprite("hoverRectangleRed_b2.png",20,230,360,60,canvases[4].ctx);
            } else {
                spawnSprite("hoverRectangleYellow_b2.png",20,230,360,60,canvases[4].ctx);
            };
        },
        function() {
            canvases[4].ctx.clearRect(20,230,360,60);    //on exit
        }));

    buttons.push(new makeButton(20,230,360,60,function() {
        blinkSprite("hoverRectangleGrey_b2.png",20,230,360,60,100,canvases[5].ctx);
        if (sellBuildings) { //sell bakery
            if (factories > 0) {
                let amountToSell = buyBuildingAmount == "max"? bakeries:buyBuildingAmount;  //get the amount of factories to sell if set to max
                factories -= amountToSell;
                biscuits += getCost(factoryCost,factoryCostMulti,biscuits,factories);
                factoryCost *= (1/factoryCostMulti)**amountToSell;
                recalculateBiscuitsPerSecond = true;
                updateDisplayNumbers();
                return;
            };
            return;
        };
        if(biscuits >= factoryCost) { //buy bakery
            biscuits -= getCost(factoryCost,factoryCostMulti,biscuits,factories);  //subtract the cost of the bakeries
            let amountToBuy = buyBuildingAmount == "max"? getAmountToBuy(factoryCost,factoryCostMulti,biscuits,factories):buyBuildingAmount;  //get the amount ot buy if buying max
            factories += amountToBuy;
            factoryCost *= factoryCostMulti**amountToBuy;
            recalculateBiscuitsPerSecond = true;
            updateDisplayNumbers();
            return;
        };
    }));;


//button to exit the menu
    spritesCanvas2.push(new spawnSprite("60x60X_b2.png",395,8,60,60,canvases[2].ctx));
    buttons.push(new makeButton(395,8,60,60,function() {           //exit menu

        menuOpen = false;
        
        buttons = [];
        hoverAreas = [];
        buttons.push(new makeButton(65,0, 635,400, function() { 
            clickedDough()
        }));
        text.removeChild(displayNumbers[ovenCostText]);
        text.removeChild(displayNumbers[ovenAmountText]);
        text.removeChild(displayNumbers[bakeryCostText]);
        text.removeChild(displayNumbers[bakeryAmountText]);
        text.removeChild(displayNumbers[factoryCostText]);
        text.removeChild(displayNumbers[factoryAmountText]);
        multiSplice(displayNumbers,[ovenCostText,ovenAmountText,
            bakeryCostText,bakeryAmountText,
            factoryCostText,factoryAmountText]);
        multiSplice(displayNumbersUpdateFunctions,[ovenCostText,ovenAmountText,
            bakeryCostText,bakeryAmountText,
            factoryCostText,factoryCostText]);
        clearInterval(drawBuyBuildingButtonsLoop);
        spritesCanvas1 = [];
        spritesCanvas2 = [];
        spritesCanvas3 = [];
        canvases[1].ctx.clearRect(0,0,700,400);
        canvases[2].ctx.clearRect(0,0,700,400);
        canvases[3].ctx.clearRect(0,0,700,400);
        canvases[4].ctx.clearRect(0,0,700,400);
        canvases[5].ctx.clearRect(0,0,700,400);
        sellBuildings = false;
        drawBar = true;
        spawnMenuButtons();
    }));
    hoverAreas.push(new makeHoverArea(395,8,60,60,
        function() {    //on mouse enter
            spawnSprite("hoverCircleRed_b2.png",395,8,60,60,canvases[5].ctx)
        },
        function() {    //on mouse exit
            canvases[5].ctx.clearRect(395,8,60,60);
        }
    ));
    
//make the area not covered by menu give dough when clicked 
    buttons.push(new makeButton(400,0, 300,400, function() { 
        clickedDough();
    }));

};

