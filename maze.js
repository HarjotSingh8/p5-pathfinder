var rows;
var canvasW=500;  //width of Area for maze
var scaleX;
var scaleY;
var cols;
var canvasH;
var bgcol=200;
var wallCol=0;

function makeMaze() {
  setupScaling();
  setupPoints();
  setupStartDestination()
  populateMaze();
  addpathNeighbours();
}
function setupStartDestination() {
  start = points[starti][startj];
  target = points[targeti][targetj];
  start.wall=false;
  start.colR=255;
  start.colG=255;
  start.colB=255;
  target.wall=false;
  target.colR=255;
  target.colG=255;
  target.colB=255;
  calcA(start, start);
  calcB(start, start);
}
function setupScaling() {
  scaleX = mapHeight/cols;
  scaleY = mapWidth/rows;
  if(scaleY>scaleX) {
    eScale=scaleX;
    scaleY=scaleX;
  }
  else {
    eScale=scaleY;
    scaleX=scaleY;
  }
  if(cols%2==0) {
    //cols+=1
  }
  if(rows%2==0) {
    //rows+=1
  }
}
function generatePath(a, b) {
  //showPoints();
  if(checkDeadEnd(a)) {
    a.path=true;
    next=a.openNeighbours[floor(random(a.openNeighbours.length))];
    removeWall(a,next);
    if(random(2)>0.5) {
      next=a.openNeighbours[floor(random(a.openNeighbours.length))];
      removeWall(a,next);
    }
    generatePath(next, false);
  }
  else {
    if(a.y>cols/2) {
      removeWall(a, points[a.x][a.y-2]);
    }
    else {
      removeWall(a, points[a.x][a.y+2]);
    }
  }
}

function populateMaze() {
  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      if(!points[i][j].path && !points[i][j].wall) {
        generatePath(points[i][j], true);
      }
    }
  }
}

function checkDeadEnd(a) {
  for(var i=a.openNeighbours.length-1; i>=0; i--) {
    if(a.openNeighbours[i].path) {
      a.openNeighbours.splice(i, 1);
    }
  }
  if(a.openNeighbours.length>0) {
    return true;
  }
  else {

    return false;
  }
}

function removeWall(a, b) {
  var x = points[(a.x+b.x)/2][(a.y+b.y)/2];
  console.log(a.x);
  console.log(a.y);
  console.log(b.x);
  console.log(b.y);
  console.log(rows);
  console.log(cols);
  x.wall=false;
  x.path=true;

}
