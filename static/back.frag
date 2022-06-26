
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
  // vec2 coord=(gl_FragCoord.xy*2.-u_resolution)/min(u_resolution.x,u_resolution.y);
  // coord.x+=sin(u_time)+cos(u_time*2.1);
  // coord.y+=cos(u_time)+sin(u_time*1.6);
  // float color=0.;
  
  // color+=.1*(abs(sin(u_time))+.1)/length(coord);
  
  // gl_FragColor=vec4(vec3(color,color,color) ,1.);
  
  vec2 coord=(gl_FragCoord.xy/u_resolution)*.2;
  vec3 color=vec3(0.,0.,atan(u_time*.1));
  vec2 translate=vec2(-.5,-.5);
  coord+=translate;
  for(int i=0;i<10;i++){
    float radius=.3;
    float rad=radians(360./20.)*float(i)*u_time;
    // float rad=radians(360./40.)*float(i);
    color+=.003/length(coord+vec2(radius*cos(rad),radius*sin(rad)));
  }
  gl_FragColor=vec4(color,1.);
}
