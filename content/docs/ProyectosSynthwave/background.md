# Background
## Generacion de una terreno-ciudad para video Synthwave-Vaporwave

### Synthwave

los videos Synthwave son utilizados para acompañar canciones de generos como: Synthwave, OutRun, RetroWave y FutureSynth, estos generos son un subgenero de la musica electronica influenciada por Tracks de peliculas de los 80s, se popularizo en 2010, es caracterizado por tener una estetica nostalgica de la cultura ochentera (autos 🚗, videojuegos 🎮, cine 📽️, moda 👕, etc), sus videos son acompañados de paisajes digitales, autos futuristas, amaneceres y su paleta de color es variada pero neon.  

#### ejemplos Synthwave:

<div>
  <p style = 'text-align:center;'>
  <img src="https://c.tenor.com/GiO4XNKti44AAAAd/retrowave-synthwave.gif" alt="JuveYell" width="400px">
  </p>
</div>


<div>
  <p style = 'text-align:center;'>
  <img src="https://c.tenor.com/DgPjM9EO_PwAAAAC/synthwave-sunset.gif" alt="JuveYell" width="400px">
  </p>
</div>

<div>
  <p style = 'text-align:center;'>
  <img src="https://c.tenor.com/Y2bpqJWq1rwAAAAC/synth_wave.gif" alt="JuveYell" width="400px">
  </p>
</div>

### Vaporwave

Los videos de Vaporwave es algo similar al Synthaave originado en 2010, este genero se lleva con artes visuales, utilizando elementos como arte clasico 🖼️, videojuegos 🎮, computadoras antiguas 🖱️, estatuas de marmol 🗿 y un uso del color entre rosado y azul pastel (Aesthetics) 🌴

#### ejemplos Vaporwave:

<div>
<p style = 'text-align:center;'>
  <img src="https://media2.giphy.com/media/xT9IgwvIzQOUIeVxAI/giphy.gif" alt="JuveYell" width="400px">
  </p>
</div>

<div>
  <p style = 'text-align:center;'>
  <img src="https://c.tenor.com/fAzVnErTVmgAAAAC/vaporwave.gif"   alt="JuveYell" width="400px">
  </p>
</div>

<div>
  <p style = 'text-align:center;'>
  <img src="https://i.gifer.com/origin/d5/d52fc87c69c0c152c07e4ff133f8dc3a.gif" alt="JuveYell" width="400px">
  </p>
</div>

<div>
  <p style = 'text-align:center;'>
  <img src="https://media0.giphy.com/media/j3mdQpQ9SKxFOWs9gy/200w.gif?cid=82a1493b35myy59nyn2pj5ynnn670nwvcdi1uu9m6t38tkoi&rid=200w.gif&ct=g" alt="JuveYell" width="400px">
  </p>
</div>

## Fov

Cuando empezamos, ubicamos los elementos en la pantalla, sin embargo, el estilo caracteristico de los videos obliga a modificar la perspectiva de la camara, como primera opcion pensamos en crear una camara y cambiar el FOV (fiel of view) o en español campo de vision, para modificar asi el angulo de vision o el rango que los ojos pueden ver, esto esta asociado con la posicion del punto de vision, el problema que surgio es que ubicamos los elementos en el canvas, despues aplicamos el FOV y todo se desconfiguro, el background que en un principio tenia un tamaño similar al canvas (500px de alto y ancho), ahora estaba muy pequeño por lo que nos toco reescalar el background (2000px de alto y ancho), lo mismo sucedio con el sol y el terreno aunque con este ultimo hubieron otros problemas. Al aumentar el FOV aumentamos el rango de vision por lo que los elemntos que estan en el rango de 'Lectura o zona focal' se ven mas pequeños mientras que los que estan en el rango de la periferia o de discriminacion de colores se ven mucho mas alargados (ver imagen)
<div>
  <p style = 'text-align:center;'>
  <img src="https://www.profesionalreview.com/wp-content/uploads/2021/09/campo-de-vision-2.jpg" alt="JuveYell" width="600px">
  </p>
</div>

En fotografia, al cambiar de lentes se puede ver este efecto:
<div>
  <p style = 'text-align:center;'>
  <img src="https://media.giphy.com/media/l0HlCoPjdkJOCxYQw/giphy.gif" alt="JuveYell" width="600px">
  </p>
</div>

Con esta imagen podemos observar el porque en algunas fotografias engordamos, y es por el cambio en el lente que va desde 24mm hasta 20mm

<div>
  <p style = 'text-align:center;'>
  <img src="https://ramirofernandezhome.files.wordpress.com/2019/05/angulos-de-vision2-1-734x483.jpg" alt="JuveYell" width="600px">
  </p>
</div>

## Teoria del color

Para escoger la paleta de colores pensamos en los colores complementarios los cuales se caracterizan por que los tonos se situan uno en frente de otro, por ejemplo: 

<div>
  <p style = 'text-align:center;'>
  <img src="https://t2.uc.ltmcdn.com/es/posts/1/5/4/cuales_son_los_colores_complementarios_29451_600_square.jpg" alt="JuveYell" width="600px">
  </p>
</div>

Para nuestro caso escogimos una paleta que si o si tuviera tonos fuxias, rosados, por ser colores complemetarios, los otros tonos debian ser amarillos y naranjas. Estos colores en combinacion nos pueden evocar a una epoca nostalgica, muchos de los videos musicales de pop y rock de la decada de los 80s tienen estos colores pues querian expresar una estetica robotica, futurista, los tonos violetas significan poder, ambicion, misterio, los tonos rosados significan: romance, inocencia, juvenil, los tonos amarillos/narajans significan: agilidad, brillante, vibrante, creatividad.

## Terreno

La generación de terreno esta es una generación procedural, es un metodo por el cual un algoritmo genera datos de la manera en la que *tipicamente una persona* los generaria, esto lo hace por medio de procesos de generación aletatorea por computador, En la computacion grafica nerealmente es usada para generar texturas y modelos 3D.

Actualmente estas nereaciones procedurales son ampliamente usadas en la industria de los vidiojuegos en la generacion de mundos, un ejemplo de este es el vidio juego __The Elder Scroll II: Daggerfall__ el cual por medio de su generador procedural, presento un mundo aproximadamente a dos tercios de las islas Britanicas. Pero esta corriente no se queda solo en los videojuegos para los filmes de television o peliculas se ha usado una tecnica llamada *imperfect factory* por la cual se bsan en el pricipio de que en la vida real dos objetos no pueden ser perfectamente similares, aplicando funciones procedurales que agregan pseudoaleatoriedad suavisada, el artista solo tiene que modelar un objeto y pasar por esa funcion este objeto para obtener uno nuevo. La funcion mas comunmente usada es la de _[simplex noise](https://en.wikipedia.org/wiki/Simplex_noise)_ que es conciderablemente mas rapida con otra mas antigua _[perlin Noise](https://en.wikipedia.org/wiki/Perlin_noise)_.
### Perlin noise

Es un texturizador procedural, es un tipo de ruido por gradiente, usado en la computacion grafica para agregar realismo, y gracias a su facil manipulacion es ampliamente usado en el _CGI_ para generar superficies de objetos, fuego, humo e incluso nubes, otra caracteristica que hace tan practico este texturizador procedural es su bajo uso de memoria.

### Mach bands

Son una ilusion optica donde el ojo humano percibe dos estrechas bandas de diferente luminosidad pero como si hubiera un gradiente entre ellas, por ejemplo, dos tonos de grises con diferente iluminacion, percibimos un limite que en realidad no se haya pero que nuestro cerebro nos infiere que podemos ver.

<div>
  <p style = 'text-align:center;'>
  <img src="https://www.researchgate.net/profile/Yungkyung-Park/publication/333465888/figure/fig1/AS:793070027149312@1566094037346/Schematic-sketch-of-Mach-band-illusion.ppm" alt="JuveYell" width="400px">
  </p>
</div>

referencias a las imagenes: 
* [img 1](https://media0.giphy.com/media/j3mdQpQ9SKxFOWs9gy/200w.gif?cid=82a1493b35myy59nyn2pj5ynnn670nwvcdi1uu9m6t38tkoi&rid=200w.gif&ct=g)
* [img 2](https://i.gifer.com/origin/d5/d52fc87c69c0c152c07e4ff133f8dc3a.gif)
* [img 3](https://c.tenor.com/fAzVnErTVmgAAAAC/vaporwave.gif)
* [img 4](https://media2.giphy.com/media/xT9IgwvIzQOUIeVxAI/giphy.gif)
* [img 5](https://c.tenor.com/Y2bpqJWq1rwAAAAC/synth_wave.gif)
* [img 6](https://c.tenor.com/DgPjM9EO_PwAAAAC/synthwave-sunset.gif)
* [img 7](https://c.tenor.com/GiO4XNKti44AAAAd/retrowave-synthwave.gif)
* [img 8](https://www.profesionalreview.com/wp-content/uploads/2021/09/campo-de-vision-2.jpg)
* [img 9](https://ramirofernandezhome.files.wordpress.com/2019/05/angulos-de-vision2-1-734x483.jpg)
* [img 10](https://t2.uc.ltmcdn.com/es/posts/1/5/4/cuales_son_los_colores_complementarios_29451_600_square.jpg)

referencias
* [lente focal](https://difundir.org/2016/08/01/fotografo-muestra-con-un-gif-como-las-camaras-nos-aumentan-5-kilos-fotos/)