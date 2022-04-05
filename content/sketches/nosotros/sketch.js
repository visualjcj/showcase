let back
let sol
let grid
var scl = 10
var cols = 0,
  rows = 0
var terrain = []
var bound = 69
var offsetX = 0,
  offsetY = 0,
  fliying = 0
var colorGradient = []

function setup() {
  let c = createCanvas(500, 500, WEBGL);
  // saveCanvas(c)
  back = loadImage('/assets/gradient.png')
  sol = loadImage('/assets/sun.png')
  grid = loadImage('/assets/grid.jpg')
  let h = 1200
  let w = 900
  cols = floor(w / scl)
  rows = floor(h / scl)
  // stroke(50)
  // noStroke()

  stroke(242, 5, 159)
  colorGradient.push(color(38, 1, 36)) // color: dark
  colorGradient.push(color(64, 1, 60)) // color: menos dark
  colorGradient.push(color(242, 5, 159)) // color: pink
  colorGradient.push(color(242, 231, 75)) // color: yellow
  colorGradient.push(color(242, 197, 114)) // color: orange


}

function draw() {
  background(200)
  // directionalLight(0, 0, 250, dirX, -dirY, 0.25);
  image(back, -250, -250, 500, 500);

  push()
  translate(-width, height / 2 - 210)
  rotateX(PI / 2)

  fliying -= 0.1
  offsetX = fliying
  for (let i = 0; i < cols; i++) {
    offsetY = 0
    for (let j = 0; j < rows; ++j) {
      if (j >= (rows / 2) - 15 && j <= (rows / 2) - 5) {
        terrain[(i * rows) + j] = map(noise(offsetY, offsetX), 0, 1, -bound * 0.1, bound * 0.1)
      } else {
        terrain[(i * rows) + j] = map(noise(offsetY, offsetX), 0, 1, -bound / 2 + 10, bound)
      }
      offsetY += 0.16
    }
    offsetX += 0.1
  }

  for (let y = 0; y < cols; y++) {
    beginShape(TRIANGLE_STRIP)
    for (let x = 0; x < rows; x++) {
      if (x >= (rows / 2) - 15 && x <= (rows / 2) - 5) {
        fill(colorGradient[floor(map(terrain[y * rows + x], -bound * 0.1, bound * 0.1, 0, 1))])
      } else {
        fill(colorGradient[floor(map(terrain[y * rows + x], -bound / 2 + 10, bound, 0, 4))])
      }
      vertex(x * scl, y * scl, terrain[x + y * rows])
      vertex(x * scl, (y + 1) * scl, terrain[x + (y + 1) * rows])
    }
    endShape()
  }
  pop()

  push()
  // translate(0,0,-400)
  // pointLight(0, 0, 255, mouseX - 200, mouseY - 200, 200);
  noStroke()
  // fill(255,0,255)
  rotateY(PI)
  textureMode(NORMAL)
  texture(sol)
  translate(0, 40, 50)
  sphere(70)
  pop()
}