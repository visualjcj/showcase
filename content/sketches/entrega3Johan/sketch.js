let shaderu;
let pg;
let horse;

function preload() {
  shaderu = loadShader("/showcase/basic.vert", "/showcase/3_truchet.frag");
  horse = loadModel("/showcase/horse.obj", true);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textuSha = createGraphics(600, 600, WEBGL);
  textuSha.textureMode(NORMAL);
  textuSha.shader(shaderu);
  textureMode(NORMAL);
  noStroke();
  shaderu.setUniform("u_resolution", [
    width * pixelDensity(),
    height * pixelDensity(),
  ]);
}

function draw() {
  background(199, 255, 237);
  shaderu.setUniform("u_mouse", [mouseX, mouseY]);
  shaderu.setUniform("u_time", frameCount / 10);
  textuSha.rect(0, 0, width, height);
  texture(textuSha);
  orbitControl();
  rotateX(20);
  rotateZ(150);
  model(horse);
}
