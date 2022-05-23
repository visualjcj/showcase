# Solucion

## Pincel texturizador con coordenadas baricentricas

{{< p5-iframe sketch="/showcase/sketches/entrega2/texture/sketch.js" width="425" height="425">}}

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

---

## Renderizado 3D a través de Raycasting

Antes de pasar a las soluciones quiero mencionar sobre cómo los rayos parten desde el usuario hacia los objetos. Existe otra forma de realizar esto y es haciendo uso de la clase vector que tiene p5.js y sus métodos vectoriales, sin embargo en este caso lo que hicimos fue primero dividir nuestro mundo por casillas, todas del mismo tamaño.

![rayCasting4.png](https://i.imgur.com/ipjjqow.png)

Como podemos ver cuando lanzamos el rayo hacia un objeto, podemos ir analizando las componentes de nuestro vector, y nos damos cuenta que en cada corte que realiza horizontalmente nuestro vector siempre llega con la misma dirección, por lo tanto no es muy difícil hallar el corte de la primera casilla y propagar la misma dirección hasta que encuentre un objeto. Esto sucede de la misma forma para los cortes verticales de las casillas.

Ahora si, entonces pasemos a ver primero la representación 2D de nuestro mundo y los trazados de rayos.

{{< p5-iframe sketch="/showcase/sketches/entrega2/raycasting/v1/sketch.js" width="505" height="505">}}

Como podemos notar nuestro personaje entonces se encuentra en un mundo 2D del cual salen rayos hacia las paredes, cuando choca con una se detiene el rayo.

---

Ahora ya teniendo un lienzo en 2D del cual nuestro jugador puede observar, vamos a renderizar estas paredes en 3D gracias al raycasting.

{{< p5-iframe sketch="/showcase/sketches/entrega2/raycasting/v2/sketch.js" width="505" height="505">}}

Gracias a la explicación anterior entonces podemos obtener la altura de cada pared, como mencioné nuestro plano de vista tiene un ancho de 500 px (el tamaño de nuestro canvas) y lo que estamos calculando entonces es cuando el rayo choca con un objeto, obtenemos su altura virtual y la representamos en la pared como una linea, así que en este ejemplo cada "pared" es un conjunto de lineas de pixeles.

---

Finalmente gracias a funcionalidades de p5.js con las imagenes hemos importado texturas. Para aplicarlas es importante recordar que no estamos viendo paredes, estamos viendo columnas de pixeles, así que: ¿cómo colocamos textura? Para esto vamos a realizar clipping de las texturas importadas, y dependiendo de la columna en la que se encuentre tomaremos una columna de la textura y se la aplicaremos a la nuestra.

{{< p5-iframe sketch="/showcase/sketches/entrega2/raycasting/sketch.js" width="505" height="580">}}