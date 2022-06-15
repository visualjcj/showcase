let shaderu;
let pg;
let horse;

function preload() {
  shaderu = loadShader(
    "./shaders/basic.vert",
    "./shaders/truchet/1_truchet.frag"
  );
  horse = loadModel("./assets/horse.obj", true);
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

// function keyPressed() {
//   let cont = 34;
//   if (key == "c") {
//     shaderu = loadShader(
//       "./shaders/basic.vert",
//       `./shaders/truchet/${cont % 5}_truchet.frag`
//     );
//     cont++;
//   }
// }
