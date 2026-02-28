
function multiSplice(array,indexes=[]) {
    indexes.sort(function(a,b){return b-a});
    for(let i=0;i<indexes.length;i++) {
        array.splice(indexes[i],1);
    };
} ;






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





