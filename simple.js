var openSetA = new Array();
//openSetA.push(grid[0][0]);
var winnerA;//=grid[0][0];
var a;//=grid[0][0];
var b;
var path;
var distA;

//
function solveA() {
  if(openSetA.length>0 && !completedA) {
    for(var i = openSetA.length-1; i>=0; i--) {
      if(openSetA[i]==target) {
        completedA=true;
        boolA=false;
      }
      a=openSetA[i];
      //console.log(a.fa);
      console.log(a.x+" "+a.y);
        if(openSetA[i].fA<=winnerA.fA) {
          console.log(openSetA.length);
          for(var j = 0; j<openSetA[i].neighbours.length; j++) {
            b=openSetA[i].neighbours[j];

            if(!b.closedA && !b.wall) {
              calcA(openSetA[i], b);
              checkPushA(b);
            }
          }
          if(openSetA[i].i==targeti && openSetA[i].j==targetj) {
            completedA=true;
            boolA=false;
          }
          openSetA[i].closedA=true;
          removeFromOpenA(i);
        }
    }
  }
  else {

  }
}

function removeFromOpenA(x) {
  //for(var x = openSetA.length-1; x>=0; x--) {
    //if(openSetA[x].i==a.i && openSetA[x].j==a.j) {
      openSetA.splice(x, 1);
    //}
  //}
}

function calcA(a, b) {
  var g=a.gA+Math.sqrt( (a.x-b.x)*(a.x-b.x) + (a.x-b.x)*(a.x-b.x) );
  if(g<b.gA || b.gA==0) {
    b.gA=g;
    b.previousA=a;
  }
  //b.h=Math.sqrt( (b.i-targeti)*(b.i-targeti) + (b.j-targetj)*(b.j-targetj) );
  b.hA = abs(b.x-targeti) + abs(b.x-targetj);
  b.fA=b.gA+b.hA;
  console.log('ran calc a'+b.fA);
}

function checkPushA(a) {
  var x = true;
  for(var i=0; i<openSetA.length; i++) {
    if(openSetA[i].x==a.x && openSetA[i].y==a.y) {
      x=false;
    }
  }
  if(x) {
    openSetA.push(a);
  }

}
function findWinnerA() {
  drawableA=true;
  winnerA=openSetA[0];
    for(var i=0; i<openSetA.length-1; i++) {
      if(openSetA[i].fA<winnerA.fA) {
        winnerA=openSetA[i];
      }
    }
    console.log(openSetA.length);
    distA=winnerA.gA;
}

function drawA() {
  drawMap();
  showPoints();
  fill(255,0,0);
  var path = target;
  if(!completedA) {
    findWinnerA();
    var path = winnerA;
  }


  noFill();
  stroke(255);
  strokeWeight(eScale/2);
  beginShape();
  if(completedA)
  vertex(target.xp, target.yp);
  while(path!=start) {
    path=path.previousA;
    vertex(path.xp, path.yp);
  }
  endShape();
  noStroke();
  //fill(0,255,0);
  //for(var i = 0; i<openSetA.length; i++) {
  //  ellipse(openSetA[i].eXPos, openSetA[i].eYPos, eHeight, ewidth);
  //}
}
