
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
  
  float mask=smoothstep(.01,-.01,abs(gv.y+gv.x)-width);
  
  color+=mask;
  // if(gv.x>.48||gv.y>.48){
    //   color=vec3(1.,0.,0.);
  // }
  gl_FragColor=vec4(color,1.);
}
