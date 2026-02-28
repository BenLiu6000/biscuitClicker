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
