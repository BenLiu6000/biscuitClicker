function openSettingsMenu() {                                                                //opens settings menu
            
    buttons = [];
    hoverAreas = [];
    spritesCanvas1 = [];
    spritesCanvas2 = [];                                                      
    canvases[1].ctx.clearRect(0,0,700,400);
    canvases[2].ctx.clearRect(0,0,700,400);
    canvases[3].ctx.clearRect(0,0,700,400);
    canvases[4].ctx.clearRect(0,0,700,400);
    canvases[5].ctx.clearRect(0,0,700,400);


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

    spritesCanvas2.push(new spawnSprite("60x60X_b2.png",395,8,60,60,canvases[2].ctx));                       //exit settings menu
    buttons.push(new makeButton(395,8,60,60,function() {

        menuOpen = false;
        
        buttons = [];
        buttons.push(new makeButton(65,0, 635,400, function() { 
            clickedDough()
        }));
        spritesCanvas1 = [];
        spritesCanvas2 = [];
        spritesCanvas3 = [];
        spritesCanvas4 = [];
        canvases[1].ctx.clearRect(0,0,700,400);
        canvases[2].ctx.clearRect(0,0,700,400);
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


    buttons.push(new makeButton(400,0, 300,400, function() { 
        clickedDough()
    }));

    canvases[2].ctx.fillStyle = "grey";
    canvases[2].ctx.fillRect(0,0,400,400);

    spritesCanvas2.push(new spawnSprite("resetDataButton_b2.png",20,20,120,30,canvases[2].ctx));
    buttons.push(new makeButton(20,20,120,30,function() {
        if(confirm("are you sure you want to reset data")) {
            if(confirm("are you really sure you want to reset data")) {
                resetData();
                location.reload();
            };
        };
    }));
};
