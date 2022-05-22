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

        this.canvas.noStroke();
        this.canvas.fill(color);
        this.canvas.rect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
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