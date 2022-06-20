let uvShader;

function preload() {
  // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/showcase/sketches/entrega3/texturing/uv.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(300, 300, WEBGL);
  noStroke();
  // see: https://p5js.org/reference/#/p5/shader
  shader(uvShader);
  // https://p5js.org/reference/#/p5/textureMode
  // best and simplest is to just always used NORMAL
  textureMode(NORMAL);
}

function draw() {
  background(0);
  // clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  // https://p5js.org/reference/#/p5/quad
  // It's worth noting (not mentioned in the api docs) that the quad
  // command also adds the texture coordinates to each of its vertices.
  // quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // triangle(-1, -1, 1, -1, 0.5, 0.5);
  // triangle(30, 75, 58, 20, 86, 75);
  // ellipse(10);
  // rect(0, 0, 0.5);

  rect(0, 0, width, height);
  // rect(-1, -1, width, height);

  // beginShape()
  // vertex(-0.75, -0.75);
  // vertex(0, 0.75);
  // vertex(0.75, -0.75);
  // endShape()

  // beginShape()
  // vertex(-0.75, -0.75);
  // vertex(-0.75, 0.75);
  // vertex(0.75, 0.75);
  // vertex(0.75, -0.75);
  // endShape()

}