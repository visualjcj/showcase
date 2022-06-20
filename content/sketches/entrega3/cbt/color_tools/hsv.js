let hsvShader;
let img;
let hsvSelect;
let colorTexture;

function preload() {
  hsvShader = readShader(
    "/showcase/sketches/entrega3/cbt/color_tools/hsv.frag",
    { varyings: Tree.texcoords2 }
  );
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage(
    "/showcase/sketches/entrega3/cbt/color_tools/fire_breathing.png"
  );
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(hsvShader);

  colorTexture = createSelect();
  colorTexture.position(130, 10);
  colorTexture.option("none", 0);
  colorTexture.option("red", 1);
  colorTexture.option("green", 2);
  colorTexture.option("blue", 3);
  colorTexture.changed(() => {
    hsvShader.setUniform("colorTexture", colorTexture.value());
  });

  hsvSelect = createSelect();
  hsvSelect.position(10, 10);
  hsvSelect.option("none", 0);
  hsvSelect.option("hsv-external", 1);
  hsvSelect.option("hsv-propia", 2);
  hsvSelect.option("hsl", 3);
  hsvSelect.selected("none");
  hsvSelect.changed(() => {
    hsvShader.setUniform("selectedTool", hsvSelect.value());
  });
  hsvShader.setUniform("texture", img);
}

function draw() {
  background(0);
  quad(
    -width / 2,
    -height / 2,
    width / 2,
    -height / 2,
    width / 2,
    height / 2,
    -width / 2,
    height / 2
  );
}
