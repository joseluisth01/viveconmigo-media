# Vive Conmigo · Playbook de vídeos para redes

Instrucciones para la tarea programada que crea un vídeo vertical, lo sube a este repo
y lo programa en Metricool (Instagram Reel + TikTok) para el día siguiente.

## Marca
- Producto: **Vive Conmigo** (vive-conmigo.es). Web de pisos compartidos donde ves los hábitos
  de la gente del piso y tu **% de compatibilidad** con cada uno *antes* de escribir.
- Diferencial extra: un **inquilino** puede publicar su piso para buscar compi **aunque no sea el dueño**.
- Público: estudiantes y jóvenes (18–30) que buscan habitación o compi. España, sin ciudad concreta
  (no mencionar Córdoba ni ninguna ciudad).
- Tono: cercano, con humor de piso compartido, tú a tú, frases cortas. Nada de promesas falsas,
  cifras inventadas ni testimonios inventados. Los perfiles que aparezcan llevan "Perfil de ejemplo"
  (el motor lo añade solo en la escena `profile`).
- Registro de humor: situaciones reconocibles (platos, fiestas, papel, calefacción, horarios,
  tabaco, visitas, ruido, la nevera, el baño, la fianza). Sin estereotipos de grupos.

## Estructura de un vídeo (18–28 s)
1. **Gancho** (escena `hook`, 2.4–3 s): primera frase que obliga a quedarse. Grande y corta.
2. **Desarrollo** (2–5 escenas): lista numerada, chat, expectativa vs realidad, tipos de compi…
3. **Giro hacia el producto** (escena `chips` o `profile` o `text`): qué resuelve Vive Conmigo.
4. **CTA** (escena `cta`, ~3.4 s): título corto + vive-conmigo.es. El `foot` puede pedir comentarios.

## Formatos (rotar, no repetir el mismo dos veces seguidas)
- **Red flags / señales** (escenas `item` numeradas + barra de progreso).
- **Chat** (escena `chat`): conversación de visita de piso o de grupo de WhatsApp del piso.
- **Expectativa vs realidad** (`versus`).
- **Tipos de compañero** ("¿cuál eres tú?") con `item` y pregunta final en comentarios.
- **Lo que preguntas vs lo que deberías preguntar** al ver un piso (`versus` o `item`).
- **Consejos útiles** (3 preguntas antes de alquilar, cómo repartir gastos, normas del piso…) con `item`.
- **Este o este** ("¿con quién vivirías, A o B?") con `versus` + CTA a comentar.
- **POV** ("POV: llevas 3 semanas en el piso nuevo…") con `text` + `chat`.
- **Inquilino que busca compi** (publica tu habitación aunque no seas el dueño) con `text` + `chips`.
- **Cómo funciona el % de compatibilidad** (`profile`).

## Spec JSON (motor `engine.html`)
Temas de color: `cream`, `ink`, `terra`, `olive`, `sand`, `rust`. Alternar fondos claros y oscuros.
En cualquier texto, `*palabra*` = cursiva en color de acento.
- `hook` / `text`: `{ lines:[{t, size?, accent?, it?, sans?, soft?, pop?, wait?}], flags?, label?, step?, gap? }`
- `item`: `{ title, sub?, size? }` — se numeran solos y llevan barra de progreso.
- `chat`: `{ label?, msgs:[{from:"me"|"them", t, wait?}] }` — máx. 4 mensajes, frases cortas.
- `versus`: `{ title, left:{label, items[]}, right:{label, items[]} }` — 2–3 items por lado.
- `profile`: `{ title, name, tag, pct, rows:[{good:true|false, k, v}] }`
- `chips`: `{ label?, title, chips[], foot? }` — 3–6 chips.
- `cta`: `{ title, foot? }`
Cada escena lleva `dur` (s). Reglas de duración: item 2.3, chat ~1 s por mensaje + 1, versus 4,
profile 4.4, chips 4, cta 3.4. Las frases deben caber en ~3 líneas (máx. ~40 caracteres por línea a 104 px).

Render: `node render.js specs/AAAA-MM-DD-slug.json videos/AAAA-MM-DD-slug.mp4`
(genera también `-cover.jpg`). Comprobar SIEMPRE con `--probe` (3–4 instantes) y mirar las
imágenes antes de renderizar: que no se corte ningún texto y que nada quede fuera de la zona segura.

## Publicación (Metricool)
- Marca Metricool: viveconmigoapp (sacar `blogId` y zona horaria con getBrandSettings).
- Límite plan gratis: 20 publicaciones/mes → 10 vídeos/mes (cada vídeo = Instagram + TikTok).
  Antes de programar, contar con getScheduledPosts lo ya programado/publicado del mes; si se
  alcanzaría el límite, no programar y avisar.
- Programar para **el día siguiente** a la mejor hora (getBestTimeToPostByNetwork para tiktok e
  instagram; normalizar cada red por su máximo, sumar y elegir la mejor hora **entre 17:00 y 21:00**,
  para que José tenga el día para revisar el vídeo y añadirle música en TikTok si quiere).
- `media`: URL pública jsDelivr del commit (`https://cdn.jsdelivr.net/gh/<owner>/viveconmigo-media@<sha>/videos/<archivo>.mp4`).
- `providers`: instagram + tiktok. `instagramData.type = "REEL"`, `showReelOnFeed = true`,
  NO enviar `audioConfiguration` (la cuenta de Instagram no está vinculada a una página de Facebook y
  la API devuelve "Authorization Error").
  `tiktokData`: **`title` obligatorio** (frase corta del gancho), público, comentarios/dúo/pegar
  permitidos, `commercialContentOwnBrand` false, `autoAddMusic` false.
  `videoThumbnailUrl`: el `-cover.jpg` del mismo commit. `autoPublish: true`.
- Metricool vuelve a alojar el vídeo (static.metricool.com), así que el enlace de jsDelivr solo tiene
  que funcionar en el momento de programar. Comprobar con curl que devuelve 200 y video/mp4 antes.
- Texto: 1–2 frases con pregunta para comentarios + "Link en el perfil." + 4–6 hashtags
  (#pisocompartido #compañerosdepiso #buscopiso #estudiantes #universidad + uno del tema).

## Registro
Añadir una línea a `LOG.md` por vídeo: fecha de publicación · formato · gancho · hora · URL.
Leer `LOG.md` antes de empezar para no repetir formato ni tema de los últimos 6 vídeos.
