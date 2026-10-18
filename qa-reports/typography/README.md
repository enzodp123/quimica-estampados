# Revisión de ortografía, espaciado y tipografía

## Alcance

Se revisaron la página principal, las 17 fichas de productos y la página 404. Se leyó el contenido de navegación, descripciones, preguntas y respuestas, reseñas, formulario, mensajes y etiquetas de las galerías. También se inspeccionaron visualmente las 11 imágenes de tablas de talles.

La auditoría de navegador cubre 320, 390, 768, 1024, 1440 y 1920 px: **114 combinaciones de página y ancho aprobadas**. Revisa texto menor a 12 px, interlineado demasiado cerrado en texto que ocupa varias líneas, recortes dentro de contenedores, desbordamiento horizontal y opciones demasiado largas para los selectores. Las diapositivas desplazadas fuera de sus carruseles no se contabilizan como recortes accidentales.

## Correcciones aplicadas

| Área | Corrección |
| --- | --- |
| Ortografía y puntuación | «Cómo trabajamos», signos de apertura de exclamación, tildes, mayúsculas, concordancia de «calcos» y puntuación de descripciones. |
| Estilo del español | Voseo coherente: «Contactanos»; preguntas más claras; «correo electrónico» en el formulario. |
| Unidades y medidas | `g`, `m`, `h`, espacio en `100 %` y signo `×` entre dimensiones. Los importes y medidas numéricas se conservaron. |
| Reseñas | Ajustes ortográficos y de puntuación; comillas de cierre corregidas; meses en minúscula. Se conservaron autores, enlaces y sentido del contenido. |
| Letras pequeñas | Se aumentaron textos de 9–11 px en botones, avisos, tarjetas y miniaturas de talles. |
| Servicios en tablet | Dos columnas entre 897 y 1280 px; descripciones de 14 px e interlineado de 1,6. |
| Galería de trabajos | Los filtros pueden pasar a otra fila y tienen más interlineado. |
| Página 404 | Título adaptable, sin recorte a 320 px y con más separación entre líneas. |
| Fichas de productos | Los párrafos separados de las descripciones se muestran como párrafos reales. |
| Formulario | Opciones más breves para que entren en móvil; los valores enviados conservan la descripción completa. Mejor contraste de ejemplos y textarea redimensionable. |
| Pie de página | Altura adaptable y mayor contraste del texto secundario. |

## Validación

- `npm run qa`: comprobación de Astro, compilación de 19 páginas, validación HTML y 26 pruebas aprobadas.
- `npm run test:e2e`: 36 pruebas aprobadas; sin errores de JavaScript registrados.
- `npm run test:typography`: 114 combinaciones aprobadas. Resultados detallados en [audit.json](audit.json).
- Se actualizaron dos referencias antiguas de la prueba de navegador: el enlace textil del pie y la galería que ahora desplaza diapositivas. La comprobación espera que termine el desplazamiento antes de verificar la imagen.

Los scripts de navegador usan Chrome y la instalación de Playwright existente en `.tmp-visual/node_modules`, igual que la suite anterior. Se ejecutan sobre `dist`; es necesario compilar antes.

## Observaciones en las imágenes originales

Las tablas de talles contienen texto rasterizado que CSS y el corrector de texto no modifican. Se detectaron **«pique» sin tilde** en la tabla de chomba y **«1cm» sin espacio** en notas de medidas. Corresponde corregirlos como «piqué» y «1 cm» en los originales gráficos y exportarlos nuevamente. Se conservaron estas imágenes y todos sus números.

Las fotografías de trabajos de clientes se conservaron como evidencia visual de los productos. Esta revisión no certifica textos impresos dentro de esas fotografías, ni accesibilidad completa, zoom al 200 % o funcionamiento en navegadores distintos de Chrome.

## Evidencia visual

- [Hero en escritorio](hero-1440.png)
- [Servicios en tablet](services-1024.png)
- [Filtros en tablet](work-gallery__filters--responsive-1024.png)
- [Formulario en móvil](contact__form-390.png)
- [Preguntas frecuentes en móvil](faq-content-390.png)
- [Página 404 a 320 px](404-320.png)
- [Tablas de talles, grupo 1](size-guides-0.png) y [grupo 2](size-guides-6.png)
