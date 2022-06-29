precision mediump float;

varying vec2 texcoords2;
varying vec4 color4;
uniform float opacity;

uniform int channelColor;

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
    vec3 color = vec3(0.0, 0.0, 1.0);
    if(channelColor == 0) {
        color = vec3(0.0, texcoords2.xy);
    } else if(channelColor == 1) {
        color = vec3(texcoords2.x, 0.0, texcoords2.y);
    } else if(channelColor == 2) {
        float first = map(texcoords2.x, 0.0, 1.0, 0.0, 0.5);
        float second = map(texcoords2.y, 0.0, 1.0, 0.0, 0.5);
        color = vec3(texcoords2.xy, first + second);
    } else {
        color = vec3(texcoords2.xy, 0.0);
    }

    gl_FragColor = vec4(color, opacity);
}