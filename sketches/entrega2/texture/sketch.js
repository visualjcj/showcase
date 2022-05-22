let triRef;
let triTnt;
let vec2 = {};
let bar = [0, 0, 0];
let pix = 0;
let tnt;
let calculateInOtherTriangle = [0, 0];
let info = "test";
let barTnt = [0, 0, 0];
let outBorder;

function setup() {
  img = loadImage('/showcase/sketches/entrega2/texture/assets/tnt.jpg');
  inconsolata = loadFont('/showcase/sketches/entrega2/texture/assets/Inconsolata.ttf');
  createCanvas(400, 400, WEBGL);
  background('white')
  triRef = createTriangle(10, -90, 170, -90, 170, 90)
  triTnt = createTriangle(-94, -88, -10, 88, -182, 88)
  outBorder = false;
  push();
  translate()
  fill('red')
  textFont(inconsolata);
  textSize(15);
  textAlign(CENTER, CENTER);
  pop();
}

function draw() {


  push()
  texture(img)
  textureMode(NORMAL)
  tnt = triangle(triTnt[0][0], triTnt[0][1], triTnt[1][0], triTnt[1][1], triTnt[2][0], triTnt[2][1])
  pop()

  push()
  noStroke()
  checkBarycentricInTri() ? fill(color('green')) : fill(color('red'))
  circle(-185, -185, 20);
  pop()
  push()
  noStroke()
  fill(red(pix), green(pix), blue(pix), 255)
  circle(-160, -185, 20);
  pop()

  push()
  translate(-180, 180)
  outBorder ? fill(color('green')) : fill(color('red'))
  plane(20, 20);
  pop()

  barTnt = barycentric([(mouseX - 200), (mouseY - 200)], triTnt)
    //get pixel color from triangle tnt
  pix = tnt.get(mouseX, mouseY);
  //paint pixel with baricentryc
  calculateInOtherTriangle = cartesian(barTnt, triRef)
  if (outBorder) {
    drawPoint(calculateInOtherTriangle, pix)
  } else {
    if (checkBarycentricInTri()) {
      drawPoint(calculateInOtherTriangle, pix)
    }
  }
}

function checkBarycentricInTri() {
  return barTnt[0] > 0 && barTnt[1] > 0 && barTnt[2] > 0
}

function mouseClicked() {
  noStroke()
  fill(255, 255, 255)
  translate(-120, -185)
  plane(500, 90)
  const x = barTnt[0].toFixed(3)
  const y = barTnt[1].toFixed(3)
  const z = barTnt[2].toFixed(3)
  info = `coorBar = [${x},${y},${z}]`
  console.log(info)

}

function drawPoint(cartesian, color) {
  noStroke();
  fill(red(color), green(color), blue(color));
  ellipse(cartesian[0], cartesian[1], 5)
}


function createTriangle(x0, y0, x1, y1, x2, y2) {
  const v0 = [x0, y0];
  const v1 = [x1, y1];
  const v2 = [x2, y2];
  return [v0, v1, v2]
}

function barycentric(p, tri) {
  var v0 = vec2.sub(tri[1], tri[0]);
  var v1 = vec2.sub(tri[2], tri[0]);
  var v2 = vec2.sub(p, tri[0]);
  var d00 = vec2.dot(v0, v0);
  var d01 = vec2.dot(v0, v1);
  var d11 = vec2.dot(v1, v1);
  var d20 = vec2.dot(v2, v0);
  var d21 = vec2.dot(v2, v1);
  var denom = d00 * d11 - d01 * d01;
  var v = (d11 * d20 - d01 * d21) / denom;
  var w = (d00 * d21 - d01 * d20) / denom;
  var u = 1 - v - w;
  return [u, v, w];
}

vec2.sub = function(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
};

vec2.dot = function(a, b) {
  return a[0] * b[0] + a[1] * b[1];
};

function cartesian(bar, tri) {
  return dotDimensional(bar, tri)
}

function dotDimensional(a, b) {
  const x = (a[0] * b[0][0] + a[1] * b[1][0] + a[2] * b[2][0])
  const y = (a[0] * b[0][1] + a[1] * b[1][1] + a[2] * b[2][1])
  let result = [x, y];
  return result;
}

function keyPressed() {
  if (key === 'c') {
    outBorder = !outBorder;
  }
}