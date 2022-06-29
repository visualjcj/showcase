
# Solución

## Ejercicio 1

En este ejercicio es el básico para entrar a trabajar con shaders, tenemos una escena la cual a una circunferencia estamos coloreando respecto a sus coordenadas, en este caso podremos cambiar la forma en la que la texturizamos con diferentes canales, verde-rojo, verde-azul o rojo-azul.

Adicionalmente el problema venia con una quad como figura a texturizar, hemos modificado esta figura por una circunferencia.

{{< details title="Coloring a figure" open=true >}}
```glsl
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
```
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/entrega3/texturing/screen/uv_screen.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="425" height="425" >}}


## Ejercicio 2

Este ejercicio fue bastante interesante, aquí pudimos observar la aplicación dee diferentes herramientas de coloreo, en este caso trabajamos con el RGB, HSV y HSL. Además, también podemos realizar un coloreo general respecto a un color que nosotros elijamos, hemos dejado a disposición los tres principales, RGB, y también un coloreo respecto a la posición del ratón mapeando los valores a RGB.

### ¿Qué es un modelo de color?

Un modelo de color establece un conjunto de colores primarios a partir de los que, mediante mezclas, se pueden obtener otros colores hasta cubrir todo el espectro visible, además del propio blanco, negro y grises, y aún más. Por ejemplo, hay colores, como el marrón o el magenta, que no están presentes en el espectro visible, y es nuestro cerebro el que lo 
interpreta a partir de la combinación de ondas con diferentes longitudes.

#### Modelo RGB
Volviendo a los modelos de color más habituales en fotografía, el modelo RGB define como colores primarios el rojo, el verde y el azul. La combinación de los tres genera blanco. La ausencia de los tres genera negro. Las diferentes mezclas entre ellos representarían toda la gama de color. De nuevo, los grises se representarían con diferentes intensidades de cada color, pero siempre los tres con el mismo valor.

El modelo RBG se utiliza cuando se representa color mediante haces de luz (pantallas o monitores). Un pixel en un monitor se representaría mediante tres subpíxeles o células: una roja, una verde y una azul, correspondiendo cada una a un LED o diodo emisor de luz del respectivo color.

Si los tres diodos están apagados, obtendríamos el negro. Si están encendidos a diferentes intensidades, obtendríamos colores, si están todos encendidos con la misma intensidad y al máximo, tendríamos el blanco, y si la intensidad es menor pero igual en los tres diodos, obtendríamos grises.

![rgb](https://i0.wp.com/www.hisour.com/wp-content/uploads/2018/03/RGB-color-model.jpg?fit=720%2C720&ssl=1])

#### Modelo HSV y HSL

Estos modelos incluyen otros dos parámetros adicionales al matiz o croma para obtener el color, que son la saturación (en ambos) y el valor (en HSV) o la luminosidad o tono (en HSL). De ahí sus siglas: HSL (H – hue o matiz, S – saturation o saturación, L – luminosity o luminosidad/tono), HSV (idem excepto V de value o valor).

La diferencia entre HSV y HSL es que en HSV la saturación va del color puro al blanco, y en HSL la saturación va del color puro al gris medio, y el tono, en HSV va desde el negro al color, y en HSL va desde el negro al blanco. De ahí que HSL sea el que se utiliza más comúnmente en fotografía.

![hsl y hsv](https://i.blogs.es/8b2823/hsl-003/450_1000.webp)

{{< details title="Color tools" open=true >}}
```glsl
precision mediump float;

// uniforms are defined and sent by the sketch
uniform int selectedTool;
uniform int colorTexture;
uniform sampler2D texture;
uniform vec2 mousePos;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

vec3 rgb2hsvMia(vec3 c) {
  vec3 outputColor = vec3(0.0);
  float minimo = min(c.r, c.g);
  minimo = min(minimo, c.b);

  float maximo = max(c.r, c.g);
  maximo = max(maximo, c.b);

  float diferencia = maximo - minimo;

  float multiplo = 0.6;
  float divisor = 3.6;

  if(diferencia == 0.0) {
    outputColor.x = 0.0;
  } else if(maximo == c.r) {
    float temp = (multiplo * ((c.g - c.b) / diferencia) + 3.6);
    float temp2 = (divisor * floor(temp / divisor));
    outputColor.x = temp - temp2;
  } else if(maximo == c.g) {
    float temp = (multiplo * ((c.b - c.r) / diferencia) + 1.2);
    float temp2 = (divisor * floor(temp / divisor));
    outputColor.x = temp - temp2;
  } else if(maximo == c.b) {
    float temp = (multiplo * ((c.r - c.g) / diferencia) + 2.4);
    float temp2 = (divisor * floor(temp / divisor));
    outputColor.x = temp - temp2;
  }

  if(maximo == 0.0) {
    outputColor.y = 0.0;
  } else {
    outputColor.y = (diferencia / maximo);
  }

  outputColor.z = maximo;
  return outputColor;
}

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2hsl(vec3 c) {
  vec3 outputColor = vec3(0.0);

  outputColor.x = c.x;

  outputColor.z = c.z * (1.0 - (c.y / 2.0));

  if(outputColor.z == 0.0 || outputColor.z == 1.0) {
    outputColor.y = 0.0;
  } else {
    outputColor.y = (c.x - outputColor.z) / min(outputColor.z, 1.0 - outputColor.z);
  }
  return outputColor;
}

void main() {
  vec4 texel = texture2D(texture, texcoords2);

  vec4 outputValue;

  if(selectedTool == 0) {
    outputValue = texel;
  } else if(selectedTool == 1) {
    vec3 hsv = rgb2hsv(texel.rgb);
    outputValue = vec4(hsv.rgb, 1.0);
  } else if(selectedTool == 2) {
    vec3 hsv = rgb2hsvMia(texel.rgb);
    outputValue = vec4(hsv.rgb, 1.0);
  } else if(selectedTool == 3) {
    vec3 hsv = rgb2hsv(texel.rgb);
    // vec3 hsv = rgb2hsvMia(texel.rgb);
    vec3 hsl = hsv2hsl(hsv);
    outputValue = vec4(hsl.rgb, 1.0);
  }

  if(colorTexture == 0) {
    outputValue.rgb = outputValue.rgb * 1.0;
  } else if(colorTexture == 1) {
    outputValue.rgb = outputValue.rgb * vec3(1.0, 0.0, 0.0);
  } else if(colorTexture == 2) {
    outputValue.rgb = outputValue.rgb * vec3(0.0, 1.0, 0.0);
  } else if(colorTexture == 3) {
    outputValue.rgb = outputValue.rgb * vec3(0.0, 0.0, 1.0);
  } else if(colorTexture == 4) {
    if(mousePos.x < 0.5) {
      outputValue.rgb = outputValue.rgb * vec3(mousePos.x, mousePos.y, 0.5 - mousePos.x);
    }else {
      outputValue.rgb = outputValue.rgb * vec3(1.0 - mousePos.x, mousePos.y, mousePos.x);
    }
  }

  gl_FragColor = outputValue;
}
```
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/entrega3/cbt/color_tools/hsv.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="725" height="525" >}}


### Referencias

- [modelos de color](https://ahenav.com/2014/04/09/modelos-de-color/#:~:text=La%20diferencia%20entre%20HSV%20y,utiliza%20m%C3%A1s%20com%C3%BAnmente%20en%20fotograf%C3%ADa.)