
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform int option;
uniform float vel;

float Hash21(vec2 p){
  p=fract(p*vec2(264.34,435.345));
  p+=dot(p,p+34.23);
  return fract(p.x*p.y);
}

void main(){
  if(option==4){
    vec2 coord=gl_FragCoord.xy/u_resolution;
    vec3 color=vec3(0.);
    coord+=u_time*vel;
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
  }else if(option==1){
    vec2 coord=gl_FragCoord.xy/u_resolution;
    vec3 color=vec3(0.);
    coord+=u_time*vel;
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
    gl_FragColor=vec4(color,1.);
  }else if(option==2){
    vec2 coord=gl_FragCoord.xy/u_resolution;
    vec3 color=vec3(0.);
    coord+=u_time*vel;
    coord*=10.;
    vec2 gv=fract(coord)-.5;
    vec2 id=floor(coord);
    float n=Hash21(id);
    float width=.2;
    if(n<.5){
      gv.x*=-1.;
    }
    float d=abs(abs(gv.x+gv.y)-.5);
    float mask=smoothstep(.01,-.01,d-width);
    
    color+=mask;
    // if(gv.x>.48||gv.y>.48){
      //   color=vec3(1.,0.,0.);
    // }
    gl_FragColor=vec4(color,1.);
  }else if(option==3){
    vec2 coord=gl_FragCoord.xy/u_resolution;
    vec3 color=vec3(0.);
    coord+=u_time*vel;
    coord*=10.;
    vec2 gv=fract(coord)-.5;
    vec2 id=floor(coord);
    float n=Hash21(id);
    float width=.1;
    if(n<.5){
      gv.x*=-1.;
    }
    float d=abs(abs(gv.x+gv.y)-.5);
    
    d=length(gv-sign(gv.x+gv.y)*.5)-.5;
    float mask=smoothstep(.01,-.01,abs(d)-width);
    
    color+=mask;
    // if(gv.x>.48||gv.y>.48){
      //   color=vec3(1.,0.,0.);
    // }
    gl_FragColor=vec4(color,1.);
  }else if(option==0){
    vec2 coord=gl_FragCoord.xy/u_resolution;
    vec3 color=vec3(0.);
    coord+=u_time*vel;
    coord*=10.;
    vec2 gv=fract(coord)-.5;
    vec2 id=floor(coord);
    float n=Hash21(id);
    float width=.1;
    if(n<.5){
      gv.x*=-1.;
    }
    float d=abs(abs(gv.x+gv.y)-.5);
    vec2 cuv=gv-sign(gv.x+gv.y)*.5;
    d=length(cuv)-.5;
    float mask=smoothstep(.01,-.01,abs(d)-width);
    float angle=atan(cuv.x,cuv.y);
    float checker=mod(id.x+id.y,2.)*2.-1.;
    float flow=sin(checker*u_time+angle*10.);
    color+=flow*mask;
    // if(gv.x>.48||gv.y>.48){
      //   color=vec3(1.,0.,0.);
    // }
    gl_FragColor=vec4(color,1.);
  }
}

// code : https://www.youtube.com/watch?v=2R7h76GoIJM