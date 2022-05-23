var ctx;
var canvas;
var FPS = 50;
var FOV = 60;

var tileH = 500;
var distanceToProyectionPlane;

var scene;
var player;

var tiles;

var slider;
var select;

var maze;

function preload() {
  // load texture tiles
  // tiles = loadImage('/showcase/sketches/entrega2/raycasting/assets/textures-final.png')
  tiles = loadImage('/showcase/textures-final.png')
}

function setup() {
  createCanvas(500, 500);
  canvas = createGraphics(width, height);
  frameRate(FPS);
  distanceToProyectionPlane = (canvas.width / 2) / tan(FOV / 2);

  maze = new Maze(10, 50, canvas)
  maze.generate()
  let mazeLevel = normalizeMatrix(maze.cells)

  console.log(mazeLevel)
  scene = new Level(canvas, mazeLevel)

  let posX = 300,
    posY = 300;
  // for (let i = 0; i < 10; i++) {
  //   for (let j = 0; j < 10; j++) {
  //     if (mazeLevel[i][j] == 0) {
  //       posX = i * scene.tileSize
  //       posY = j * scene.tileSize
  //       break;
  //     }
  //   }
  // }
  // console.log(posX, posY)
  player = new Player(canvas, scene, posX + 10, posY + 10, FOV);

  slider = createSlider(30, 120, 60, 1);
  slider.position(0, canvas.height + 50)
  select = createSelect();
  select.option('Level 1')
  select.option('Level 2')
  select.option('Level 3')
  select.position(150, canvas.height + 50)
  select.changed(levelChange)
  let p = createP('Change FOV')
  p.position(0, canvas.height + 2)
  let p1 = createP('Change Level')
  p1.position(150, canvas.height + 2)
}

function draw() {
  canvas.background(255);


  // distanceToProyectionPlane = (canvas.width / 2) / tan(player.FOV / 2);
  // console.log(this.canvas.width / 2, tan(FOV / 2), distanceToProyectionPlane)
  // console.log(distanceToProyectionPlane)

  // ceil
  canvas.push()
  canvas.fill('#666666');
  canvas.rect(0, 0, 500, 250);
  canvas.pop()

  // floor
  canvas.push()
  canvas.fill('#752300');
  canvas.rect(0, 250, 500, 500);
  canvas.pop()



  // scene.draw()
  player.draw()

  image(canvas, 0, 0);

  // let initial = 100;
  // for (let i = 0; i < 64; i++) {
  //   image(tiles, initial + i, 100, 1, 64, i + 64, 128, 1, 64);
  // }
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

function levelChange() {
  // console.log(select.value())
  if (select.value() === 'Level 1') {
    scene.arr = nivel_1
  } else if (select.value() === 'Level 2') {
    scene.arr = nivel_2
  } else if (select.value() === 'Level 3') {
    scene.arr = nivel_3
  }

  player.x = 60;
  player.y = 60;
  player.angleRotation = 0;
}

function normalizeMatrix(matrix) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      matrix[i][j] -= 16;
      // if (i == 0 || j == 0 || i + 1 == 10 || j + 1 == 10) {
      //   matrix[i][j] = 1
      // } else {
      if (i == 6 && j == 6) {
        matrix[i][j] = 0
      } else {
        matrix[i][j] = floor(map(matrix[i][j], 1, 14, 0, 3, true));
      }
    }
  }
  return matrix;
}

//Matriz Nivel 1

var nivel_1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 3, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 3, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 3, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 3, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 3, 0, 0, 0, 0, 1],
  [1, 0, 2, 0, 3, 1, 2, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

var nivel_2 = [
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
]

var nivel_3 = [
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 0, 2, 2, 2, 2],
  [2, 0, 0, 0, 2, 0, 2, 0, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 2, 0, 2],
  [2, 0, 2, 2, 2, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 2, 2, 2, 2, 2, 2, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
]


// =================================== LEVEL ==========================================

var wallColor = '#065750';
var floorColor = '#6386FF';


class Level {
  constructor(canvas, arr) {
    this.canvas = canvas;
    this.arr = arr

    // dimensiones matriz del nivel
    this.width = this.arr[0].length;
    this.height = this.arr.length;
    // console.log(`width: ${this.width} height: ${this.height}`)


    // dimensiones de cada tile

    this.widthT = parseInt(this.canvas.width / this.width);
    this.heightT = parseInt(this.canvas.height / this.height);

    this.tileSize = 50;

    // console.log(`width: ${this.widthT} height: ${this.heightT}`)
  }


  draw() {
    let color;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.arr[y][x] == 1) {
          color = wallColor;
        } else if (this.arr[y][x] == 2) {
          color = '#666666';
        } else if (this.arr[y][x] == 3) {
          color = '#FF00FF';
        } else {
          color = floorColor;
        }

        if (maze.cells[i][j] & TOP_C)
          this.canvas.line(x, y, x + this.tileSize, y) // TOP
        if (maze.cells[i][j] & LEFT_C)
          this.canvas.line(x, y, x, y + this.tileSize) // LEFT
        if (maze.cells[i][j] & RIGTH_C)
          this.canvas.line(x + this.tileSize, y, x + this.tileSize, y + this.tileSize) // RIGTH
        if (maze.cells[i][j] & BOTTOM_C)
          this.canvas.line(x, y + this.tileSize, x + this.tileSize, y + this.tileSize) // BOTTOM

        this.canvas.noStroke();
        this.canvas.fill(color);

        if (x == 0 || y == 0 || x + 1 == 10 || y + 1 == 10) {
          this.canvas.rect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        }
        // this.canvas.rect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        // this.canvas.rect(x * this.widthT, y * this.heightT, this.widthT, this.heightT);
      }
    }


  }

  colission(x, y) {
    let touch = false
      // console.log(x, y)
    if (this.arr[y][x] != 0) {
      touch = true
    }
    return touch;
  }

  getTile(x, y) {
    let tileX = parseInt(x / this.tileSize);
    let tileY = parseInt(y / this.heightT);
    return this.arr[tileY][tileX];
  }
}

// =================================== Player ==========================================

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

    this.halfFOV = this.FOV / 2;

    // let incAngle = degreesToRad(this.FOV / this.numRays)
    // let initialAngle = degreesToRad(this.angleRotation - this.halfFOV);

    // let angleRay = initialAngle;

    // for (let i = 0; i < this.numRays; i++) {
    //   this.rays[i] = new Ray(this.canvas, this.scene, this.x, this.y, this.angleRotation, angleRay, i);
    //   angleRay += incAngle
    // }
    // this.ray = new Ray(this.canvas, this.scene, this.x, this.y, this.angleRotation, 0);
  }

  draw() {
    this.update()

    for (let i = 0; i < this.numRays; i++) {
      // this.rays[i].draw();
      this.rays[i].renderWall()
    }

    // this.canvas.push()
    // this.canvas.fill(playerColor);
    // this.canvas.rectMode(CENTER);
    // this.canvas.rect(this.x, this.y, 6, 6);
    // this.canvas.pop();

    // let frontLineX = this.x + cos(this.angleRotation) * 10;
    // let frontLineY = this.y + sin(this.angleRotation) * 10;

    // // direction vector
    // this.canvas.push()
    // this.canvas.stroke('#FF0')
    // this.canvas.line(this.x, this.y, frontLineX, frontLineY);
    // this.canvas.pop();
  }

  update() {

    this.FOV = slider.value()
    this.halfFOV = this.FOV / 2;

    let incAngle = degreesToRad(this.FOV / this.numRays)
    let initialAngle = degreesToRad(this.angleRotation - this.halfFOV);
    let angleRay = initialAngle;

    for (let i = 0; i < this.numRays; i++) {
      if (this.rays.length > this.numRays) {
        this.rays.pop()
      }
      this.rays[i] = new Ray(this.canvas, this.scene, this.x, this.y, this.angleRotation, angleRay, i);
      angleRay += incAngle
    }
    // console.log(FOV)

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
    let tileX = parseInt(x / this.scene.tileSize);
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


// =================================== Ray ==========================================


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

    this.texturePixel = 0;
    this.textureId = 1;
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


    // drawing with texture
    let textureH = 64;
    let imageH = y0 - y1;

    this.canvas.push()
      // this.canvas.noSmooth()
    this.canvas.image(
      tiles, // img
      x, // dx
      y1, // dy
      1, // dWidth
      imageH, // dHeight
      this.texturePixel + 64, // sx
      this.textureId * textureH, // sy,
      1, // sWidth
      textureH // sHeight
    )
    this.canvas.pop()

    // this.canvas.smooth()

    // draw line
    // this.canvas.push()
    // this.canvas.stroke('#8c1700');
    // this.canvas.line(x, y0, x, y1)
    // this.canvas.pop()
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
    this.yIntercept = floor(this.y / this.scene.tileSize) * this.scene.tileSize;

    if (this.down) {
      this.yIntercept += this.scene.tileSize;
    }


    let adyacent = (this.yIntercept - this.y) / tan(this.angle)
    this.xIntercept = this.x + adyacent;

    // distance of steps

    this.yStep = this.scene.tileSize

    if (!this.down) {
      this.yStep = -this.yStep;
    }

    this.xStep = this.scene.tileSize / tan(this.angle)

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
      let tileX = parseInt(nextXHorizontal / this.scene.tileSize);
      let tileY = parseInt(nextYHorizontal / this.scene.tileSize);

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
    this.xIntercept = floor(this.x / this.scene.tileSize) * this.scene.tileSize;

    if (!this.left) {
      this.xIntercept += this.scene.tileSize;
    }


    let opposite = (this.xIntercept - this.x) * tan(this.angle)
    this.yIntercept = this.y + opposite;

    // distance of steps

    this.xStep = this.scene.tileSize

    // invert if left
    if (this.left) {
      this.xStep = -this.xStep
    }

    this.yStep = this.scene.tileSize * tan(this.angle)

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
      let tileX = parseInt(nextXVertical / this.scene.tileSize);
      let tileY = parseInt(nextYVertical / this.scene.tileSize);

      // if (tileX === 4)
      //   console.log(tileX, tileY)
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

      let tile = parseInt(this.wallHitX / this.scene.tileSize)
      this.texturePixel = this.wallHitX - (tile * this.scene.tileSize);
    } else {
      this.wallHitX = this.wallHitXVertical;
      this.wallHitY = this.wallHitYVertical;
      this.distance = verticalDistance;

      let tile = parseInt(this.wallHitY / this.scene.tileSize)
      this.texturePixel = this.wallHitY - (tile * this.scene.tileSize);
    }


    this.textureId = this.scene.getTile(this.wallHitX, this.wallHitY);
    this.distance = this.distance * cos(this.angle - this.playerAngle);
  }
}

// =================================== Maze ==========================================

const VISITED = 16;
const LEFT_C = 1;
const TOP_C = 2;
const RIGTH_C = 4;
const BOTTOM_C = 8;

class Maze {

  /*
      La grilla se representara con una matiz de enteros los donde los left most bits representaran
      un muro de la la cellda, se dristribuiran de la siguiente forma la representacion de los muros
      en la matriz
        1: left wall
        2: top wall
        4: rigth wall
        8: bottom wall
        16: visited
      Si una celda (i, j) tiene todos los muros, la matriz cell[i][j] tendra el valor de 15
      El atributo neighbors indica que vecinos no ha sido visitado LEFT, TOP, RIGTH, BOTTOM
  */

  constructor(size, widCell) {
    this.cells = new Array(size).fill(0).map(() => new Array(size).fill(15));
    this.len = size
    this.neighbors = []
    this.stack = [{ x: 0, y: 0 }]
    this.cells[0][0] += VISITED
    this.wid = widCell
  }

  show() {
    for (let i = 0; i < this.len; i++) {
      for (let j = 0; j < this.len; j++) {
        stroke(255)
        let x = j * this.wid
        let y = i * this.wid
        if (this.cells[i][j] & TOP_C)
          line(x, y, x + this.wid, y) // TOP
        if (this.cells[i][j] & LEFT_C)
          line(x, y, x, y + this.wid) // LEFT
        if (this.cells[i][j] & RIGTH_C)
          line(x + this.wid, y, x + this.wid, y + this.wid) // RIGTH
        if (this.cells[i][j] & BOTTOM_C)
          line(x, y + this.wid, x + this.wid, y + this.wid) // BOTTOM
      }
    }
  }

  generate() {
    while (this.stack.length !== 0) {
      let current = this.stack.pop()
      let options = this.hasUnVisited(current)
      if (options.length !== 0) {
        this.stack.push(current)
        var chossen = this.pickNeighbor(options)

        chossen = this.removeWall(chossen, current)

        this.cells[chossen.x][chossen.y] += VISITED
        this.stack.push(chossen)
      }
    }
  }

  hasUnVisited(current) {
    let unVisited = []
    if (current.x !== 0 && !(this.cells[current.x - 1][current.y] & VISITED))
      unVisited.push("TOP")

    if (current.x !== this.len - 1 && !(this.cells[current.x + 1][current.y] & VISITED))
      unVisited.push("BOTTOM")

    if (current.y !== 0 && !(this.cells[current.x][current.y - 1] & VISITED))
      unVisited.push("LEFT")

    if (current.y !== this.len - 1 && !(this.cells[current.x][current.y + 1] & VISITED))
      unVisited.push("RIGTH")

    return unVisited
  }

  pickNeighbor(options) {
    let unVisited = options[floor(random() * options.length)]
    return unVisited
  }

  removeWall(chossen, current) {
    let index = { x: current.x, y: current.y }
    switch (chossen) {
      case "TOP":
        this.cells[current.x][current.y] ^= TOP_C
        this.cells[current.x - 1][current.y] ^= BOTTOM_C
        index.x -= 1
        break
      case "BOTTOM":
        this.cells[current.x][current.y] ^= BOTTOM_C
        this.cells[current.x + 1][current.y] ^= TOP_C
        index.x += 1
        break
      case "RIGTH":
        this.cells[current.x][current.y] ^= RIGTH_C
        this.cells[current.x][current.y + 1] ^= LEFT_C
        index.y += 1
        break
      case "LEFT":
        this.cells[current.x][current.y] ^= LEFT_C
        this.cells[current.x][current.y - 1] ^= RIGTH_C
        index.y -= 1
        break
    }
    return index
  }
}