#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D texture;
uniform vec2 texOffset;
// holds the 3x3 kernel
uniform float mask[9];
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform int option;
uniform bool region;

// we need our interpolated tex coord
varying vec2 texcoords2;

void main() {

  //0 Mask - 1 magnifier
  if(option == 0) {
    vec2 xy = gl_FragCoord.xy - u_mouse.xy;

    float R = 100.;
    float h = 40.;
    float hr = R * sqrt(1. - ((R - h) / R) * ((R - h) / R));
    float r = sqrt(xy.x * xy.x + xy.y * xy.y);

    vec2 new_xy = r < hr ? xy * (R - h) / sqrt(R * R - r * r) : xy;

  // 1. Use offset to move along texture space.
  // In this case to find the texcoords of the texel neighbours.
    vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
    vec2 tc1 = texcoords2 + vec2(0.0, -texOffset.t);
    vec2 tc2 = texcoords2 + vec2(texOffset.s, -texOffset.t);
    vec2 tc3 = texcoords2 + vec2(-texOffset.s, 0.0);
  // origin (current fragment texcoords)
    vec2 tc4 = texcoords2 + vec2(0.0, 0.0);
    vec2 tc5 = texcoords2 + vec2(texOffset.s, 0.0);
    vec2 tc6 = texcoords2 + vec2(-texOffset.s, texOffset.t);
    vec2 tc7 = texcoords2 + vec2(0.0, texOffset.t);
    vec2 tc8 = texcoords2 + vec2(texOffset.s, texOffset.t);

  // 2. Sample texel neighbours within the rgba array
    vec4 rgba[9];
    rgba[0] = texture2D(texture, tc0);
    rgba[1] = texture2D(texture, tc1);
    rgba[2] = texture2D(texture, tc2);
    rgba[3] = texture2D(texture, tc3);
    rgba[4] = texture2D(texture, tc4);
    rgba[5] = texture2D(texture, tc5);
    rgba[6] = texture2D(texture, tc6);
    rgba[7] = texture2D(texture, tc7);
    rgba[8] = texture2D(texture, tc8);

  // 3. Apply convolution kernel
    vec4 convolution;
    for(int i = 0; i < 9; i++) {
      convolution += rgba[i] * mask[i];
    }

    if(region) {
      gl_FragColor = r < hr ? vec4(convolution.rgb, 1.0) : texture2D(texture, texcoords2);
    } else {
      gl_FragColor = vec4(convolution.rgb, 1.0);
    }
  } else if(option == 1) {
    vec2 xy = gl_FragCoord.xy - u_mouse.xy;

    float R = 100.;
    float h = 40.;
    float hr = R * sqrt(1. - ((R - h) / R) * ((R - h) / R));
    float r = sqrt((xy.x * xy.x) + (xy.y * xy.y));

    vec2 new_xy = r < hr ? xy * (R - h) / sqrt(R * R + r * r) : xy;

    gl_FragColor = texture2D(texture, (new_xy.xy + u_mouse.xy) / u_resolution.xy);
  }
}
