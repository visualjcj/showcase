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
  back = loadImage('../../../sketches/ejercicios/assets/gradient.png')
  sol = loadImage('../../../sketches/ejercicios/assets/sun.png')
  grid = loadImage('../../../sketches/ejercicios/assets/grid.jpg')
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
  console.log(back)

}

function draw() {
  //background
  background(200)
  image(back, -800, -1000, 2000, 1500);

  //fov
  let fov = PI / 1.5
  let cameraZ = (height / 2) / tan(fov / 2)
  perspective(fov, width / height, cameraZ / 10, cameraZ * 10)

  //terrain
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

  //sun
  push()
  noStroke()
  rotateY(PI)
  textureMode(NORMAL)
  texture(sol)
  translate(0, 40, 70)
  sphere(200)
  pop()
}