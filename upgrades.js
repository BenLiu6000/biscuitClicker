function openUpgradesMenu() {                                        //opens upgrade menu

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
    spritesCanvas1.push(new spawnSprite("upgradesMenuBg_b2.png",0,0,400,400,canvases[1].ctx));


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
    

    
    buttons.push(new makeButton(400,0, 300,400, function() { 
        clickedDough()
    }));



    let buyDough1ButtonIndex;
    function drawDough1() {
    spritesCanvas3.push(new spawnSprite("30x30dough_b2.png",185,20,30,30,canvases[3].ctx));                                            //dough 1
    buyDough1ButtonIndex = spritesCanvas2.push(new spawnSprite("buyUpgradeButtonTrue_b2.png",180,15,40,40,canvases[2].ctx))-1;

    let dough1TitleText;
    let dough1DescriptionText;
    let dough1ItalicText;
    let dough1LevelText;
    let dough1CostText;
    let dough1BonusText;

    hoverAreas.push(new makeHoverArea(180,15,40,40,
    function() { //on mouse enter
        spawnSprite("hoverCircleYellow_b2.png",180,15,40,40,canvases[4].ctx);
        canvases[4].ctx.fillStyle = "black";
        canvases[4].ctx.fillRect(225,15,200,300)
        dough1TitleText = displayText("Extra Dough",255,20,20,21,"copperplate","white");
        dough1DescriptionText = displayText("Increases dough per click by <br>30% (multiplicative)",230,100,10,21,"copperplate","white");
        dough1ItalicText = displayText("<i>Teleporting dough is easier than teleporting bread <br>(or biscuits)</i>",230,185,7,21,"copperplate","white");
        dough1CostText = displayNumber(function(){return dough1CostBiscuits},230,280,15,21,"Cost: "," biscuits","copperplate","white");
        dough1BonusText = displayNumber(function(){return dough1Bonus},230,265,12,21,"Current bonus: ","x", "copperplate","white");
        dough1LevelText = displayNumber(function(){return dough1Level},230,250,12,21,"Current level: ","/30","copperplate","white",false);
    },
    function() { //on mouse exit
        canvases[4].ctx.clearRect(0,0,700,400);
        text.removeChild(displayTexts[dough1TitleText]);
        text.removeChild(displayTexts[dough1DescriptionText]);
        text.removeChild(displayTexts[dough1ItalicText]);
        text.removeChild(displayNumbers[dough1CostText]);
        text.removeChild(displayNumbers[dough1BonusText]);
        text.removeChild(displayNumbers[dough1LevelText]);
        multiSplice(displayTexts, [dough1TitleText,dough1DescriptionText,dough1ItalicText]);
        multiSplice(displayNumbers, [dough1CostText,dough1BonusText,dough1LevelText])
        multiSplice(displayNumbersUpdateFunctions, [dough1CostText,dough1BonusText,dough1LevelText]);
    }));

    buttons.push(new makeButton(180,15,40,40,function() {
        blinkSprite("hoverCircleGrey_b2.png",180,15,40,40,100,canvases[5].ctx);
        if(biscuits >= dough1CostBiscuits && dough1Level < 30) {
            biscuits -= dough1CostBiscuits;
            dough1Level += 1;
            dough1Bonus *= dough1BonusMulti;
            dough1CostBiscuits *= dough1CostBiscuitsMulti;
            updateDisplayNumbers();
            calculateDoughClickAmount();
            if(dough1Level>=3 && oven1Unlocked == false) {
                drawOven1();
                drawAutoClicker1();
                oven1Unlocked = true;
                autoClicker1Unlocked = true;
            };
            if(dough1Level>=5 && bakery1Unlocked == false) {
                drawBakery1();
                bakery1Unlocked = true;
            };
        };
    }));
    };
    if(dough1Unlocked){drawDough1()};



    let buyOven1ButtonIndex ;
    function drawOven1(){
    spritesCanvas3.push(new spawnSprite("70x60oven_b2.png",110,20,30,30,canvases[3].ctx));                                              //oven 1
    buyOven1ButtonIndex = spritesCanvas2.push(new spawnSprite("buyUpgradeButtonTrue_b2.png",105,15,40,40,canvases[2].ctx))-1;

    let oven1TitleText;
    let oven1DescriptionText;
    let oven1ItalicText;
    let oven1LevelText;
    let oven1CostText;
    let oven1BonusText;

    hoverAreas.push(new makeHoverArea(105,15,40,40,
    function(){    //on mouse enter
        spawnSprite("hoverCircleYellow_b2.png",105,15,40,40,canvases[4].ctx);
        canvases[4].ctx.fillStyle = "black";
        canvases[4].ctx.fillRect(150,15,200,300);
        oven1TitleText = displayText("Magma Powered <br>Ovens",160,20,20,21,"copperplate","white");
        oven1DescriptionText = displayText("Increases biscuits baked per <br>oven by 30% (multiplicative) <br>(base is 1/s)",155,100,10,21,"copperplate","white");
        oven1ItalicText = displayText("<i>\"They have no soul<br> They aren't surviving after the fog\" <br>  AOL - on biscuits and ovens </i>",155,185,7,21,"copperplate","white");
        oven1CostText = displayNumber(function(){return oven1CostBiscuits},155,280,15,21,"Cost: "," biscuits","copperplate","white");
        oven1BonusText = displayNumber(function(){return oven1Bonus},155,265,12,21,"Current bonus: ", "x", "copperplate","white");
        oven1LevelText = displayNumber(function(){return oven1Level},155,250,12,21,"Current level: ", "/50", "copperplate","white",false);
        },
    function(){   //on mouse exit
        canvases[4].ctx.clearRect(0,0,700,400);
        text.removeChild(displayTexts[oven1TitleText]);
        text.removeChild(displayTexts[oven1DescriptionText]);
        text.removeChild(displayTexts[oven1ItalicText]);
        text.removeChild(displayNumbers[oven1CostText]);
        text.removeChild(displayNumbers[oven1BonusText]);
        text.removeChild(displayNumbers[oven1LevelText]);
        multiSplice(displayTexts, [oven1TitleText,oven1DescriptionText,oven1ItalicText]);
        multiSplice(displayNumbers, [oven1CostText,oven1BonusText,oven1LevelText]);
        multiSplice(displayNumbersUpdateFunctions, [oven1CostText,oven1BonusText,oven1LevelText]);
    }));

    buttons.push(new makeButton(105,15,40,40,
        function(){
            blinkSprite("hoverCircleGrey_b2.png",105,15,40,40,100,canvases[5].ctx);
            if(biscuits > oven1CostBiscuits && oven1Level < 50) {
                biscuits -= oven1CostBiscuits;
                oven1Level += 1;
                oven1Bonus *= oven1BonusMulti;
                oven1CostBiscuits *= oven1CostBiscuitsMulti;
                recalculateBiscuitsPerSecond = true;
                updateDisplayNumbers();
            };
        }));
    };
    if(oven1Unlocked){drawOven1()};


    
    let buyAutoClicker1ButtonIndex;
    function drawAutoClicker1() {
    spritesCanvas3.push(new spawnSprite("30x30cursor_b2.png",260,20,30,30,canvases[3].ctx));                                             //autoclicker1
    spritesCanvas3.push(new spawnSprite("100x100gears_b2.png",260,32,20,20,canvases[3].ctx));
    buyAutoClicker1ButtonIndex = spritesCanvas2.push(new spawnSprite("buyUpgradeButtonTrue_b2.png",255,15,40,40,canvases[2].ctx))-1;

    let autoClicker1TitleText;
    let autoClicker1DescriptionText;
    let autoClicker1ItalicText;
    let autoClicker1CostDoughText;
    let autoClicker1CostBiscuitsText;

    hoverAreas.push(new makeHoverArea(255,15,40,40,
    function() {      //on mouse enter
        spawnSprite("hoverCircleYellow_b2.png",255,15,40,40,canvases[4].ctx);
        canvases[4].ctx.fillstyle = "black";
        canvases[4].ctx.fillRect(300,15,200,300);
        autoClicker1TitleText = displayText("Autoclicker",330,20,20,21,"copperplate","white");
        autoClicker1DescriptionText = displayText("Automatically clicks every 2 seconds",305,100,7,21,"copperplate","white");
        autoClicker1ItalicText = displayText("<i>\"I bake(teleport in dough from the dough dimension), <br>therefore I am\"</i>",305,185,7,21,"copperplate","white");
        autoClicker1CostDoughText = displayNumber(function(){return autoClicker1CostDough},305,265,15,21,"Cost: ", " dough","copperplate","white");
        autoClicker1CostBiscuitsText = displayNumber(function(){return autoClicker1CostBiscuits},350,280,15,21,""," biscuits","copperplate","white");
    },
    function(){       //on mouse exit
        canvases[4].ctx.clearRect(0,0,700,400);
        text.removeChild(displayTexts[autoClicker1TitleText]);
        text.removeChild(displayTexts[autoClicker1DescriptionText]);
        text.removeChild(displayTexts[autoClicker1ItalicText])
        text.removeChild(displayNumbers[autoClicker1CostDoughText]);
        text.removeChild(displayNumbers[autoClicker1CostBiscuitsText]);
        multiSplice(displayTexts,[autoClicker1TitleText,autoClicker1DescriptionText]);
        multiSplice(displayNumbers,[autoClicker1CostDoughText,autoClicker1CostBiscuitsText]);
        multiSplice(displayNumbersUpdateFunctions,[autoClicker1CostDoughText,autoClicker1CostBiscuitsText]);
    }));

    buttons.push(new makeButton(255,15,40,40,
        function() {
            blinkSprite("hoverCircleGrey_b2.png",255,15,40,40,100,canvases[5].ctx);
            if(dough >= autoClicker1CostDough && biscuits >= autoClicker1CostBiscuits && autoClickerUnlocked == false) {
                dough -= autoClicker1CostDough;
                biscuits -= autoClicker1CostBiscuits;
                autoClickerUnlocked = true;
                autoClicker2Unlocked = true;
                drawAutoClicker2();
                startAutoClicker();

                drawTin1();
                tin1Unlocked = true;
                updateDisplayNumbers();
            };
        }));
    };
    if(autoClicker1Unlocked){drawAutoClicker1()};





    let buyAutoClicker2ButtonIndex;
    function drawAutoClicker2(){
        spritesCanvas3.push(new spawnSprite("30x30cursor_b2.png",330,20,30,30,canvases[3].ctx));                                         //autoclicker2
        spritesCanvas3.push(new spawnSprite("100x100gears_b2.png",330,32,20,20,canvases[3].ctx)); 
        buyAutoClicker2ButtonIndex = spritesCanvas2.push(new spawnSprite("buyUpgradeButtonTrue_b2.png",325,15,40,40,canvases[2].ctx))-1;

        let autoClicker2TitleText;
        let autoClicker2DescriptionText;
        let autoClicker2ItalicText;
        let autoClicker2LevelText;
        let autoClicker2CostBiscuitsText;
        let autoClicker2CostDoughText;
        let autoClicker2BonusText;

        hoverAreas.push(new makeHoverArea(325,15,40,40,
        function(){    //on mouse enter
            spawnSprite("hoverCircleYellow_b2.png",325,15,40,40,canvases[4].ctx);
            canvases[4].ctx.fillStyle = "black";
            canvases[4].ctx.fillRect(365,15,200,300);
            autoClicker2TitleText = displayText("Clickier Clicker",380,20,20,21,"copperplate","white");
            autoClicker2DescriptionText = displayText("Doubles amount of dough from <br>autoclicker",370,100,10,21,"copperplate","white");
            autoClicker2ItalicText = displayText("<i>Found the settings button</i>",370,185,7,21,"copperplate","white");
            autoClicker2CostBiscuitsText = displayNumber(function(){return autoClicker2CostBiscuits},410,300,15,21,""," biscuits","copperplate","white");
            autoClicker2CostDoughText = displayNumber(function(){return autoClicker2CostDough},370,280,15,21,"Cost: "," dough","copperplate","white");
            autoClicker2BonusText = displayNumber(function(){return autoClicker2Bonus},370,265,12,21,"Current bonus: ", "x", "copperplate","white");
            autoClicker2LevelText = displayNumber(function(){return autoClicker2Level},370,250,12,21,"Current level: ", "/10", "copperplate","white",false);
            },
        function(){   //on mouse exit
            canvases[4].ctx.clearRect(0,0,700,400);
            text.removeChild(displayTexts[autoClicker2TitleText]);
            text.removeChild(displayTexts[autoClicker2DescriptionText]);
            text.removeChild(displayTexts[autoClicker2ItalicText]);
            text.removeChild(displayNumbers[autoClicker2CostDoughText]);
            text.removeChild(displayNumbers[autoClicker2CostBiscuitsText]);
            text.removeChild(displayNumbers[autoClicker2BonusText]);
            text.removeChild(displayNumbers[autoClicker2LevelText]);
            multiSplice(displayTexts, [autoClicker2TitleText,autoClicker2DescriptionText,autoClicker2ItalicText]);
            multiSplice(displayNumbers, [autoClicker2CostDoughText,autoClicker2CostBiscuitsText,autoClicker2BonusText,autoClicker2LevelText]);
            multiSplice(displayNumbersUpdateFunctions, [autoClicker2CostDoughText,autoClicker2CostBiscuitsText,autoClicker2BonusText,autoClicker2LevelText]);
        }));

        buttons.push(new makeButton(325,15,40,40,
            function(){
                blinkSprite("hoverCircleGrey_b2.png",325,15,40,40,100,canvases[5].ctx);
                if(biscuits > autoClicker2CostBiscuits && dough > autoClicker2CostDough && autoClicker2Level < 10) {
                    dough -= autoClicker2CostDough;
                    biscuits -= autoClicker2CostBiscuits;
                    autoClicker2Level += 1;
                    autoClicker2Bonus *= autoClicker2BonusMulti;
                    autoClicker2CostBiscuits *= autoClicker2CostBiscuitsMulti;
                    autoClicker2CostDough *= autoClicker2CostDoughMulti;
                    recalculateBiscuitsPerSecond = true;
                    updateDisplayNumbers();
                };
            }));
        };
        if(autoClicker2Unlocked){drawAutoClicker2()};
    



        let buyBakery1ButtonIndex;
        function drawBakery1(){
            spritesCanvas3.push(new spawnSprite("70x60bakery_b2.png",30,20,30,30,canvases[3].ctx));                                        //bakery1
            buyBakery1ButtonIndex = spritesCanvas2.push(new spawnSprite("buyUpgradeButtonTrue_b2.png",25,15,40,40,canvases[2].ctx))-1;
    
            let bakery1TitleText;
            let bakery1DescriptionText;
            let bakery1LevelText;
            let bakery1CostBiscuitsText;
            let bakery1CostDoughText;
            let bakery1BonusText;
    
            hoverAreas.push(new makeHoverArea(25,15,40,40,
            function(){    //on mouse enter
                spawnSprite("hoverCircleYellow_b2.png",25,15,40,40,canvases[4].ctx);
                canvases[4].ctx.fillStyle = "black";
                canvases[4].ctx.fillRect(65,15,200,300);
                bakery1TitleText = displayText("Bakery 1",120,20,20,21,"copperplate","white");
                bakery1DescriptionText = displayText("Bakeries bake 30% more biscuits per <br>level (base is 15/s)",70,100,10,21,"copperplate","white");
                bakery1CostBiscuitsText = displayNumber(function(){return bakery1CostBiscuits},110,300,15,21,""," biscuits","copperplate","white");
                bakery1CostDoughText = displayNumber(function(){return bakery1CostDough},70,280,15,21,"Cost: "," dough","copperplate","white");
                bakery1BonusText = displayNumber(function(){return bakery1Bonus},70,265,12,21,"Current bonus: ", "x", "copperplate","white");
                bakery1LevelText = displayNumber(function(){return bakery1Level},70,250,12,21,"Current level: ", "/50", "copperplate","white",false);
                },
            function(){   //on mouse exit
                canvases[4].ctx.clearRect(0,0,700,400);
                text.removeChild(displayTexts[bakery1TitleText]);
                text.removeChild(displayTexts[bakery1DescriptionText]);
                text.removeChild(displayNumbers[bakery1CostDoughText]);
                text.removeChild(displayNumbers[bakery1CostBiscuitsText]);
                text.removeChild(displayNumbers[bakery1BonusText]);
                text.removeChild(displayNumbers[bakery1LevelText]);
                multiSplice(displayTexts, [bakery1TitleText,bakery1DescriptionText]);
                multiSplice(displayNumbers, [bakery1CostDoughText,bakery1CostBiscuitsText,bakery1BonusText,bakery1LevelText]);
                multiSplice(displayNumbersUpdateFunctions, [bakery1CostDoughText,bakery1CostBiscuitsText,bakery1BonusText,bakery1LevelText]);
            }));
    
            buttons.push(new makeButton(25,15,40,40,
                function(){
                    blinkSprite("hoverCircleGrey_b2.png",25,15,40,40,100,canvases[5].ctx);
                    if(biscuits > bakery1CostBiscuits && dough > bakery1CostDough && bakery1Level < 50) {
                        dough -= bakery1CostDough;
                        biscuits -= bakery1CostBiscuits;
                        bakery1Level += 1;
                        bakery1Bonus *= bakery1BonusMulti;
                        bakery1CostBiscuits *= bakery1CostBiscuitsMulti;
                        bakery1CostDough *= bakery1CostDoughMulti;
                        recalculateBiscuitsPerSecond = true;
                        updateDisplayNumbers();
                    };
                }));
            };
            if(bakery1Unlocked){drawBakery1()};




            let buyTin1ButtonIndex;                                                                     //tin 1
            function drawTin1() {
            spritesCanvas3.push(new spawnSprite("fallingTinBiscuit_b2.png",185,80,30,30,canvases[3].ctx));                                            //dough 1
            buyTin1ButtonIndex = spritesCanvas2.push(new spawnSprite("buyUpgradeButtonTrue_b2.png",180,75,40,40,canvases[2].ctx))-1;
        
            let tin1TitleText;
            let tin1DescriptionText;
            let tin1CostDoughText;
            let tin1CostBiscuitsText;
        
            hoverAreas.push(new makeHoverArea(180,75,40,40,
            function() { //on mouse enter
                spawnSprite("hoverCircleYellow_b2.png",180,75,40,40,canvases[4].ctx);
                canvases[4].ctx.fillStyle = "black";
                canvases[4].ctx.fillRect(225,75,200,300)
                tin1TitleText = displayText("Tin Drop 1",270,80,20,21,"copperplate","white");
                tin1DescriptionText = displayText("Drops a tin of dough and biscuits <br>which can be opened by clicking on",230,160,10,21,"copperplate","white");
                tin1CostDoughText = displayNumber(function(){return tin1CostDough},230,320,15,21,"Cost: "," dough","copperplate","white");
                tin1CostBiscuitsText = displayNumber(function(){return tin1CostBiscuits},275,340,15,21,""," biscuits","copperplate","white");
            },
            function() { //on mouse exit
                canvases[4].ctx.clearRect(0,0,700,400);
                text.removeChild(displayTexts[tin1TitleText]);
                text.removeChild(displayTexts[tin1DescriptionText]);
                text.removeChild(displayNumbers[tin1CostBiscuitsText]);
                text.removeChild(displayNumbers[tin1CostDoughText]);
                multiSplice(displayTexts, [tin1TitleText,tin1DescriptionText]);
                multiSplice(displayNumbers, [tin1CostBiscuitsText,tin1CostDoughText])
                multiSplice(displayNumbersUpdateFunctions, [tin1CostBiscuitsText, tin1CostDoughText]);
            }));
        
            buttons.push(new makeButton(180,75,40,40,function() {
                blinkSprite("hoverCircleGrey_b2.png",180,75,40,40,100,canvases[5].ctx);
                if(biscuits >= tin1CostBiscuits && dough >= tin1CostDough && tin1Level < 1) {
                    biscuits -= tin1CostBiscuits;
                    tin1Level += 1;
                    tinDropUnlocked = true;
                    tinClickAmount = 0;
                    updateDisplayNumbers();
                };
            }));
            };
            if(tin1Unlocked){drawTin1()};
        






    function redrawBuyUpgradeButtons() {   
        if(dough1Unlocked) {                                                             //redraw/update buy upgrade buttons to match whether they are buyable or not
        if (dough1Level < 30) {
            if(biscuits >= dough1CostBiscuits) {                                                                                            //dough 1
                canvases[2].ctx.clearRect(180,15,40,40);
                spritesCanvas2[buyDough1ButtonIndex] = new spawnSprite("buyUpgradeButtonTrue_b2.png",180,15,40,40,canvases[2].ctx);
            } else {
                canvases[2].ctx.clearRect(180,15,40,40);
                spritesCanvas2[buyDough1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",180,15,40,40,canvases[2].ctx);
            };
        } else {
            canvases[2].ctx.clearRect(180,15,40,40);
            spritesCanvas2[buyDough1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",180,15,40,40,canvases[2].ctx);
            spritesCanvas3[buyDough1ButtonIndex] = new spawnSprite("upgradeMaxed_b2.png",180,15,40,40,canvases[3].ctx);
        }};

        if(oven1Unlocked) {
        if(oven1Level < 50) {
        if(biscuits >= oven1CostBiscuits) {                                                                                              //oven 1
                canvases[2].ctx.clearRect(105,15,40,40);
                spritesCanvas2[buyOven1ButtonIndex] = new spawnSprite("buyUpgradeButtonTrue_b2.png",105,15,40,40,canvases[2].ctx);
            } else {
                canvases[2].ctx.clearRect(105,15,40,40);
                spritesCanvas2[buyOven1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",105,15,40,40,canvases[2].ctx);
            };
        } else {
            canvases[2].ctx.clearRect(105,15,40,40);
            spritesCanvas2[buyOven1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",105,15,40,40,canvases[2].ctx);
            spritesCanvas3[buyOven1ButtonIndex] = new spawnSprite("upgradeMaxed_b2.png",105,15,40,40,canvases[3].ctx)
        }};

        if(autoClicker1Unlocked) {
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
            spritesCanvas3[buyAutoClicker1ButtonIndex] = new spawnSprite("upgradeMaxed_b2.png",255,15,40,40,canvases[3].ctx);
        }};

        if(autoClicker2Unlocked) {
            if (autoClicker2Level < 10) {                                                                                     //autoclicker 2
                if(dough >= autoClicker2CostDough && biscuits >= autoClicker2CostBiscuits) {
                    canvases[2].ctx.clearRect(325,15,40,40);
                    spritesCanvas2[buyAutoClicker2ButtonIndex] = new spawnSprite("buyUpgradeButtonTrue_b2.png",325,15,40,40,canvases[2].ctx);
                } else {
                    canvases[2].ctx.clearRect(325,15,40,40);
                    spritesCanvas2[buyAutoClicker2ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",325,15,40,40,canvases[2].ctx);
                };
            } else {
                canvases[2].ctx.clearRect(325,15,40,40);
                spritesCanvas2[buyAutoClicker2ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",325,15,40,40,canvases[2].ctx);
                spritesCanvas3[buyAutoClicker2ButtonIndex] = new spawnSprite("upgradeMaxed_b2.png",325,15,40,40,canvases[3].ctx);
            }};

        if(bakery1Unlocked) {
            if (bakery1Level < 50) {                                                                                     //bakery 1
                if(dough >= bakery1CostDough && biscuits >= bakery1CostBiscuits) {
                    canvases[2].ctx.clearRect(25,15,40,40);
                    spritesCanvas2[buyBakery1ButtonIndex] = new spawnSprite("buyUpgradeButtonTrue_b2.png",25,15,40,40,canvases[2].ctx);
                } else {
                    canvases[2].ctx.clearRect(25,15,40,40);
                    spritesCanvas2[buyBakery1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",25,15,40,40,canvases[2].ctx);
                };
            } else {
                canvases[2].ctx.clearRect(25,15,40,40);
                spritesCanvas2[buyBakery1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",25,15,40,40,canvases[2].ctx);
                spritesCanvas3[buyBakery1ButtonIndex] = new spawnSprite("upgradeMaxed_b2.png",25,15,40,40,canvases[3].ctx);
            }};

        if(tin1Unlocked) {
            if (tin1Level < 1) {                                                                                     //bakery 1
                if(dough >= tin1CostDough && biscuits >= tin1CostBiscuits) {
                    canvases[2].ctx.clearRect(180,75,40,40);
                    spritesCanvas2[buyTin1ButtonIndex] = new spawnSprite("buyUpgradeButtonTrue_b2.png",180,75,40,40,canvases[2].ctx);
                } else {
                    canvases[2].ctx.clearRect(180,75,40,40);
                    spritesCanvas2[buyTin1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",180,75,40,40,canvases[2].ctx);
                };
            } else {
                canvases[2].ctx.clearRect(180,75,40,40);
                spritesCanvas2[buyTin1ButtonIndex] = new spawnSprite("buyUpgradeButtonFalse_b2.png",180,75,40,40,canvases[2].ctx);
                spritesCanvas3[buyTin1ButtonIndex] = new spawnSprite("upgradeMaxed_b2.png",180,75,40,40,canvases[3].ctx);
            }};
    };


    let redrawBuyUpgradeButtonsInterval = setInterval(redrawBuyUpgradeButtons,200);



    spritesCanvas2.push(new spawnSprite("60x60X_b2.png",395,8,60,60,canvases[2].ctx));                       //exit upgrade menu
    buttons.unshift(new makeButton(395,8,60,60,function() {
        
        menuOpen = false;
        
        buttons = [];
        buttons.push(new makeButton(65,0, 635,400, function() { 
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
        canvases[5].ctx.clearRect(0,0,700,400);
        hoverAreas = [];
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

    };