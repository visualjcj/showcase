
# Solucion

lo primero que se implementa es el fragment shader, para esto la idea es dividir con frag el shader y crear los patrones, para este caso no se construllo algun patron con los tiles en especifico sino que se empleo una funcion que genera aleatoreos para rotar las baldosas.

{{< details title="Truchet Tiles fragment shader" open=true >}}
```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform int option;
uniform float vel;

// funcion para rotar las baldosas
float Hash21(vec2 p){
  p=fract(p*vec2(264.34,435.345));
  p+=dot(p,p+34.23);
  return fract(p.x*p.y);
}

void main(){
  
  vec2 coord=gl_FragCoord.xy/u_resolution;
  vec3 color=vec3(0.);
  //para mover el shader
  coord+=u_time*vel;
  coord*=10.;

  //se divide el shader
  vec2 gv=fract(coord)-.5;
  vec2 id=floor(coord);
  float n=Hash21(id);
  float width=.2;
  //se efectua la rotacion
  if(n<.5){
    gv.x*=-1.;
  }
  //patron de dos lineas diagonales
  float d=abs(abs(gv.x+gv.y)-.5);
  float mask=smoothstep(.01,-.01,d-width);
  
  color+=mask;
  gl_FragColor=vec4(color,1.);
}
```
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/entrega3Johan/sketch2.js" width="605" height="605" style="overflow:hidden">}}
{{< p5-iframe sketch="/showcase/sketches/entrega3Johan/sketch.js" width="605" height="605" style="overflow:hidden">}}

aqui lo unico que nos faltaria es emplearlo como textura, para ello usamos el createGraphics() y usamos un modelo de caballo para mostrar los patrones (ya que los truchet son a blanco y negro se queria mostrar como se verian estos patrones como si fueran zebras),

{{< details title="sketch.js" open=true >}}
```js
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

```
{{< /details >}}

la idea de los truchet y la implementacion con los shaders se sacaron del tutorial de youtube [Shader Coding: Truchet Tiling Explained!](https://www.youtube.com/watch?v=2R7h76GoIJM)