let easycam;
let uvShader;
let opacity;
let channelColor = 0;

function preload() {
  // Define geometry in world space (i.e., matrices: Tree.pmvMatrix).
  // The projection and modelview matrices may be emitted separately
  // (i.e., matrices: Tree.pMatrix | Tree.mvMatrix), which actually
  // leads to the same gl_Position result.
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/showcase/sketches/entrega3/texturing/screen/uv_alpha.frag', { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // easycam stuff
  let state = {
    distance: 250, // scalar
    center: [0, 0, 0], // vector
    rotation: [0, 0, 0, 1], // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state; // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  textureMode(NORMAL);
  opacity = createSlider(0, 1, 0.5, 0.01);
  opacity.position(10, 25);
  opacity.style('width', '280px');

}

function draw() {
  background(200);
  // reset shader so that the default shader is used to render the 3D scene
  resetShader();
  // world space scene
  axes();
  grid();
  translate(0, -70);
  rotateY(0.5);
  fill(color(255, 0, 255, 125));
  box(30, 50);
  translate(70, 70);
  fill(color(0, 255, 255, 125));
  sphere(30, 50);
  // use custom shader
  shader(uvShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  uvShader.setUniform('opacity', opacity.value());

  uvShader.setUniform('channelColor', channelColor);
  // screen-space quad (i.e., x ∈ [0..width] and y ∈ [0..height])
  // see: https://github.com/VisualComputing/p5.treegl#heads-up-display
  beginHUD();
  noStroke();
  quad(0, 0, width, 0, width, height, 0, height);
  endHUD();
}

function keyPressed() {
  if (keyCode === 32) {
    if (channelColor == 2) {
      channelColor = 0
    } else {
      channelColor++
    }
    // console.log('hola', channelColor)
  }
}

// function mouseClicked() {
//   if (channelColor == 2) {
//     channelColor = 0
//   } else {
//     channelColor++
//   }
// }

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}