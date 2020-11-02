let rectanglez;
z = 600

function setup() {
  createCanvas(z, z);
}


class Rectanglez {
  constructor(x, y, XSideLength, YSideLength) {
    this.x = x;
    this.y = y;
    this.XSideLength = XSideLength;
    this.YSideLength = YSideLength;
  }
  colorIt() {
    noStroke()
    fill(random(255), random(255), random(255), 50)
  }



  drawRectangles() {

    this.sqrFill(this.x, this.y, this.XSideLength, this.YSideLength);
  }
  sqrFill(x, y, xLength, yLength) {
    if (xLength < 20 || yLength < 20) {
      return;
    }
    this.colorIt();
    rect(x, y, xLength, yLength);
    let dec = random(5, 30);
    let add = dec / 2;

    this.sqrFill(x + add, y + add, xLength - dec, yLength - dec)
  }
}


function getSquares() {
  let Xl = width / 4;
  let Yl = width / 4;
  let squares = [];
  for (let i = 0; i < 160; i++) {
    for (let j = 0; j < 8; j++) {

      //       mouseXYdrag
      squares.push(new Rectanglez(i * Xl, j * Yl, mouseX, mouseY));
    }
  }
  return squares;
}

function draw() {
  background(0);
  mousePressed(squares);
  let squares = getSquares();
  squares.forEach(x => x.drawRectangles())
}


function mousePressed(){
  if(isLooping())
    {
    noLoop();
    }
    else
   {
    loop();   
     }
}