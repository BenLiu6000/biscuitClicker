
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


let abbreviations = ["", 
    "K", 
    "M", 
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "O",
    "N",
    "De",
    "Ud",
    "Dd",
    "Td",
    "QaD",
    "QiD",
    "SxD",
    "SpD",
    "OcD",
    "Nnd",
    "Vi"]

function abbreviateNumber(number) {
    if (number >= 1) {
    let placeholderValue = Math.floor(Math.log10(number)/3);

    return (number/(1000**placeholderValue)).toPrecision(3) 
            + abbreviations[placeholderValue] 
    } else {
        return "0";
    };
};

let spriteSheet = new Image(1250,1250);
let spriteSheetLoaded = false;
spriteSheet.onload = () => {
    spriteSheetLoaded = true;
}

spriteSheet.src = "biscuitClicker2SpriteSheet_b2.png";


const posInSheet = {    //links each image file name with its corresponding position in the spritesheet
    "30x30biscuit_b2.png": [0,0,30,30],
    "30x30cursor_b2.png": [30,0,30,30],
    "30x30dough_b2.png": [60,0,30,30],
    "60x60X_b2.png": [0,30,60,60],

    "70x60bakery_b2.png": [90,0,70,60],
    "70x60factory_b2.png": [170,0,70,60],
    "70x60oven_b2.png": [240,0,70,60],
    "100x100gears_b2.png": [90,60,100,100],

    "buyBuildingAmountButtons_b2.png": [310,0,200,20],
    "buyBuildingButtonFalse_b2.png": [190,60,360,60],
    "buyBuildingButtonTrue_b2.png": [190,120,360,60],
    "buyUpgradeButtonFalse_b2.png": [310,20,40,40],

    "buyUpgradeButtonTrue_b2.png": [350,20,40,40],
    "clickingBackground_b2.png": [550,0,700,400],
    "fallingDough0,0_b2.png": [60,30,30,30],
    "fallingDough0,1_b2.png": [60,60,30,30],

    "fallingDough0,2_b2.png": [0,90,30,30],
    "fallingDough1,0_b2.png": [30,90,30,30],
    "fallingDough1,1_b2.png": [60,90,30,30],
    "fallingDough1,2_b2.png": [390,20,30,30],

    "fallingTinBiscuit_b2.png": [390,180,160,175],
    "hoverCircleGrey_b2.png": [290,180,100,100],
    "hoverCircleRed_b2.png": [230,180,60,60],
    "hoverCircleYellow_b2.png": [130,180,100,100],

    "hoverRectangleGrey_b2.png": [450,355,100,100],
    "hoverRectangleRed_b2.png": [1150,400,100,100],
    "hoverRectangleYellow_b2.png": [1085,400,65,75],
    "menuButtonsBg_b2.png": [0,120,65,400],

    "openBuildingsMenuButton_b2.png": [1020,400,65,75],
    "openSettingsMenuButton_b2.png": [955,400,65,75],
    "openUpgradesMenuButton_b2.png": [890,400,65,75],
    "resetDataButton_b2.png": [770,400,120,40],

    "sellBuildingButtonTrue_b2.png": [65,355,360,60],
    "toggleSellBuildingsBuy_b2.png": [65,335,50,20],
    "toggleSellBuildingsSell_b2.png": [115,335,50,20],
    "upgradeMaxed_b2.png": [165,315,40,40],

    "upgradesMenuBg_b2.png": [0,520,400,400]
};

function drawSprite(imgName,xpos,ypos,width,height,ctx) {
    sheetPos = posInSheet[imgName];
    ctx.drawImage(spriteSheet,
        sheetPos[0],sheetPos[1],sheetPos[2],sheetPos[3],
        xpos,ypos,width,height
    );
}

//sprite declaration
function spawnSprite(imgName, xpos, ypos, width, height, ctx) {
    this.img = imgName;
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
    if(spriteSheetLoaded === true) {
        drawSprite(this.img, xpos, ypos, width, height, ctx);
    } else {
        spriteSheet.onload = () => {
            drawSprite(this.img, 
                xpos, ypos, width, height,
            ctx);
            spriteSheetLoaded = true;
        }
    }
};


function redrawCanvas(ctx,sprites) {
    ctx.clearRect(0,0,700,400);
    for(let i = 0; i < sprites.length; i++) {
        drawSprite(sprites[i].img, 
            sprites[i].xpos, sprites[i].ypos, sprites[i].width, sprites[i].height,
        ctx);
    };
};

function blinkSprite(img,xpos,ypos,width,height,duration,ctx) { //makes an img appear then dissapear after a certain duration of time
    spawnSprite(img,xpos,ypos,width,height,ctx);    //duration is in ms
    setTimeout(() => {
        ctx.clearRect(xpos,ypos,width,height);
    },duration);
};



const doughDropCanvasCtx = document.getElementById("doughDropCanvas").getContext("2d");
let fallingDoughSprites = [[],[]];
let fallingDoughArray = [];

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
    static loadImage(img,spriteNumber) {
        fallingDoughSprites[spriteNumber].push(img);
    };
    fall(deltaTime) {
        this.x += this.speed[0]*deltaTime;
        this.y += this.speed[1]*deltaTime + (200*deltaTime*deltaTime);
        this.speed[1] += 400*deltaTime;
    };
    draw() {
        drawSprite(fallingDoughSprites[this.spriteNumber][Math.floor(this.animationNumber)],
        this.x,this.y,this.width,this.height,doughDropCanvasCtx);
    };
};


fallingDough.loadImage("fallingDough0,0_b2.png",0);
fallingDough.loadImage("fallingDough0,1_b2.png",0);
fallingDough.loadImage("fallingDough0,2_b2.png",0);    
fallingDough.loadImage("fallingDough1,0_b2.png",1);   
fallingDough.loadImage("fallingDough1,1_b2.png",1);   
fallingDough.loadImage("fallingDough1,2_b2.png",1);    


let previousTime;
function updateFallingDoughCanvas() { //function called in main.js just above clicked dough
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



