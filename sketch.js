// Code in this function is run once, when the sketch is started.
let rectanglez;

z = 600
var squares;
 var sound1;

 function preload(){

   soundFormats('mp3');
   sound1 = loadSound('middleCEdited.mp3');
 }
function setup() {
  let canvas = createCanvas(z, z);
  
}
// this class setsup the blueprint for the pattern
class Rectanglez {
  constructor(x,y,XSideLength,YSideLength){
    this.x=x;
    this.y=y;
    this.XSideLength=XSideLength;
    this.YSideLength=YSideLength;
    this.sqrDiff= 0 
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
    if(xLength<20||yLength<20){return;}
     this.colorIt();
    rect(x,y,xLength,yLength);
    noStroke();
    // ellipse(x/2,y/2,xLength/2,yLength);
    let dec = random (5,30);
    let add = dec/2;

    this.sqrFill(x+add,y+add,xLength-dec,yLength-dec)
    this.sqrDiff+=add;
  }

  getClicked(x, y){
    console.log(x, y, this.x+this.sqrDiff, this.x+this.XSideLength-this.sqrDiff, this.y +this.YSideLength - this.sqrDiff, this.y+this.sqrDiff)
      if((x >= (this.x+this.XSideLength-this.sqrDiff) && x <= (this.x+this.sqrDiff)) && (y <= (
        this.y+this.sqrDiff)) && (y >= (this.y +this.YSideLength - this.sqrDiff))){
      console.log('playing');
      sound1.play();
      this.sqrDiff = 0;
      this.drawRectangles();
        }  
        this.x+this.sqrDiff
      }
   }

// the double for loops in this fucntion makes it so all of the larger squares are visited one by one 
function getSquares(){
  let Xl = width/4;
  let Yl= width/4;
  squares=[];
  for (let i=0;i<160;i++){
    for(let j=0;j<10;j++){
      squares.push(new Rectanglez(i*Xl,j*Yl,Xl,Yl));
    }
  }
  return squares;
}

function draw() {
  background(200);
  squares= getSquares();
  squares.forEach(x => x.drawRectangles())
  // noLoop();
}


function mousePressed(){
  console.log(mouseX, mouseY)
  squares.forEach(x => x.drawRectangles())
  squares.forEach(x => x.getClicked(mouseX, mouseY))

  if(isLooping())
  {
  noLoop();
  }
  else
 {
  loop();   
   }
}