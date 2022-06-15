
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float Hash21(vec2 p){
  p=fract(p*vec2(264.34,435.345));
  p+=dot(p,p+34.23);
  return fract(p.x*p.y);
}

void main(){
  vec2 coord=gl_FragCoord.xy/u_resolution;
  vec3 color=vec3(0.);
  coord+=u_time*.05;
  coord*=10.;
  vec2 gv=fract(coord)-.5;
  vec2 id=floor(coord);
  float n=Hash21(id);
  float width=.2;
  if(n<.5){
    gv.x*=-1.;
  }
  float d=abs(abs(gv.x+gv.y)-.5);
  vec2 cuv=gv-sign(gv.x+gv.y)*.5;
  d=length(cuv);
  float mask=smoothstep(.01,-.01,abs(d-.5)-width);
  float angle=atan(cuv.x,cuv.y);
  float checker=mod(id.x+id.y,2.)*2.-1.;
  float x=fract(angle/1.57);
  float y=(d-(.5-width))/(2.*width);
  y=abs(y-.5)*2.;
  vec2 tuv=vec2(x,y);
  
  color.rb+=tuv*mask;
  gl_FragColor=vec4(color,1.);
}

// code : https://www.youtube.com/watch?v=2R7h76GoIJM