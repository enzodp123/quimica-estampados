# Incorporación de imágenes

Se incorporaron las tres imágenes entregadas, convertidas a WebP:

| Imagen | Ubicación | Resolución | Peso |
| --- | --- | --- | --- |
| Gorras Promo 25 | Foto adicional en la ficha de gorra trucker | 1600 × 1200 | 158 KiB |
| Remera Eva / egresaditos | Reemplazo en el hero, imagen principal de la ficha y tarjetas de producto | 928 × 1130 | 75 KiB |
| Folletos Aprender jugando | Foto adicional en la ficha de folletos | 1200 × 1600 | 191 KiB |

La remera mantiene el canal alfa del PNG original. El contorno se aplica con el mismo filtro CSS usado por las demás prendas, en el hero, las tarjetas y la ficha. Las fotos anteriores de las galerías se conservaron.

Se ajustó la calidad WebP de las imágenes principales de las galerías de 85 a 82 para mantener el sitio dentro del presupuesto existente de 35 MiB. No se modificaron las imágenes originales entregadas.

## Comprobaciones

- Ocho verificaciones de navegador aprobadas: hero y tres fichas, a 390 y 1440 px.
- Verificación de carga de imágenes, formato WebP, navegación hasta las fotos nuevas y contorno de la remera.
- Compilación, comprobación de Astro, validación de HTML y 26 pruebas del proyecto aprobadas.
- [Resultados](report.json).

## Capturas

- [Hero de escritorio](hero-1440.png) y [móvil](hero-390.png).
- [Remera en su ficha](remera-egresadito-390.png).
- [Gorras agregadas](gorra-trucker-1440.png).
- [Folletos agregados](folletos-1440.png).
