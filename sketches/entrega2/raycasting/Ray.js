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