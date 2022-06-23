let shaderu;
let pg;
let horse;

function preload() {
  shaderu = loadShader("/showcase/basic.vert", "/showcase/all_truchet.frag");
  horse = loadModel("/showcase/horse.obj", true);
}

function setup() {
  createCanvas(580, 580, WEBGL);
  textuSha = createGraphics(580, 580, WEBGL);

  //configuracion de la textura
  textuSha.textureMode(NORMAL);
  textuSha.shader(shaderu);
  textureMode(NORMAL);
  noStroke();

  //pasamos las uniform de u_resolution
  shaderu.setUniform("u_resolution", [
    width * pixelDensity(),
    height * pixelDensity(),
  ]);

  //opciones
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

  //slider de velocidad
  vel = createSlider(0, 1, 0.05, 0.05);
  vel.position(10, 25);
  vel.style("width", "280px");
}

function draw() {
  background(199, 255, 237);

  //cambiamos las uniforsm
  shaderu.setUniform("u_mouse", [mouseX, mouseY]);
  shaderu.setUniform("u_time", frameCount / 10);
  shaderu.setUniform("vel", vel.value());

  //creamos la textura, en este caso lo usamos con rect (se podria
  //usar cualquier otra forma) y se aplica al modelo del caballo
  textuSha.rect(0, 0, width, height);
  texture(textuSha);
  orbitControl();
  rotateX(20);
  rotateZ(150);
  model(horse);
}
