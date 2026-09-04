# Química Estampados

Sitio institucional y catálogo estático de Química Estampados, implementado con Astro a partir de 36 referencias de Figma. Incluye la página principal, 17 fichas de producto, una página 404, interacciones del catálogo, formulario de contacto con alternativa por email y controles automáticos orientados a producción.

## Requisitos y puesta en marcha

- Node.js 22.12 o posterior.
- npm, usando el `package-lock.json` versionado.

```bash
npm ci
```

Copiar `.env.example` como `.env` y completar los datos comerciales. Luego iniciar el entorno local:

```bash
npm run dev
```

El sitio queda disponible, por defecto, en `http://localhost:4321`. Para sesiones de desarrollo automatizadas o persistentes se debe usar el modo en segundo plano de Astro:

```bash
npx astro dev --background
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## Variables de entorno

Todas las variables son públicas porque Astro las incorpora al cliente durante el build. No guardar secretos ni credenciales en ellas.

| Variable | Uso | Comportamiento si queda vacía |
| --- | --- | --- |
| `PUBLIC_CONTACT_FORM_ENDPOINT` | Endpoint HTTP de Formspree, Basin o una API propia. | El formulario abre un email precompletado; los datos no se descartan. |
| `PUBLIC_WHATSAPP_NUMBER` | Número internacional, solo dígitos, usado por `wa.me`. | Usa provisionalmente `5491126249300`. Debe confirmarse antes de publicar. |
| `PUBLIC_WHATSAPP_DISPLAY` | Texto visible del teléfono. | Usa provisionalmente `+54 9 11 2624-9300`. |
| `PUBLIC_INSTAGRAM_URL` | Perfil oficial de Instagram. | Se muestra la referencia visual sin un enlace muerto. |
| `PUBLIC_FACEBOOK_URL` | Página oficial de Facebook. | Se muestra la referencia visual sin un enlace muerto. |
| `PUBLIC_DEVELOPER_URL` | URL asociada al crédito `@binadevs`. | El crédito se muestra sin enlace. |

Los valores por defecto y la identidad centralizada están en `src/data/site.ts`. El email `quimicaestampados@gmail.com` y la dirección `65 Alem, Victoria, Entre Ríos` también se administran allí.

## Scripts

| Comando | Función |
| --- | --- |
| `npm run dev` | Servidor local con recarga en vivo. |
| `npm run check` | Valida Astro y TypeScript. |
| `npm run build` | Genera `dist/` y ejecuta el posprocesado de assets. |
| `npm run validate:html` | Valida el HTML generado con `html-validate`. Requiere un build previo. |
| `npm test` | Ejecuta las pruebas de producción sobre `dist/`. Requiere un build previo. |
| `npm run qa` | Ejecuta, en orden, tipos, build, validación HTML y pruebas. |
| `npm run preview` | Sirve localmente el build ya generado. |

Antes de abrir un pull request o publicar, el comando de referencia es:

```bash
npm run qa
```

El workflow `.github/workflows/qa.yml` ejecuta el mismo control con Node 22 en cada push y pull request.

## Qué comprueba QA

La suite de `tests/production.test.mjs` verifica el resultado estático, no solo el código fuente:

- generación del home, las 17 rutas de producto y la página 404;
- idioma, metadatos esenciales, un único `main` y `h1`, y enlace para saltar al contenido;
- títulos únicos en páginas indexables;
- ausencia de enlaces o formularios con destino `#` y de texto corrupto;
- integridad de rutas internas, anclas y assets locales;
- presencia de las 36 referencias Figma en el HTML generado;
- presupuesto máximo de 35 MiB para `dist/`.

El script `scripts/prune-dist-assets.mjs` se ejecuta después del build y elimina exclusivamente PNG generados que no estén referenciados desde `dist/`; no modifica los originales de `src/assets/`.

## Arquitectura

```text
src/
├── assets/                    Imágenes y SVG fuente
├── components/
│   ├── layout/                Header, hero y footer
│   ├── product/               Ficha reutilizable de producto
│   ├── sections/              Secciones del home
│   └── shared/                Elementos visuales compartidos
├── data/
│   ├── products.ts            Contenido, opciones, precios, galerías y nodos Figma
│   └── site.ts                Datos comerciales y enlaces centralizados
├── layouts/MainLayout.astro   Metadatos, JSON-LD y estructura común
├── pages/
│   ├── index.astro            Home
│   ├── productos/[slug].astro Rutas estáticas de las 17 fichas
│   └── 404.astro              Página de error
└── styles/                    Reset, variables y estilos globales

public/                        Archivos servidos sin transformación
scripts/                       Posprocesado seguro del build
tests/                         Pruebas del artefacto de producción
```

Los productos y sus variantes se definen una sola vez en `src/data/products.ts`. La ruta dinámica genera las páginas estáticas desde esos datos; para agregar un producto deben incorporarse sus imágenes, su registro de contenido, su `slug` único y sus referencias Figma.

## Trazabilidad de los 36 nodos Figma

Archivo de diseño: [Cliente Estampados — Sitio Web](https://www.figma.com/design/jJAimgKVZatklPzSXvg8sh/Cliente-Estampados---Sitio-Web--copia-).

La implementación conserva cada identificador en atributos `data-figma-node` o `data-figma-nodes`. La prueba de producción falla si falta cualquiera de las 36 referencias recibidas.

### Página principal y productos

| Pantalla o ruta | Referencias Figma |
| --- | --- |
| Home `/` | `1031:1215` |
| `/productos/calcos-papel/` | `1033:2504` |
| `/productos/calcos-vinilo/` | `1039:3107` |
| `/productos/calcos-dtf-uv/` | `1039:3362` |
| `/productos/gorra-trucker/` | `1060:1260` |
| `/productos/remera-nino/` | `861:1632` |
| `/productos/remera-unisex/` | `642:1797`, `642:2027`, `642:3737` |
| `/productos/remera-oversize/` | `642:3220`, `642:2986`, `655:982` |
| `/productos/chomba-algodon/` | `835:2670` |
| `/productos/remera-egresadito/` | `861:2182` |
| `/productos/buzo-cuello-redondo/` | `825:979` |
| `/productos/buzo-canguro/` | `835:1452` |
| `/productos/buzo-canguro-nino/` | `834:713` |
| `/productos/campera-capucha/` | `835:2180` |
| `/productos/chomba-pique/` | `1059:1017` |
| `/productos/folletos/` | `1060:1507` |
| `/productos/tarjetas-personales/` | `1095:2870` |
| `/productos/etiquetas/` | `1096:3136` |

### Estados de “Nuestros trabajos”

| Estado | Referencia Figma |
| --- | --- |
| Textil, incluido en el home | `1031:1215` |
| Calcos | `1032:2174` |
| Papelería | `1033:2254` |
| Gran formato | `1033:2334` |
| Corpóreos | `1033:2414` |

### Estados de preguntas frecuentes

| Pregunta o estado | Referencias Figma |
| --- | --- |
| No tengo diseño | `736:1066` |
| ¿Realizan solo el textil? | `736:1053`, `738:1203` |
| ¿Cómo envío mi diseño? | `737:1105` |
| Demora del pedido | `737:1122` |
| Telas disponibles | `737:1136` |
| Tipos de estampado | `737:1150`, `737:1164` |
| ¿Tienen local? | `738:1190` |
| Descuentos por cantidad | `738:1177` |

## Checklist de publicación

- [ ] Confirmar teléfono y texto visible de WhatsApp; probar todos los CTA desde un teléfono real.
- [ ] Confirmar email, dirección comercial y la discrepancia original entre `65 Alem` y `66 Alem`.
- [ ] Definir el endpoint definitivo del formulario y comprobar éxito, error, validación y recepción de mensajes.
- [ ] Completar las URLs oficiales de Instagram, Facebook y, si corresponde, del crédito de desarrollo.
- [ ] Confirmar precios, cuotas, descuentos, cantidades mínimas, tiempos de producción y costos de envío.
- [ ] Aprobar los textos corregidos respecto de Figma, especialmente calcos, gorras, buzos, folletos y tarjetas.
- [ ] Definir el dominio público mediante la opción `site` de `astro.config.mjs`, necesaria para emitir la URL canónica.
- [ ] Ejecutar `npm ci` y `npm run qa` en un entorno limpio; no publicar si algún control falla.
- [ ] Revisar visualmente desktop, tablet y mobile contra Figma, incluida navegación por teclado, modales, carruseles, filtros y preguntas frecuentes.
- [ ] Probar el build con `npm run preview`, HTTPS, redirecciones, ruta 404 y enlaces externos en el hosting definitivo.
- [ ] Revisar Lighthouse en producción y acordar una política de caché para los assets de `/_astro/`.
- [ ] Definir aviso de privacidad si el formulario definitivo almacena datos personales o incorpora analítica.

## Datos pendientes de confirmación

El repositorio usa valores funcionales para poder probar el flujo completo, pero los siguientes puntos no deben considerarse aprobados comercialmente:

- WhatsApp provisional: `5491126249300` / `+54 9 11 2624-9300`.
- Dirección normalizada: `65 Alem, Victoria, Entre Ríos`; en el diseño también aparecía `66 Alem`.
- Email visible y receptor alternativo: `quimicaestampados@gmail.com`.
- Endpoint real del formulario, perfiles sociales, URL del crédito y dominio canónico.
- Tarifas y condiciones comerciales incluidas en las fichas.
- Copys donde se corrigieron inconsistencias evidentes del diseño; deben recibir aprobación final del cliente.

Hasta completar esos datos, el proyecto está preparado para QA y preproducción, pero no para una publicación comercial definitiva.
