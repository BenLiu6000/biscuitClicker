canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

let data = ""

let xhttp = new XMLHttpRequest;
xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        data = xhttp.responseText;
        console.log(data);
    };
};
xhttp.open("Get","https://raw.githubusercontent.com/BenLiu6000/biscuitClicker/main/100x100gears_b2.png");
xhttp.send();

function drawimg(imgName = "", x=0, y=0, w=0, h=0) {
    let img = new Image(w,h);
    img.src = imgName;
    img.onload = () => {
        ctx.drawImage(img,x,y,w,h);
    };
};







render = true;

cWidth = canvas.width;
cHeight = canvas.height;

let patternCanvas = document.createElement("canvas");
let patternCtx = patternCanvas.getContext("2d");

patternCanvas.width = 30;
patternCanvas.height = 30;

patternCtx.fillStyle = "grey";
patternCanvas.style.display = "none";

patternCtx.fillRect(0,0,15,15);
patternCtx.fillRect(15,15,15,15);

let patternImg = new Image(30,30);
patternImg.src = patternCanvas.toDataURL();

patternImg.onload = () => {
    let linearPattern = ctx.createPattern(patternImg,"repeat");
    ctx.fillStyle = render? "rgba(255, 255, 255, 0)":linearPattern;
    ctx.fillRect(0,0,cWidth,cHeight);

    drawSprites();
};

function drawSprites() {

drawimg("30x30biscuit_b2.png",0,0,30,30);
drawimg("30x30cursor_b2.png",30,0,30,30);
drawimg("30x30dough_b2.png",60,0,30,30);
drawimg("60x60X_b2.png",0,30,60,60);

drawimg("70x60bakery_b2.png",90,0,70,60);
drawimg("70x60factory_b2.png",170,0,70,60);
drawimg("70x60oven_b2.png",240,0,70,60);
drawimg("100x100gears_b2.png",90,60,100,100);

drawimg("buyBuildingAmountButtons_b2.png",310,0,200,20);
drawimg("buyBuildingButtonFalse_b2.png",190,60,360,60);
drawimg("buyBuildingButtonTrue_b2.png",190,120,360,60);
drawimg("buyUpgradeButtonFalse_b2.png",310,20,40,40);

drawimg("buyUpgradeButtonTrue_b2.png",350,20,40,40);
drawimg("clickingBackground_b2.png",550,0,700,400);
drawimg("fallingDough0,0_b2.png",60,30,30,30);
drawimg("fallingDough0,1_b2.png",60,60,30,30);

drawimg("fallingDough0,2_b2.png",0,90,30,30);
drawimg("fallingDough1,0_b2.png",30,90,30,30);
drawimg("fallingDough1,1_b2.png",60,90,30,30);
drawimg("fallingDough1,2_b2.png",390,20,30,30);

drawimg("fallingTinBiscuit_b2.png",390,180,160,175);
drawimg("hoverCircleGrey_b2.png",290,180,100,100);
drawimg("hoverCircleRed_b2.png",230,180,60,60);
drawimg("hoverCircleYellow_b2.png",130,180,100,100);

drawimg("hoverRectangleGrey_b2.png",450,355,100,100);
drawimg("hoverRectangleRed_b2.png",1150,400,100,100);
drawimg("hoverRectangleYellow_b2.png",1085,400,65,75);
drawimg("menuButtonsbg_b2.png",0,120,65,400);

drawimg("openBuildingsMenuButton_b2.png",1020,400,65,75);
drawimg("openSettingsMenuButton_b2.png",955,400,65,75);
drawimg("openUpgradesMenuButton_b2.png",890,400,65,75);
drawimg("resetDataButton_b2.png",770,400,120,40);

drawimg("sellBuildingButtonTrue_b2.png",65,355,360,60);
drawimg("toggleSellBuildingsBuy_b2.png",65,335,50,20);
drawimg("toggleSellBuildingsSell_b2.png",115,335,50,20);
drawimg("upgradeMaxed_b2.png",165,315,40,40);

drawimg("upgradesMenuBg_b2.png",0,520,400,400);


}
/*
png_file x y w h

30x30biscuit 0 0 30 30

30x30cursor 30 0 30 30

30x30dough 60 0 30 30

60x60X 0 30 60 60

70x60bakery 90 30 60 70
*/

let downloadButton = document.createElement("anchor");
downloadButton.download = "spriteSheet_b2.png";

downloadButton.innerHTML = "press spacebar";
downloadButton.crossOrigin = "anonymous";

document.addEventListener("keydown", (e) => {
    if(e.key == " " || "Spacebar") {
        downloadButton.href = canvas.toDataURL();
    };
});