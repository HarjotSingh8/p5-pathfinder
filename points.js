var points;

function pt(x,y) {
  this.x=x;
  this.y=y;
  this.xp=200+this.x*scaleX + scaleX/2;
  this.yp=this.y*scaleY + scaleY/2;
  this.wall=false;
  this.path=false;

  this.fA=0;
  this.hA=0;
  this.gA=0;
  this.fB=0;
  this.hB=0;
  this.gB=0;
  this.closedA=false;
  this.closedB=false;
  this.previousA;
  this.previousB;


  if(x%2==1 || y%2==1) {
    this.wall=true;
  }

  this.neighbours=new Array();
  //this.neighbourCount=0;
  this.openNeighbours=new Array();
  this.col=bgcol;

  this.addNeighbour = function() {
    if(this.x-1>0) {
      this.openNeighbours.push(points[x-2][y]);
    }
    if(this.x+2<cols) {
      this.openNeighbours.push(points[x+2][y]);
    }
    if(this.y-1>0) {
      this.openNeighbours.push(points[x][y-2]);
    }
    if(this.y+2<rows) {
      this.openNeighbours.push(points[x][y+2]);
    }

    if(this.x>0 && this.wall && points[x-1][y].wall) {
      this.neighbours.push(points[x-1][y]);
    }
    if(this.x<cols-1 && this.wall && points[x+1][y].wall) {
      this.neighbours.push(points[x+1][y]);
    }
    if(this.y>0 && this.wall && points[x][y-1].wall) {
      this.neighbours.push(points[x][y-1]);
    }
    if(this.y<rows-1 && this.wall && points[x][y+1].wall) {
      this.neighbours.push(points[x][y+1]);
    }
  }

  this.pathNeighbours = function() {
    if(this.x>0 && !this.wall && !points[x-1][y].wall) {
      this.neighbours.push(points[x-1][y]);
    }
    if(this.x<cols-1 && !this.wall && !points[x+1][y].wall) {
      this.neighbours.push(points[x+1][y]);
    }
    if(this.y>0 && !this.wall && !points[x][y-1].wall) {
      this.neighbours.push(points[x][y-1]);
    }
    if(this.y<rows-1 && !this.wall && !points[x][y+1].wall) {
      this.neighbours.push(points[x][y+1]);
    }
  }
}

function addpathNeighbours() {
  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      points[i][j].pathNeighbours();
    }
  }
}

function setupPoints() {
  console.log(rows);
  console.log(cols);
  points = new Array(cols);
  for(var i=0; i<cols; i++) {
    points[i]= new Array(rows);
  }
  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      points[i][j]=new pt(i,j);
    }
  }
  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      points[i][j].addNeighbour();
    }
  }
}
function showPoints() {
  noStroke();
  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      fill(points[i][j].col);
      ellipse(points[i][j].xp, points[i][j].yp, scale/2, scale/2);
    }
  }
  //lines
  for(var i=0; i<cols; i++) {
    for(var j=0; j<rows; j++) {
      var a=points[i][j];
      if(a.wall)
      for(k=0; k<points[i][j].neighbours.length; k++) {
        var b = points[i][j].neighbours[k];
        if((b.x>a.x || b.y>a.y) && b.wall) {
          stroke(wallCol);
          strokeWeight(scale/2);
          beginShape();
          vertex(b.xp,b.yp);
          vertex(a.xp,a.yp);
          endShape();
        }
      }
    }
  }

}
