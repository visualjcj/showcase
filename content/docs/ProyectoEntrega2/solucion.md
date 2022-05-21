# Solucion

## Pincel texturizador con coordenadas baricentricas

{{< p5-iframe sketch="/showcase/sketches/entrega2/sketch.js" width="425" height="425">}}

El objetivo era:

* crear un triángulo de referencia (TNT 🧨) y texturizarlo normalmente (default de P5).
* con la posición del mouse (Coordenadas del mouse - 200 siendo la mitad del canvas), calcular las coordenadas baricéntricas del triángulo de referencia.
* con esas coordenadas baricéntricas, miramos las coordenadas baricéntricas en un segundo triángulo (lienzo) y se calculan las respectivas coordenadas cartesianas en relación al triangulo lienzo (proceso inverso del cálculo baricéntrico).

~~~
function dotDimensional(a, b) {
  // a -> coordenadas baricentricas
  // b -> vertices del triangulo
  const x = (a[0] * b[0][0] + a[1] * b[1][0] + a[2] * b[2][0])
  const y = (a[0] * b[0][1] + a[1] * b[1][1] + a[2] * b[2][1])
  let result = [x, y];
  return result;
}
~~~

* obtener el valor del color del pixel del triángulo de referencia (TNT 🧨).
* con las coordenadas cartesianas y el color del pixel se crea un círculo pequeño simulando un píxel.
* ver el resultado.

El problema...

para obtener el color del pixel se necesita pasar una imagen, sin embargo este ejercicio requiere es obtener el píxel del triángulo de referencia (TNT 🧨) pero esto no es una imagen sino un objeto de tipo triángulo con una textura, esa es la razón del porque no está texturizando bien, en realidad, es como si estuviera tomando los píxeles de la imagen original (en forma de cuadrado).
