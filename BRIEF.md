# Bolucompras: brief del proyecto

## Concepto
Sitio en español para público hispanohablante. Cada día muestra UNA "bolucompra": un producto real, absurdo o gracioso, de Mercado Libre, Amazon, Temu o Shein, con link de afiliado. Debajo, un carrusel con las bolucompras de días y meses anteriores. El tono es divertido e irreverente.

## Referencias
- `referencia/index.html`: maqueta HTML aprobada (estilo, secciones, textos).
- `referencia/desktop.png` y `referencia/mobile.png`: capturas de la maqueta.
- `data/dataset.json`: 50 productos iniciales (también en CSV y XLSX). Campos clave: id, nombre, tienda, url_producto, link_afiliado (vacío por ahora), precio_referencia, moneda, emoji, imagen_url, descripcion_graciosa, nivel_boludez, tags, categoria, fecha_publicacion (YYYY-MM-DD).

## Secciones
1. Header negro con logo "🛒 BOLU[COMPRAS]", menú (Archivo, Ranking, ¿Qué es esto?) y botón "Suscribite". Franja amarilla con frases que se desplazan.
2. Hero "La bolucompra del día": tarjeta grande, stickers, tienda, fecha, descripción, precio, medidor "Nivel de boludez X/10" y CTA "¡LA QUIERO YA! 🛒" hacia link_afiliado (o url_producto si está vacío), con rel="sponsored nofollow noopener" y target="_blank".
3. Carrusel "Bolucompras anteriores" con pestañas (Esta semana, por mes, 🏆 Las más boludas), flechas y deslizamiento táctil.
4. Newsletter "💌 Recibí la boludez del día" (por ahora solo el formulario de la interfaz).
5. Footer con aviso de afiliados obligatorio y aclaración de precios orientativos.
6. Página individual por bolucompra (/b/[slug]) y página de Archivo, para SEO y para compartir.

## Lógica de publicación
- Bolucompra del día = el ítem con fecha_publicacion igual a hoy (zona America/Argentina/Cordoba). Si no hay ninguno, el último publicado.
- Nunca mostrar ítems con fecha futura.
- Anteriores = fecha_publicacion < hoy, de la más nueva a la más vieja.
- Generación estática con revalidación diaria (ISR o un cron de Vercel a las 00:05) para que el cambio de día sea automático, sin deploy manual.

## Stack sugerido
Next.js (App Router) + TypeScript + Tailwind, con deploy en Vercel. Los datos se leen desde `data/dataset.json` (más adelante se puede migrar a Supabase o Google Sheets).

## SEO
Metadatos y Open Graph por bolucompra, sitemap.xml, robots.txt, JSON-LD de Product, lang="es" y buen puntaje en Lighthouse.
