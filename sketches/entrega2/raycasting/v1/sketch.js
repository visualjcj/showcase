var ctx;
var canvas;
var FPS = 50;
var FOV = 60;

var tileH = 500;
var distanceToProyectionPlane;

var scene;
var player;

//Matriz Nivel 1

var nivel_1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

function setup() {
  createCanvas(500, 500);
  canvas = createGraphics(width, height);
  frameRate(FPS);
  distanceToProyectionPlane = (canvas.width / 2) / tan(FOV / 2);

  scene = new Level(canvas, nivel_1)
  player = new Player(canvas, scene, 100, 130, FOV);
}

function draw() {
  canvas.background(255);
  // canvas.clear()
  scene.draw()
  player.draw()
  image(canvas, 0, 0);
}

function keyReleased() {
  if (key == 'w' || key == 's') {
    player.movingReleased()
  }
  if (key == 'a' || key == 'd') {
    player.spinReleased()
  }
}

function normalizeAngle(angle) {
  angle = angle % (2 * PI);

  if (angle < 0) {
    angle = angle + (2 * PI);
  }

  return angle
}

function distanceBetweenPoints(x1, y1, x2, y2) {
  return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}

function degreesToRad(angle) {
  angle = angle * (PI / 180)
  return angle
}

// ================================== Level ==================================

var wallColor = '#065750';
var floorColor = '#6386FF';


class Level {
  constructor(canvas, arr) {
    this.canvas = canvas;
    this.arr = arr

    // dimensiones matriz del nivel
    this.width = this.arr[0].length;
    this.height = this.arr.length;


    // dimensiones de cada tile

    this.widthT = parseInt(this.canvas.height / this.width);
    this.heightT = parseInt(this.canvas.height / this.height);
  }


  draw() {
    let color;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.height; x++) {
        if (this.arr[y][x] == 1) {
          color = wallColor;
        } else
          color = floorColor;

        this.canvas.noStroke();
        this.canvas.fill(color);
        this.canvas.rect(x * this.widthT, y * this.heightT, this.widthT, this.heightT);
        // image(this.canvas, 0, 0);
      }
    }


  }

  colission(x, y) {
    let touch = false
    if (this.arr[y][x] != 0) {
      touch = true
    }
    return touch;
  }
}


// ================================== Player ==================================

const playerColor = '#0b0ba3';

class Player {
  constructor(canvas, scene, x, y, FOV) {
    this.canvas = canvas;
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.moving = 0; // 0 = parado, 1 = adelante, -1 = atras
    this.rotation = 0; // 0 = sin giro, -1 == izquierda, 1 = derecha

    this.angleRotation = 0;

    this.velocity = 3; // pixels
    this.velocityRot = 3 * (PI / 180); // degrees

    this.numRays = this.canvas.width;
    this.rays = [];

    this.FOV = FOV;

    let halfFOV = this.FOV / 2;

    let incAngle = degreesToRad(this.FOV / this.numRays)
    let initialAngle = degreesToRad(this.angleRotation - halfFOV);

    let angleRay = initialAngle;

    for (let i = 0; i < this.numRays; i++) {
      this.rays[i] = new Ray(this.canvas, this.scene, this.x, this.y, this.angleRotation, angleRay, i);
      angleRay += incAngle
    }
    // this.ray = new Ray(this.canvas, this.scene, this.x, this.y, this.angleRotation, 0);
  }

  draw() {
    this.update()

    for (let i = 0; i < this.numRays; i++) {
      this.rays[i].draw();
      // this.rays[i].renderWall()
    }

    this.canvas.push()
    this.canvas.fill(playerColor);
    this.canvas.rectMode(CENTER);
    this.canvas.rect(this.x, this.y, 6, 6);
    this.canvas.pop();

    let frontLineX = this.x + cos(this.angleRotation) * 10;
    let frontLineY = this.y + sin(this.angleRotation) * 10;

    // direction vector
    this.canvas.push()
    this.canvas.stroke('#FF0')
    this.canvas.line(this.x, this.y, frontLineX, frontLineY);
    this.canvas.pop();

    // image(this.canvas, 0, 0);
  }

  update() {

    if (keyIsDown(87)) {
      this.up();
    }
    if (keyIsDown(65)) {
      this.left();
    }
    if (keyIsDown(83)) {
      this.down()
    }
    if (keyIsDown(68)) {
      this.right()
    }

    //Moving
    let newX = this.x + (this.moving * (cos(this.angleRotation) * this.velocity));

    let newY = this.y + (this.moving * (sin(this.angleRotation) * this.velocity));


    if (!this.colission(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }


    //Spin
    this.angleRotation += this.rotation * this.velocityRot;
    this.angleRotation = normalizeAngle(this.angleRotation)

    // Update ray angle

    for (let i = 0; i < this.numRays; i++) {
      this.rays[i].x = this.x;
      this.rays[i].y = this.y;
      this.rays[i].setAngle(this.angleRotation);
    }
    // this.ray.setAngle(this.angleRotation);
    // this.ray.x = this.x;
    // this.ray.y = this.y;
    // this.ray.draw()

  }

  colission(x, y) {
    let touch = false;

    //get player tile
    let tileX = parseInt(x / this.scene.widthT);
    let tileY = parseInt(y / this.scene.heightT);

    if (this.scene.colission(tileX, tileY)) {
      touch = true
    }

    return touch;
  }




  up() {
    this.moving = 1;
  }

  down() {
    this.moving = -1;
  }

  left() {
    this.rotation = -1;
  }

  right() {
    this.rotation = 1;
  }

  movingReleased() {
    this.moving = 0;
  }

  spinReleased() {
    this.rotation = 0;
  }
}

// ================================== Ray ==================================

class Ray {
  constructor(canvas, scene, x, y, playerAngle, angleInc, column) {
    this.canvas = canvas;
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.angleInc = angleInc;
    this.playerAngle = playerAngle;
    this.angle = this.playerAngle + this.angleInc;
    this.column = column;
    this.distance = 0;

    this.wallHitX = 0;
    this.wallHitY = 0;

    this.wallHitXHorizontal = 0;
    this.wallHitYHorizontal = 0;

    this.wallHitXVertical = 0;
    this.wallHitYVertical = 0;
  }

  draw() {
    this.cast()

    // draw line

    let destX = this.wallHitX;
    let destY = this.wallHitY;


    // console.log(destX, destY)
    this.canvas.push()
    this.canvas.stroke(216, 219, 9, 20)
    this.canvas.line(this.x, this.y, destX, destY);
    this.canvas.pop()
  }

  renderWall() {
    this.cast()

    let virtualTileH = (tileH / this.distance) * distanceToProyectionPlane;

    // Get coordinates
    let y0 = parseInt(this.canvas.height / 2) - parseInt(virtualTileH / 2);
    let y1 = y0 + virtualTileH;
    let x = this.column;

    // console.log(x, y0, y1)
    // draw line
    this.canvas.push()
    this.canvas.stroke('#666666');
    this.canvas.line(x, y0, x, y1)
    this.canvas.pop()
  }

  setAngle(angle) {
    this.playerAngle = angle;
    this.angle = normalizeAngle(angle + this.angleInc)
  }

  cast() {
    this.xIntercept = 0;
    this.yIntercept = 0;

    this.xStep = 0;
    this.yStep = 0;

    // Get ray direction vector
    this.down = false;
    this.left = false;

    if (this.angle < PI) {
      this.down = true
    }

    if (this.angle > PI / 2 && this.angle < 3 * PI / 2) {
      this.left = true;
    }

    //------------------------ Horizontal --------------------------
    let horizontalTouch = false

    // first intersection

    // Search first intersection
    this.yIntercept = floor(this.y / this.scene.heightT) * this.scene.heightT;

    if (this.down) {
      this.yIntercept += this.scene.heightT;
    }


    let adyacent = (this.yIntercept - this.y) / tan(this.angle)
    this.xIntercept = this.x + adyacent;

    // distance of steps

    this.yStep = this.scene.widthT

    if (!this.down) {
      this.yStep = -this.yStep;
    }

    this.xStep = this.scene.widthT / tan(this.angle)

    // invert x if going wrong
    if ((this.left && this.xStep > 0) || (!this.left && this.xStep < 0)) {
      this.xStep = -this.xStep;
    }

    let nextXHorizontal = this.xIntercept;
    let nextYHorizontal = this.yIntercept;

    // Verify if looking top, the tile is correct
    if (!this.down) {
      nextYHorizontal--;
    }


    // loop
    while (!horizontalTouch) {
      let tileX = parseInt(nextXHorizontal / this.scene.widthT);
      let tileY = parseInt(nextYHorizontal / this.scene.widthT);

      if (this.scene.colission(tileX, tileY)) {
        horizontalTouch = true;
        this.wallHitXHorizontal = nextXHorizontal;
        this.wallHitYHorizontal = nextYHorizontal;
      } else {
        nextXHorizontal += this.xStep;
        nextYHorizontal += this.yStep;
      }
    }

    //------------------------ Vertical --------------------------
    let verticalTouch = false

    // first intersection

    // Search first intersection
    this.xIntercept = floor(this.x / this.scene.widthT) * this.scene.widthT;

    if (!this.left) {
      this.xIntercept += this.scene.widthT;
    }


    let opposite = (this.xIntercept - this.x) * tan(this.angle)
    this.yIntercept = this.y + opposite;

    // distance of steps

    this.xStep = this.scene.widthT

    // invert if left
    if (this.left) {
      this.xStep = -this.xStep
    }

    this.yStep = this.scene.widthT * tan(this.angle)

    // invert y if going wrong
    if ((!this.down && this.yStep > 0) || (this.down && this.yStep < 0)) {
      this.yStep = -this.yStep;
    }

    let nextXVertical = this.xIntercept;
    let nextYVertical = this.yIntercept;

    if (this.left) {
      nextXVertical--;
    }


    // loop
    while (!verticalTouch && (nextXVertical >= 0 && nextYVertical >= 0) && (nextXVertical < this.canvas.width && nextYVertical < this.canvas.height)) {
      let tileX = parseInt(nextXVertical / this.scene.widthT);
      let tileY = parseInt(nextYVertical / this.scene.widthT);

      if (this.scene.colission(tileX, tileY)) {
        verticalTouch = true;
        this.wallHitXVertical = nextXVertical;
        this.wallHitYVertical = nextYVertical;
      } else {
        nextXVertical += this.xStep;
        nextYVertical += this.yStep;
      }
    }


    let horizontalDistance = 9999;
    let verticalDistance = 9999;

    if (horizontalTouch) {
      horizontalDistance = distanceBetweenPoints(this.x, this.y, this.wallHitXHorizontal, this.wallHitYHorizontal);
    }

    if (verticalTouch) {
      verticalDistance = distanceBetweenPoints(this.x, this.y, this.wallHitXVertical, this.wallHitYVertical);
    }

    if (horizontalDistance < verticalDistance) {
      this.wallHitX = this.wallHitXHorizontal;
      this.wallHitY = this.wallHitYHorizontal;
      this.distance = horizontalDistance;
    } else {
      this.wallHitX = this.wallHitXVertical;
      this.wallHitY = this.wallHitYVertical;
      this.distance = verticalDistance;
    }

    this.distance = this.distance * cos(this.angle - this.playerAngle);
  }
}