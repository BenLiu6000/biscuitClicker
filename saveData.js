function saveGame() {       
    localStorage.setItem("savingSetUp","true") ;                          //save data

    localStorage.setItem("dough",dough.toString());
    localStorage.setItem("biscuits",biscuits.toString());

    localStorage.setItem("ovens",ovens.toString());
    localStorage.setItem("bakeries",bakeries.toString());
    localStorage.setItem("factories",factories.toString());

    localStorage.setItem("upgradesUnlocked",upgradesUnlocked.toString());
    localStorage.setItem("dough1Level",dough1Level.toString());
    localStorage.setItem("oven1Level",oven1Level.toString());
    localStorage.setItem("autoClickerUnlocked",autoClickerUnlocked.toString());
    localStorage.setItem("autoClickerTime",autoClickerTime);
    localStorage.setItem("autoClicker2Level",autoClicker2Level.toString());
    localStorage.setItem("bakery1Level",bakery1Level.toString());
    localStorage.setItem("tin1Level",tin1Level.toString());

    localStorage.setItem("currentTime",Date.now().toString());
};

function loadData() {                                                                                                   //load data
    dough = Number(localStorage.getItem("dough")); 
    biscuits = Number(localStorage.getItem("biscuits"));

    ovens = Number(localStorage.getItem("ovens"));
    ovenCost = ovenCost * (ovenCostMulti**ovens);

    bakeries = Number(localStorage.getItem("bakeries"));
    bakeryCost = bakeryCost * (bakeryCostMulti**bakeries);

    factories = Number(localStorage.getItem("factories"));
    factoryCost = factoryCost * (factoryCostMulti**factories);


    if (localStorage.getItem("upgradesUnlocked") === "true") {
        upgradesUnlocked = true;
    };
    dough1Level = Number(localStorage.getItem("dough1Level"));
    dough1CostBiscuits = dough1CostBiscuits * (dough1CostBiscuitsMulti**dough1Level);
    dough1Bonus = dough1BonusMulti**dough1Level;

    oven1Unlocked = dough1Level>=3? true:false
    oven1Level = Number(localStorage.getItem("oven1Level"));
    oven1Bonus = oven1BonusMulti**oven1Level;
    oven1CostBiscuits = oven1CostBiscuits * (oven1CostBiscuitsMulti**oven1Level);

    autoClicker1Unlocked = dough1Level>=3? true:false
    if(localStorage.getItem("autoClickerUnlocked") === "true"){
        autoClickerUnlocked = true;
        setTimeout(startAutoClicker,500);
    };

    autoClickerTime = Number(localStorage.getItem("autoClickerTime"));
    autoClicker2Unlocked = autoClickerUnlocked? true:false;
    autoClicker2Level = Number(localStorage.getItem("autoClicker2Level"));
    autoClicker2Bonus = autoClicker2BonusMulti**autoClicker2Level;
    autoClicker2CostBiscuits = autoClicker2CostBiscuits * (autoClicker2CostBiscuitsMulti**autoClicker2Level);   
    autoClicker2CostDough = autoClicker2CostDough * (autoClicker2CostDoughMulti**autoClicker2Level);

    bakery1Unlocked = dough1Level>=5? true:false;
    bakery1Level = Number(localStorage.getItem("bakery1Level"));
    bakery1Bonus = bakery1BonusMulti**bakery1Level;
    bakery1CostBiscuits = bakery1CostBiscuits * (bakery1CostBiscuitsMulti**bakery1Level);
    bakery1CostDough = bakery1CostDough * (bakery1CostDoughMulti**bakery1Level);

    tin1Unlocked = dough1Level>=10? true:false;
    tin1Level = Number(localStorage.getItem("tin1Level"));

    calculateDoughClickAmount();
    calculateBiscuitsPerSecond();

    let timePassed = (Date.now() - Number(localStorage.getItem("currentTime")))/1000;
    let doughGained = (timePassed*doughClickAmount*autoClicker2Bonus*1000)/(autoClickerTime);
    let biscuitsGained = timePassed*biscuitsPerSecond;

    if(biscuitsGained > doughGained) {      //subtract biscuits gained from dough gained
        biscuitsGained = doughGained;
        doughGained = 0;
    } else {
        doughGained -= biscuitsGained;
    };

    dough += doughGained;
    biscuits += biscuitsGained;
    whileAwayPopUp(timePassed,doughGained,biscuitsGained);
    updateDisplayNumbers();
};

function resetData() {
    localStorage.setItem("savingSetUp","true")                                                                                       //reset data
    localStorage.setItem("dough","0");
    localStorage.setItem("biscuits","0");

    localStorage.setItem("ovens","0");
    localStorage.setItem("bakeries","0");
    localStorage.setItem("factories","0");

    localStorage.setItem("upgradesUnlocked","false");
    localStorage.setItem("dough1Level","0");
    localStorage.setItem("oven1Level","0");
    localStorage.setItem("autoClickerUnlocked","false");
    localStorage.setItem("autoClickerTime","2000");
    localStorage.setItem("autoClicker2Level","0");
    localStorage.setItem("bakery1Level","0");
    localStorage.setItem("tin1Level","0");

    localStorage.setItem("currentTime",Date.now().toString());
    
    loadData();
};

function whileAwayPopUp(timePassed,doughGained,biscuitsGained) {
    let gradient = canvases[5].ctx.createLinearGradient(0,100,400,300);
    gradient.addColorStop(0,"#f2f0a0");
    gradient.addColorStop(0.5,"#ffdf4f");
    gradient.addColorStop(1,"#f2f0a0");
    canvases[5].ctx.fillStyle = gradient;
    canvases[5].ctx.fillRect(150,100,400,200);
    let daysPassed = Math.floor(timePassed/86400);
    timePassed -= daysPassed*86400;
    let hoursPassed = Math.floor(timePassed/3600);
    timePassed -= hoursPassed*3600;
    let minutesPassed = Math.floor(timePassed/60);
    timePassed -= minutesPassed*60;
    let secondsPassed = Math.round(timePassed);
    let awayTimeText = displayText("While you were away for " + daysPassed.toString() + " days " +  hoursPassed.toString() + " hours " + minutesPassed.toString() + " minutes " + secondsPassed.toString() + " seconds" + "<br>you gained:",170,110,12,26,"papyrus","black");

    new spawnSprite("30x30dough_b2.png",170,150,20,20,canvases[5].ctx);
    let doughGainedText = displayText(abbreviateNumber(doughGained) + " dough",190,150,20,26,"copperplate","black");
    let biscuitsGainedText = displayText(abbreviateNumber(biscuitsGained) + " biscuits",190,180,20,26,"copperplate","black");  
    new spawnSprite("30x30biscuit_b2.png",170,180,20,20,canvases[5].ctx);

    let clearPopUpButton = buttons.push(new makeButton(0,0,700,400,
        function() {
            canvases[5].ctx.clearRect(0,0,700,400);
            text.removeChild(displayTexts[awayTimeText]);
            text.removeChild(displayTexts[doughGainedText]);
            text.removeChild(displayTexts[biscuitsGainedText]);
            multiSplice(displayTexts,[awayTimeText,doughGainedText,biscuitsGainedText]);
            buttons.splice(clearPopUpButton,1);
        }))-1;
};