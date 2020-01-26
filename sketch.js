var canvasWidth;
var canvasHeight;
//Inputs
  var colInput;
  var rowInput;
  var wallInput;
  var buttonGenerate;
  var buttonSolve;
  var solveBool=false;
//

function setup() {
  canvasWidth = window.outerWidth-10;
  canvasHeight = window.outerHeight-90;
  createCanvas(canvasWidth, canvasHeight);
  //Inputs
  {
    colInput = createInput(50, 'numbers');
    rowInput = createInput(40, 'numbers');
    wallInput = createInput(40, 'numbers');
    startInputi = createInput('2', 'numbers');
    startInputj = createInput('2', 'numbers');
    targetInputi = createInput(49, 'numbers');
    targetInputj = createInput(19, 'numbers');
    buttonGenerate = createButton('Generate');
    buttonSolve = createButton('solve');
  }
  //
  //noLoop();
  background(100);
  drawInput();
  gen();
  noLoop();
}



function draw() {
  //if(solveBool==true){
    solve();
  //}

noStroke();
fill(255);
for(var i = 0; i<openSetA.length; i++) {
  ellipse(openSetA[i].xp, openSetA[i].yp, scaleX/2, scaleY/2);
}
fill(255, 0,255);
for(var i = 0; i<openSetB.length; i++) {
  ellipse(openSetB[i].xp, openSetB[i].yp, scaleX/2, scaleY/2);
}
drawOutput();

//console.log("ran");
}
