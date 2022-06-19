precision mediump float;

varying vec2 texcoords2;
varying vec4 color4;
// uniform is sent by the sketch
uniform float opacity;

uniform int channelColor;

void main() {
    // gl_FragColor = vec4(texcoords2.xy, 0.0, opacity);
    vec3 color = vec3(0.0, 0.0, 1.0);
    if(channelColor == 0) {
        color = vec3(0.0, texcoords2.xy);
    } else if(channelColor == 1) {
        color = vec3(texcoords2.x, 0.0, texcoords2.y);
    } else {
        color = vec3(texcoords2.xy, 0.0);
    }

    gl_FragColor = vec4(color, opacity);
    // gl_FragColor = vec4(texcoords2.x, texcoords2.y, texcoords2.y - texcoords2.x, opacity);
}