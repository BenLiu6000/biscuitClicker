/* Code for biscuit clicker ;)
    There are two main ingame currencies, biscuits and dough. Dough is obtained by clicking and is converted into biscuits
    based on the biscuits per second value. The amout of dough and biscuits gained increases with ingame upgrades.
    
    Saving is done through local storage in the browser using json objects

    The code is split into lots of different js files, most of them are for one specific mechanic or menu
    The html file is called biscuitClicker2.html and the css file is called biscuitClicker2.css
    General stuff is found in main.js, input.js, graphics.js and helperFunctions.js
    Game display done through a 400x700 javascript canvas obj
    The canvas is actually made up of a bunch of canvases with different z values
    All the text and numbers are html objs that are synced with the location of the canvas and use css for styling
    All measurements (x,y,size etc) are done based on the 400x700 canvas
    
    Major constructor functions include:
    displayNumber()
    displayText()
    makeButton()
    makeHoverArea()
    The above function all return an obj which is then added to an array which is just named the plural of the function name
    You should be able to find the declaration of the arrays in main.js, though the functions themselves are contained in functions.js
    Most of the game display and interactives bits are provided through these objs 

    Other functions in functions.js :
    calculateBiscuitsPerSecond() (runs after a few moments when recalculateBiscuitsPerSecond is set to True, calculates the correct biscuits per second)
    bakeBiscuits() (loop function to bake biscuits)
    Saving is done thorugh javascript local storage
    
    There should be a section below here in main.js where all the variables are declared */


const canvas = document.querySelector(".canvas")
let canvases = [];   //canvases is an array of objs which contain a canvas element and the corresponding 2d ctx, eg canvases[2].ctx is accessing the ctx for canvas2
canvases.push({canvas:document.getElementById("canvas0"), ctx:document.getElementById("canvas0").getContext("2d")});
canvases.push({canvas:document.getElementById("canvas1"), ctx:document.getElementById("canvas1").getContext("2d")});
canvases.push({canvas:document.getElementById("canvas2"), ctx:document.getElementById("canvas2").getContext("2d")});
canvases.push({canvas:document.getElementById("canvas3"), ctx:document.getElementById("canvas3").getContext("2d")});
canvases.push({canvas:document.getElementById("canvas4"), ctx:document.getElementById("canvas4").getContext("2d")});
canvases.push({canvas:document.getElementById("canvas5"), ctx:document.getElementById("canvas5").getContext("2d")});
canvases.push({canvas:document.getElementById("doughDropCanvas"), ctx:document.getElementById("doughDropCanvas").getContext("2d")});
const slideInAnimation = document.querySelector(".slide-inAnimation");

const patternCanvas = document.getElementById("patternCanvas");   //for creating something to put in as the img parameter in ctx.createPattern
const patternCanvasCtx = patternCanvas.getContext("2d");
let buildingBackgroundGradient = patternCanvasCtx.createLinearGradient(0,0,10,10);   //for the background of the buildings menu
buildingBackgroundGradient.addColorStop(0,"#e0c089");     
buildingBackgroundGradient.addColorStop(0.45,"#e0c089");
buildingBackgroundGradient.addColorStop(0.55,"#c7a871");     
buildingBackgroundGradient.addColorStop(1,"#c7a871");
patternCanvasCtx.fillStyle = buildingBackgroundGradient;   
patternCanvasCtx.fillRect(0,0,10,10);
const buildingBackgroundPattern = canvases[1].ctx.createPattern(patternCanvas,"repeat");

const text = document.querySelector(".text");
let buttons = [];
let hoverAreas = [];
let spritesCanvas0 = [];
let spritesCanvas1 = [];
let spritesCanvas2 = [];
let spritesCanvas3 = [];
let spritesCanvas4 = [];
let spritesCanvas5 = [];
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





//declare variables

let dough = 0;
let biscuits = 1000000000000;
let doughClickAmount = 1;



let biscuitsPerSecond = 1;
let recalculateBiscuitsPerSecond = false;



let bakeBiscuitsLoop = setInterval(bakeBiscuits, 1000)
recalculateBiscuitsPerSecond = true;

let menuOpen = false;

//buildings
let buyBuildingAmount = 1;
let sellBuildings = false;

let ovens = 0;
let ovenCost = 10;
let ovenCostMulti = 1.3;
let canAffordOven = true;

let bakeries = 0;
let bakeryCost = 5000;
let bakeryCostMulti = 1.3;
let canAffordBakery = true;

let factories = 0;
let factoryCost = 35000;
let factoryCostMulti = 1.3;
let canAffordFactory = true;

let volcanoes = 0;
let volcanoCost = 500000;
let volcanoCostMulti = 1.3;
let canAffordVolcano = true;




//upgrades
let upgradesUnlocked = false;

function upgradesUnlockCheck() {
    if(ovens >= 5 || upgradesUnlocked == true) {
        upgradesUnlocked = true;
        clearInterval(unlockUpgradesCheckInterval);
    };
};

let unlockUpgradesCheckInterval = setInterval(upgradesUnlockCheck,1000);

let dough1CostBiscuits = 50;    //initial cost of upgrade
let dough1CostBiscuitsMulti = 1.7;    //cost increase after each level 
let dough1Bonus = 1;   
let dough1BonusMulti = 1.3;  //increase in bonus after each level
let dough1Level = 0;
let dough1Unlocked = true;

let oven1CostBiscuits = 450;
let oven1CostBiscuitsMulti = 1.5;
let oven1Bonus = 1;
let oven1BonusMulti = 1.3;
let oven1Level = 0;
let oven1Unlocked = false;

let autoClickerUnlocked  = false;
let autoClickerTime = 2000;
let autoClicker1CostDough = 500;
let autoClicker1CostBiscuits = 200;
let autoClicker1Unlocked = false;

let autoClicker2CostDough = 1000;
let autoClicker2CostDoughMulti = 3;
let autoClicker2CostBiscuits = 2300;
let autoClicker2CostBiscuitsMulti = 3;
let autoClicker2Bonus = 1;
let autoClicker2BonusMulti = 2;
let autoClicker2Level = 0;
let autoClicker2Unlocked = false;

let bakery1CostDough = 10000;
let bakery1CostDoughMulti = 1.5;
let bakery1CostBiscuits = 7500;
let bakery1CostBiscuitsMulti = 1.5;
let bakery1Bonus = 1;
let bakery1BonusMulti = 1.3;
let bakery1Level = 0;
let bakery1Unlocked = false;

let tin1CostDough = 125000;
let tin1CostBiscuits = 100000;
let tin1Level = 0;
let tin1Unlocked = false;

let anti1CostDough = 125000;
let anti1CostBiscuits = 100000;
let anti1Level = 0;
let anti1Unlocked = false;

let tin2CostDough = 125000;
let tin2CostBiscuits = 100000;
let tin2CostDoughMulti = 8;
let tin2CostBiscuitsMulti = 8;
let tin2Level = 0;
let tin2Unlocked = false;

//tin drop
let tinDropUnlocked = false; 
let tinClicksRequired = 30;
let tinClickCount = 0;
let drawBar = true;

let tinDropBarGradient = canvases[4].ctx.createLinearGradient(100,380,300,390);
tinDropBarGradient.addColorStop(0,"#6eff77");
tinDropBarGradient.addColorStop(1,"#2a6adb");


function calculateDoughClickAmount() {
doughClickAmount = 1*dough1Bonus;
};

updateFallingDoughCanvas() //starts a loop

function clickedDough() {
    dough += doughClickAmount;
    fallingDoughArray.push(new fallingDough((Math.random()*360)+140,30,40,40,0,[(Math.random()*350)-175,0]));
    tinClickCount += 1;
    updateDisplayNumbers();
    if(tin1Level > 0) {
        if (tinClickCount >= tinClicksRequired) {
            tinClickCount = 0;
            for(let i=0; i<=tin2Level; i++) {
                let index = tins.push(new Tin((Math.random()*360)+140, -30, 80, 80, (Math.random()*(4*Math.PI))-(2*Math.PI), [(Math.random()*200)-100,0], [0,400], (Math.random()*(4*Math.PI))-(2*Math.PI))) - 1;
                tins[index].index = index;
            };
            
        };
        drawTinDropBar(tinClickCount/tinClicksRequired);
    };
};


function calculateBiscuitsPerSecond() {
    if(recalculateBiscuitsPerSecond == true) {
    biscuitsPerSecond = 1+(ovens*oven1Bonus)+(bakeries*15*bakery1Bonus)+(factories * 90)+(volcanoes * 1200);
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






if(localStorage.getItem("savingSetUp")) {
    loadData();
};



//start game

function startGame() {

setInterval(saveGame,5000)


spritesCanvas0.push(new spawnSprite("clickingBackground_b2.png",0,0,700,400,canvases[0].ctx));
buttons.push(new makeButton(65,0, 635,400, function() { //clicking area
    clickedDough()
}));

displayNumber(function() {return dough}, 230, 150, 30, 1, "", " dough", "copperplate", "white"); //dough amount
spritesCanvas0.push(new spawnSprite("30x30dough_b2.png",200,157,30,30,canvases[0].ctx));
displayNumber(function() {return biscuits}, 230, 200, 30, 1, "", " biscuits", "copperplate", "white"); //biscuit amount
spritesCanvas0.push(new spawnSprite("30x30biscuit_b2.png",200,207,30,30,canvases[0].ctx));
displayNumber(function(){return biscuitsPerSecond}, 240, 232, 12, 1, "("," per second)","copperplate","white");




spawnMenuButtons();


};
setTimeout(startGame,100)





function spawnMenuButtons() {

spritesCanvas1.push(new spawnSprite("menuButtonsBg_b2.png",0,0,65,400,canvases[1].ctx));

spritesCanvas2.push(new spawnSprite("openBuildingsMenuButton_b2.png",0,10,65,75,canvases[2].ctx));
buttons.push(new makeButton(0,10,65,75, openBuildingsMenu));
hoverAreas.push(new makeHoverArea(0,10,65,75, 
    function() {            // on mouse enter
        spawnSprite("hoverRectangleYellow_b2.png",0,10,65,75,canvases[3].ctx); 
    },
    function() {             //on mouse exit
        canvases[3].ctx.clearRect(0,10,65,75);
    }
));



if(upgradesUnlocked == true) {
    spritesCanvas2.push(new spawnSprite("openUpgradesMenuButton_b2.png",0,100,65,75,canvases[2].ctx));
    buttons.push(new makeButton(0,100,65,75,openUpgradesMenu));

    hoverAreas.push(new makeHoverArea(0,100,65,75, 
        function() {            // on mouse enter
            spawnSprite("hoverRectangleYellow_b2.png",0,100,65,75,canvases[3].ctx); 
        },
        function() {             //on mouse exit
            canvases[3].ctx.clearRect(0,100,65,75);
        }
    ));
};


spritesCanvas2.push(new spawnSprite("openSettingsMenuButton_b2.png",0,190,65,75,canvases[2].ctx));
buttons.push(new makeButton(0,190,65,75,openSettingsMenu));

hoverAreas.push(new makeHoverArea(0,190,65,75, 
    function() {            // on mouse enter
        spawnSprite("hoverRectangleYellow_b2.png",0,190,65,75,canvases[3].ctx); 
    },
    function() {             //on mouse exit
        canvases[3].ctx.clearRect(0,190,65,75);
    }
));

if(tin1Level > 0) {
    drawTinDropBar(tinClickCount/tinClicksRequired);
};
};









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