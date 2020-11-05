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
  // background(200);
  squares= getSquares();
  squares.forEach(x => x.drawRectangles())
  
}
// this class setsup the blueprint for the pattern
class Rectanglez {
  constructor(x,y,XSideLength,YSideLength){
    this.x=x;
    this.y=y;
    this.XSideLength=XSideLength;
    this.YSideLength=YSideLength;
    this.sqrDiff= 50; 
    this.variable = false
    this.rgb = [0,0,0]


  }
  //takes care of the colors
  colorIt(){
    fill(random(this.rgb[0], 255),random(this.rgb[1], 255),random(this.rgb[2], 255))
  }
  // actually draws out the pattern
  drawRectangles(){
    this.sqrFill(this.x,this.y,this.XSideLength,this.YSideLength);
    
    
  }
  // this fill each larger square as they are being visited one by one 
  sqrFill(x,y,xLength,yLength){
    if(xLength<17||yLength<17){return;}
    this.rgbChange(); 
     this.colorIt();
    rect(x,y,xLength,yLength);
    noStroke();
    let dec = random (5,15);
    let add = dec/2;

    this.sqrFill(x+add,y+add,xLength-dec,yLength-dec)
    
  }

  getClicked(x, y){
    // console.log(this.x, this.y, this.x+this.sqrDiff, this.x+this.XSideLength-this.sqrDiff, this.y +this.YSideLength - this.sqrDiff, this.y+this.sqrDiff)
      //without this if statment the user could click anywhere on the canvas and it would make sound- with it sound only comes when clicked in the cente squares
    if((x >= (this.x+this.sqrDiff) && x <= (this.x+this.XSideLength-this.sqrDiff)) && (y <= (this.y +this.YSideLength - this.sqrDiff)) && (y >= (this.y+this.sqrDiff))){
      console.log('playing');
      sound1.play();
       // this is the line that makes the patter redraw after the user clicks
      this.clicked = !this.clicked;
      this.rgbChange();
        }
    }

  rgbChange(){
    this.rgb[0] = (this.rgb[0] + 53) % 200;
    this.rgb[1] = (this.rgb[1] + 77) % 200;
    this.rgb[2] = (this.rgb[2] + 36) % 200;
  }
  VisualEffect(){
    if(this.clicked){
      this.drawRectangles();
    }
  }
  
}

          
      
  

// the double for loops in this fucntion makes it so all of the larger squares are visited one by one 
function getSquares(){
  let Xl = width/4;
  let Yl= height/4;
  squares=[];
  for (let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      squares.push(new Rectanglez(i*Xl,j*Yl,Xl,Yl));
    }
  }
  return squares;
}

function draw() {
  squares.forEach(x => x.VisualEffect());

}


function mousePressed(){
  // console.log(mouseX, mouseY)
  squares.forEach(x => x.getClicked(mouseX, mouseY))
  // squares.forEach(x => x.drawRectangles())

//   if(isLooping())
//   {
//   noLoop();
//   }
//   else
//  {
//   loop();   
//    }
}