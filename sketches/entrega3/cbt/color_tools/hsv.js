let hsvShader;
let img;
let img2;
let hsvSelect;
let colorTexture;
let imageSelect;
let mousePos;

function preload() {
  hsvShader = readShader(
    "/showcase/sketches/entrega3/cbt/color_tools/hsv.frag", { varyings: Tree.texcoords2 }
  );
  // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
  img = loadImage(
    "/showcase/sketches/entrega3/cbt/color_tools/fire_breathing.png"
  );
  img2 = loadImage(
    "/showcase/sketches/entrega3/cbt/color_tools/imagen3.jpeg"
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
  colorTexture.option("mouse", 4);
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

  imageSelect = createSelect();
  imageSelect.position(210, 10);
  imageSelect.option("imagen 1", 0);
  imageSelect.option("imagen 2", 1);
  imageSelect.changed(() => {
    if (imageSelect.value() == 0) {
      hsvShader.setUniform("texture", img);
    } else {
      hsvShader.setUniform("texture", img2);
    }
  });
}

function draw() {
  hsvShader.setUniform("mousePos", [map(mouseX, 0, width, 0.0, 1.0), map(mouseY, 0, width, 0.0, 1.0)]);
  background(0);
  quad(-width / 2, -height / 2,
    width / 2, -height / 2,
    width / 2,
    height / 2, -width / 2,
    height / 2
  );
}