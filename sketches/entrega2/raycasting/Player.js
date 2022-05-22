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