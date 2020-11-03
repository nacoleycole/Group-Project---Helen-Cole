// Code in this function is run once, when the sketch is started.
z = 600
var squares;
 var sound1;

 function preload(){

   soundFormats('mp3');
   sound1 = loadSound('middleCEdited.mp3');
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
    if(xLength<1||yLength<10){return;}
     this.colorIt();
    rect(x,y,xLength,yLength);
    let dec = random (5,14);
    let add = dec/2;

    this.sqrFill(x+add,y+add,xLength-dec,yLength-dec)
    this.sqrDiff+=add;
  }

  getClicked(x, y){
    console.log(this.x, this.y, this.x+this.sqrDiff, this.x+this.XSideLength-this.sqrDiff, this.y +this.YSideLength - this.sqrDiff, this.y+this.sqrDiff)
      //without this if statment the user could click anywhere on the canvas and it would make sound- with it sound only comes when clicked in the cente squares
    if((x >= (this.x+this.sqrDiff) && x <= (this.x+this.XSideLength-this.sqrDiff)) && (y <= (this.y +this.YSideLength - this.sqrDiff)) && (y >= (this.y+this.sqrDiff))){
      console.log('playing');
      sound1.play();

       /// I THINK this is where it would make sense to add your effects that you want to happen once its clicked 
      //if you want the effects to only happen when clicked in the middle, then you can leave the if statment as i and
      //just add your code right in this space 
      // if you want it to have this effect when clikced in other places then you can add another while or if statment
      // I also think that if you add your mouse x mouse y function as a method in this class, and call it at the appropriate 
      //time that should work as well
      this.sqrDiff = 0;
      this.drawRectangles(); // this is the line that makes the patter redraw after the user clicks
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
  console.log(mouseX, mouseY)
  squares.forEach(x => x.getClicked(mouseX, mouseY))
}