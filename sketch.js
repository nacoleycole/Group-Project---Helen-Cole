// Code in this function is run once, when the sketch is started.
z = 600
var squares;
var sound1;

function preload(){
  soundFormats("mp3");
  sound1 = loadSound("middlec.mp3");
  
}
function setup() {
  createCanvas(z, z);
 
}
// this class setsup the blueprint for the pattern
class Rectanglez {
  constructor(x,y,XSideLength,YSideLength){
    this.x=x;
    this.y=y;
    this.XSideLength=XSideLength;
    this.YSideLength=YSideLength;
  }
  //takes care of the colors
  colorIt(){
    fill(random(255),random(255),random(255),50)
  }
  // actually draws out the pattern
  drawRectangles(){
   
    this.sqrFill(this.x,this.y,this.XSideLength,this.YSideLength);
  }
  // this fill each larger square as they are being visited one by one 
  sqrFill(x,y,xLength,yLength){
    if(xLength<5||yLength<5){return;}
     this.colorIt();
    rect(x,y,xLength,yLength);
    let dec = random (5,14);
    let add = dec/2;

    this.sqrFill(x+add,y+add,xLength-dec,yLength-dec)
  }

  getClicked(x, y){
    if((x >= this.x && x <= (this.x+this.XSideLength)) && (y >= this.y && y <= (this.y+this.YSideLength))){
       sound1.play();
      //play sound
    }
  }
}
// the double for loops in this fucntion makes it so all of the larger squares are visited one by one 
function getSquares(){
  let Xl = width/4;
  let Yl= width/4;
  squares=[];
  for (let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      squares.push(new Rectanglez(i*Xl,j*Yl,Xl,Yl));
    }
  }
  
}

function draw() {
  background(220);
  getSquares();
  squares.forEach(x => x.drawRectangles())
  noLoop();
}


function mousePressed(){
  squares.forEach(x => x.getClicked(mouseX, mouseY))
}