# Bolucompras

Cada día, una sola compra innecesaria. El sitio elige la bolucompra según la fecha de Argentina y deja el resto para más adelante.

## Cómo verlo en local

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

`npm run dev` recalcula el día en cada visita. `npm run build` y `npm start` sirven la versión estática: se renueva sola cada 24 horas, o cuando pega el cron del deploy.

## Cómo se elige la del día

La hora es la de Argentina. La zona IANA es `America/Argentina/Cordoba`: es el reloj de todo el país (UTC−3, sin horario de verano).

- Si hay un producto con `fecha_publicacion` igual a hoy, esa es la bolucompra del día.
- Si no hay, se muestra la última ya publicada.
- Lo que tiene fecha futura no se muestra: ni en la home, ni en el archivo, ni en el sitemap.
- El carrusel lista las anteriores, de la más nueva a la más vieja, con pestañas de esta semana, por mes y “Las más boludas” (por `nivel_boludez`).

El dataset arranca el 2026-10-26. Antes de esa fecha la home muestra la espera, a propósito.

## Cómo cargar productos

Editá `data/dataset.json`. Cada ítem es un objeto. No inventes filas en otro lado: la web lee solo ese archivo.

| Campo | Para qué |
| --- | --- |
| `id` | Número único. Entra en la URL. |
| `nombre` | Título visible. |
| `tienda` | Mercado Libre, Amazon, Temu o Shein. |
| `url_producto` | Link a la publicación. Se usa si no hay afiliado. |
| `link_afiliado` | Link de afiliado. Si está vacío, el botón usa `url_producto`. |
| `precio_referencia` | Número de referencia, por ejemplo `ARS 22923.46`. Vacío si no hay precio. |
| `moneda` | `ARS`, `USD`, etc. Vacío si no hay precio. |
| `fecha_precio` | Día en que se miró el precio, `YYYY-MM-DD`. |
| `emoji` | Se muestra grande cuando no hay foto. |
| `imagen_url` | Foto. Si está vacía, va el emoji. |
| `descripcion_graciosa` | El texto de la ficha. |
| `nivel_boludez` | Del 1 al 10. Ordena “Las más boludas”. |
| `tags` | Separados por coma. |
| `categoria` | Una palabra o frase corta. |
| `fecha_publicacion` | Día en que sale, `YYYY-MM-DD`. Una por día alcanza. |

`nota` y `url_verificada` son apuntes internos: el sitio no los muestra.

Los links de salida llevan `rel="sponsored nofollow noopener"` y `target="_blank"`.

Para sumar productos nuevos hay que volver a deployar: el JSON viaja en el build. Las fechas que ya están cargadas rotan solas, sin otro deploy.

## Deploy en Vercel

1. Subí el repo a GitHub.
2. En Vercel, importá el proyecto. Framework: Next.js. El comando de build es `npm run build`.
3. Variables de entorno (también están en `.env.example`):
   - `NEXT_PUBLIC_SITE_URL`: la URL canónica, sin barra al final. En producción es `https://www.nolonecesitas.com.ar`. De ahí salen el canonical, `og:url`, `og:image`, el sitemap, el JSON-LD y `/rss.xml`.
   - `NEXT_PUBLIC_GSC_VERIFICATION`: el código de Google Search Console. Si no está, no se imprime el meta de verificación.
   - `CRON_SECRET`: un string largo. Vercel lo manda como `Authorization: Bearer …` cuando corre el cron. Si no está, cualquiera puede pegarle a `/api/revalidate`.
   - `KIT_API_KEY`: API key de Kit (ConvertKit), la de la API v3. Solo vive en el servidor.
   - `KIT_FORM_ID`: id numérico del formulario de Kit al que se anotan los mails.
4. El archivo `vercel.json` programa `/api/revalidate` a las 03:05 UTC, que son las 00:05 en Argentina (UTC−3, sin horario de verano). Eso, más la revalidación de 24 horas, cambia el día sin un deploy manual.

En el plan Hobby de Vercel el cron diario entra. Después del deploy, la home, el archivo, las fichas `/b/[slug]`, el sitemap y `/rss.xml` se regeneran con la fecha nueva.

En producción, si el host es `*.vercel.app` o no es `www.nolonecesitas.com.ar`, el middleware responde 308 hacia `https://www.nolonecesitas.com.ar` con el mismo path y query. Las rutas `/api/` no se redirigen, para que el cron siga pegándole a `/api/revalidate`. Los deploys de Preview no redirigen y salen con `noindex`.

`/ads.txt` está vacío a propósito, hasta que AdSense pase el ID de publisher.

## Newsletter

El formulario “Recibí la boludez del día” hace `POST /api/subscribe` con el mail. La ruta valida el mail, frena repeticiones por IP y manda el alta a Kit:

`POST https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`

`KIT_API_KEY` no se manda al navegador. Si falta la key o el id del formulario, la página muestra un error y sigue en pie. Hay un campo oculto (honeypot): si viene con texto, no se suscribe a nadie.

## RSS

`/rss.xml` lista las bolucompras ya publicadas, de la más nueva a la más vieja. Cada ítem trae título, descripción, link y fecha. Las que todavía no salieron no entran. Sirve para armar el mail diario.
