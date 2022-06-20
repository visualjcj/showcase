let shaderu;
let pg;
let horse;

function preload() {
  shaderu = loadShader("/showcase/basic.vert", "/showcase/all_truchet.frag");
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

  option = createSelect();
  option.position(10, 10);
  option.option("option 0", 0);
  option.option("option 1", 1);
  option.option("option 2", 2);
  option.option("option 3", 3);
  option.option("option 4", 4);
  option.selected("none");
  option.changed(() => {
    shaderu.setUniform("option", option.value());
  });

  vel = createSlider(0, 1, 0.05, 0.05);
  vel.position(10, 25);
  vel.style("width", "280px");
}

function draw() {
  background(199, 255, 237);
  shaderu.setUniform("u_mouse", [mouseX, mouseY]);
  shaderu.setUniform("u_time", frameCount / 10);
  shaderu.setUniform("vel", vel.value());
  textuSha.rect(0, 0, width, height);
  texture(textuSha);

  noStroke();
  quad(80, 80, width, 80, width, height, 80, height);

  orbitControl();
  rotateX(20);
  rotateZ(150);
  model(horse);
}
