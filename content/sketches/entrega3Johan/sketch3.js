let back;
let sol;
let grid;
var scl = 10;
var cols = 0,
  rows = 0;
var terrain = [];
var bound = 69;
var offsetX = 0,
  offsetY = 0,
  fliying = 0;
var colorGradient = [];
let sunShader;
let backShader;

function preload() {
  sunShader = loadShader("/showcase/basic.vert", "/showcase/sun.frag");
  backShader = loadShader("/showcase/basic.vert", "/showcase/background.frag");
}

function setup() {
  let c = createCanvas(500, 500, WEBGL);
  back = loadImage("./assets/gradient.png");
  sol = loadImage("./assets/sun.png");
  grid = loadImage("./assets/grid.jpg");
  let h = 1200;
  let w = 900;
  cols = floor(w / scl);
  rows = floor(h / scl);

  //sun
  textureSun = createGraphics(3000, 3000, WEBGL);
  textureSun.textureMode(NORMAL);
  textureSun.shader(sunShader);
  textureMode(NORMAL);
  noStroke();
  sunShader.setUniform("u_resolution", [
    width * pixelDensity(),
    height * pixelDensity(),
  ]);

  //background
  textureBack = createGraphics(3000, 3000, WEBGL);
  textureBack.textureMode(NORMAL);
  textureBack.shader(backShader);
  textureMode(NORMAL);
  noStroke();
  backShader.setUniform("u_resolution", [
    width * pixelDensity(),
    height * pixelDensity(),
  ]);

  stroke(242, 5, 159);
  colorGradient.push(color(38, 1, 36)); // color: dark
  colorGradient.push(color(64, 1, 60)); // color: menos dark
  colorGradient.push(color(242, 5, 159)); // color: pink
  colorGradient.push(color(242, 231, 75)); // color: yellow
  colorGradient.push(color(242, 197, 114)); // color: orange
}

function draw() {
  //background
  background(0);
  push();
  backShader.setUniform("u_mouse", [mouseX, mouseY]);
  backShader.setUniform("u_time", frameCount / 20);
  shader(backShader);
  noStroke();
  rotateY(PI);
  textureMode(NORMAL);
  textureBack.box(100);
  texture(textureBack);
  // image(back, -800, -1000, 2000, 1500);
  translate(-750, -900);
  quad(-1500, 1000, -1500, -1000, 1500, -1000, 1500, 1000);
  pop();

  //fov
  let fov = PI / 1.5;
  let cameraZ = height / 2 / tan(fov / 2);
  perspective(fov, width / height, cameraZ / 10, cameraZ * 10);

  //terrain
  push();
  translate(-width, height / 2 - 210);
  rotateX(PI / 2);

  fliying -= 0.1;
  offsetX = fliying;
  for (let i = 0; i < cols; i++) {
    offsetY = 0;
    for (let j = 0; j < rows; ++j) {
      if (j >= rows / 2 - 15 && j <= rows / 2 - 5) {
        terrain[i * rows + j] = map(
          noise(offsetY, offsetX),
          0,
          1,
          -bound * 0.1,
          bound * 0.1
        );
      } else {
        terrain[i * rows + j] = map(
          noise(offsetY, offsetX),
          0,
          1,
          -bound / 2 + 10,
          bound
        );
      }
      offsetY += 0.16;
    }
    offsetX += 0.1;
  }

  for (let y = 0; y < cols - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < rows; x++) {
      if (x >= rows / 2 - 15 && x <= rows / 2 - 5) {
        fill(
          colorGradient[
            floor(map(terrain[y * rows + x], -bound * 0.1, bound * 0.1, 0, 1))
          ]
        );
      } else {
        fill(
          colorGradient[
            floor(map(terrain[y * rows + x], -bound / 2 + 10, bound, 0, 4))
          ]
        );
      }
      vertex(x * scl, y * scl, terrain[x + y * rows]);
      if (x >= rows / 2 - 15 && x <= rows / 2 - 5) {
        fill(
          colorGradient[
            floor(
              map(terrain[x + (y + 1) * rows], -bound * 0.1, bound * 0.1, 0, 2)
            )
          ]
        );
      } else {
        fill(
          colorGradient[
            floor(map(terrain[x + (y + 1) * rows], -bound / 2, bound, 0, 2))
          ]
        );
      }
      vertex(x * scl, (y + 1) * scl, terrain[x + (y + 1) * rows]);
    }
    endShape();
  }
  pop();

  //sun
  push();
  sunShader.setUniform("u_mouse", [mouseX, mouseY]);
  sunShader.setUniform("u_time", frameCount / 2);
  shader(sunShader);
  noStroke();
  rotateY(PI);
  textureMode(NORMAL);
  textureSun.sphere(100);
  texture(textureSun);
  translate(0, 40, 70);
  sphere(200);
  pop();
}
