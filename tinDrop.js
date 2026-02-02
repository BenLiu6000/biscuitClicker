

function drawTinDropBar(amountFilled) {
    if(drawBar == false) {return};
    canvases[4].ctx.clearRect(100,380,200,10);
    canvases[4].ctx.fillStyle = tinDropBarGradient;
    canvases[4].ctx.fillRect(100,380,200*amountFilled,10);
    canvases[4].ctx.strokeStyle = "#0f1417";
    canvases[4].ctx.strokeWidth = 1;
    canvases[4].ctx.beginPath();
    canvases[4].ctx.moveTo(100,380);
    canvases[4].ctx.lineTo(300,380);
    canvases[4].ctx.lineTo(300,390);
    canvases[4].ctx.lineTo(100,390);
    canvases[4].ctx.lineTo(100,380);
    canvases[4].ctx.stroke();
};

let fallingTinBiscuitImage = new Image();
fallingTinBiscuitImage.src = "fallingTinBiscuit_b2.png";

class Tin {
    constructor(x,y,width,height,rotation=0,speed=[0,0],acceleration=[0,0],rotationSpeed=0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.speed = speed;
        this.acceleration = acceleration;
        this.rotationSpeed = rotationSpeed;
        this.points = [[],[],[],[]];
        this.center = [];
        this.index = 0; //the position of this tin in the array of tins
        this.timesClicked = 0; //amount of times this tin has been clicked
        this.getPoints();
    };
    fall(deltaTime) {
        this.getCenter();
        this.getPoints();
        this.x += this.speed[0]*deltaTime + (this.acceleration[0]*deltaTime*deltaTime)/2;
        this.y += this.speed[1]*deltaTime //+ (this.acceleration[1]*deltaTime*deltaTime)/2;
        this.speed[0] += this.acceleration[0]*deltaTime;
        this.speed[1] += this.acceleration[1]*deltaTime;
        this.rotation += this.rotationSpeed * deltaTime;
        Tin.handleCollision(this);
    };
    getCenter() {
        this.center[0] = this.x + (this.width/2)
        this.center[1] = this.y + (this.height/2)
    };
    getPoints() {
        this.points[0] = rotatePoint(this.x, this.y, this.center[0], this.center[1], this.rotation);  //find rotate point in functions.js
        this.points[1] = rotatePoint(this.x+this.width, this.y, this.center[0], this.center[1], this.rotation);
        this.points[2] = rotatePoint(this.x+this.width, this.y+this.height, this.center[0], this.center[1], this.rotation);
        this.points[3] = rotatePoint(this.x, this.y+this.height, this.center[0], this.center[1], this.rotation);
    };
    draw() {
        doughDropCanvasCtx.save();
        doughDropCanvasCtx.translate(this.x+this.width/2, this.y+this.height/2);
        doughDropCanvasCtx.rotate(this.rotation);
        doughDropCanvasCtx.drawImage(fallingTinBiscuitImage, -this.width/2, -this.height/2, this.width, this.height);
        doughDropCanvasCtx.restore();
    };

    static handleCollision(tin) {

        for(let i=0;i<4;i++) { // horizontal boundaries
            if(tin.points[i][0] > 700) { //reverse speed when tin hits side of screen
                tin.speed[0] *= tin.speed[0]>0? -1:1; //reverses speed if tin is going direction of out of screen
                tin.x += 699 - tin.points[i][0] //to prevent multiple collisions with side of screen in a row
                break;
            } else if(tin.points[i][0] < 85) {
                tin.speed[0] *= tin.speed[0]<0? -1:1;
                tin.x += 86 - tin.points[i][0]
                break;
            };
        };

        if(tin.y > 500) {
            tins.splice(tin.index,1);
        };

    };
    static checkIfClicked(mouseX,mouseY,tin) {
        let distance = getDistance(mouseX, mouseY, tin.center[0], tin.center[1]);
        let radius = getDistance(tin.x, tin.y, tin.center[0], tin.center[1]);
        if(distance <= radius) {
            return true;
        } else {
            return false;
        };
    };
    static handleClicked(tin) {
        tin.speed[1] = -400;
        tin.timesClicked += 1;

        if(tin.timesClicked > 4) {          //tin breaks/opens 
            tins.splice(tin.index,1);
            let timeGainedBiscuits = (Math.random()*60) + 60;  //gain between 60 and 120 seconds of biscuits
            biscuits += biscuitsPerSecond*timeGainedBiscuits;
            
            iDNV = displayNumbers.length;  // find iDNV around the display numbers section in functions.js :3
            displayNumber(()=>{return displayNumbers[iDNV].fixedValue}, tin.x, tin.y, 15, 11, "", " biscuits", "copperplate", "#e8f4fa", true, biscuitsPerSecond*timeGainedBiscuits, true);
                                   // i will be defined when looping through the function that updates display numbers values which is when the get value function for a display number is run
        };
    };
};
