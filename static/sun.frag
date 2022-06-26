
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
const int AMOUNT=9;

void main(){
  vec2 coord=6.*gl_FragCoord.xy/u_resolution;
  
  // for(int n=1;n<8;n++){
    //   float i=float(n);
    //   coord+=vec2(.7/i*sin(i*coord.y+u_time+.3*i)+.8,.4/sin(coord.x+u_time+.3)+1.6);
  // }
  
  for(int n=1;n<8;n++){
    float i=float(n);
    coord+=vec2(.7/i*sin(i*coord.y+u_time+.3*i)+.8,.4/i*sin(coord.x+u_time+.3*i)+1.6);
  }
  // coord+=vec2(.7/sin(coord.y+u_time+.3)+.8,.4/sin(coord.x+u_time+.3)+1.6);
  // vec2 coord=20.*(gl_FragCoord.xy-u_resolution/2.)/min(u_resolution.y,u_resolution.x);
  
  float len;
  for(int i=0;i<AMOUNT;i++){
    len=length(vec2(coord.x,coord.y));
    coord.x=coord.x-cos(coord.y+sin(len))+cos(u_time/9.);
    coord.y=coord.y+sin(coord.x+cos(len))+sin(u_time/12.);
  }
  vec3 color=vec3(.5*sin(coord.x)+.5*20.,.5*sin(coord.y)+.5,sin(coord.x+coord.y));
  gl_FragColor=vec4(color,1.);
  
  // gl_FragColor=vec4(4.8+cos(len*9.)*8.5,10.6*cos(len*5.)*.9,0.,1.);
}
