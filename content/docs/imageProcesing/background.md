# Background

## Procesamiento de imagen

El análisis y procesamiento de imágenes se realiza a través de computadoras, debido a la complejidad y el número de cálculos necesarios para realizarlo. Es por esto que, si bien la formulación matemática necesaria para su realización data de varios siglos atrás, la posibilidad real de utilizarla de forma cotidiana ha sido posible recién en las últimas décadas, gracias al avance en las tecnologías del hardware.

Existen varias técnicas de procesos de filtrado, que son un conjunto de técnicas englobadas dentro del preprocesamiento de imágenes cuyo objetivo fundamental es obtener, a partir de una imagen origen, otra final cuyo resultado sea más adecuado para una aplicación específica mejorando ciertas características de la misma que posibilite efectuar operaciones del procesado sobre ella.

Los principales objetivos que se persiguen con la aplicación de filtros son:

- Suavizar la imagen: reducir la cantidad de variaciones de intensidad entre píxeles vecinos.
- Eliminar ruido: eliminar aquellos píxeles cuyo nivel de intensidad es muy diferente al de sus vecinos y cuyo origen puede estar tanto en el proceso de adquisición de la imagen como en el de transmisión.
- Realzar bordes: destacar los bordes que se localizan en una imagen.
- Detectar bordes: detectar los píxeles donde se produce un cambio brusco en la función intensidad.

![imagen](https://sites.google.com/site/cg05procesamientodeimagenes/_/rsrc/1481640824041/home/1.png?height=202&width=400)

Por tanto, se consideran los filtros como operaciones que se aplican a los píxeles de una imagen digital para optimizarla, enfatizar cierta información o conseguir un efecto especial en ella.

El proceso de filtrado puede llevarse a cabo sobre los dominios de frecuencia y/o espacio.


### Filtros de frecuencia
Cuando hablamos de filtros en el dominio de la frecuencia hablamos de procesar una imagen aplicandole la transformada de fourier y desde aquí comenzar a aplicarle ciertos filtros posibles, como lo son el pasa bajas, pasa altas y el pasa bandas.

![filtros](https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Tipos_de_filtros.jpg/250px-Tipos_de_filtros.jpg)

Aunque en este caso lo que vamos a estar usando son los filtros en el dominio del espacio.

### Filtros de dominio

Esta clasificación de filtros opera directamente sobre los píxeles. Se clasifican en filtros lineales (basados en kernels o máscaras de convolución) y filtros no lineales.

Un kernel o máscara de convolución puede entenderse como una matriz de coeficientes que al ser aplicada en un pixel objetivo (considérese el pixel como un punto (x,y) del plano) obteniendo una transformación en el pixel objetivo como en sus vecinos (entendiendo la transformación como la imagen G(x,y) en todos ellos). Si bien la forma y tamaño del kernel es variable, usualmente se trabaja con máscaras de convolución cuadradas

![kernel](https://i.imgur.com/HpYThyB.png)

### Referencias
- [Procesamiento digital de imágenes](https://es.wikipedia.org/wiki/Procesamiento_digital_de_im%C3%A1genes)
- 
- [Procesamiento digital de imágenes 2](http://lcr.uns.edu.ar/fvc/NotasDeAplicacion/FVC-QuerejetaSimbeniPedro.pdf)

