# Background

## OpenGL

OpenGL es una API que brinda un gran conjunto de funciones que podemos usar para manipular los gráficos en 2D y 3D y es mantenida por el grupo Khronos. Sus principales objetivos son el intentar reducir la complejidad de la interfaz con las diferentes tarjetas gráficas, teniendo una sola API que sea uniforme. De igual manera quieren brindar el total de sus funciones a diversas plataformas de hardware, ocultando sus diferencias.

### GLSL

OpenGL Shading Language es un lenguaje de programación de alto nivel con sintaxis basada en el lenguaje de programación C. Fue creada por OpenGL ARB y nos permite a los desarrolladores tener control dentro del pipeline de renderizado sin tener que especificar nada para ningún hardware. Cabe resaltar que no es el único lenguaje para programar shaders, también existe el HLSL de DirectX.

### Shaders

Los shaders son código que hacemos ejecutar directamente en la GPU ya que podemos realizar computación visual con muy poco impacto al rendimiento gracias a que en los últimos años hemos visto la gran eficiencia en cuanto a cálculo de punto flotante que pueden realizar, esto incluyendo vectores, matrices, etc. Cabe mencionar que si no se posee una GPU, OpenGL intentará emular esto desde software.

Antes de explicar los tipos de shaders que usaremos, primero veamos el pipeline de OpenGL:

![pipeline](https://i.imgur.com/ftoIc8i.png)

Primero tenemos los Vertex Shaders, este tipo de shader nos permite ejecutar código por cada vértice que forme parte del elemento que queremos renderizar. Podemos por ejemplo hacer un efecto de distorsión al aplicarle una función trigonométrica o sencillamente transformar su posición en el mundo.

También tenemos los Fragment Shaders, estos nos permiten ejecutar código por cada pixel que tengamos en pantalla, la salida de este archivo será el color del pixel resultante incluyendo el 4 canal alpha. Aquí es donde más estaremos trabajando, puesto que vamos a estar realizando texturizado, texturizado procedural y procesamiento de imagenes.

### Referencias

- [OpenGL: qué es y para qué sirve](https://www.profesionalreview.com/2019/11/15/opengl)
- [Introducción a Shaders GLSL](https://gzalo.com/articles/shaders/)

