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

## Objetivo: VISUALIZACIONES y REACCIÓN
Cada vídeo tiene que provocar algo: risa, "esto me pasó", ganas de etiquetar a un amigo o ganas de
opinar en comentarios. Mezcla de contenidos (en cada bloque de ~6 vídeos):
- ~3 de **humor / identificación** (situaciones de piso que todo el mundo ha vivido).
- ~2 de **debate / tema sensible** que divide opiniones y genera comentarios (ver lista abajo).
  Se plantea como pregunta, sin insultar ni ridiculizar a nadie, sin estereotipos de género, origen,
  religión ni orientación. Polémica de convivencia, no de grupos de personas.
- ~1 **útil / producto** (consejos, cómo funciona la compatibilidad, inquilino que busca compi).
El CTA de los de debate pide opinar ("Comenta A o B", "¿Estás de acuerdo?", "Etiqueta a tu compi").

### Banco de temas de debate (rotar, no repetir)
- La pareja que se queda a dormir casi todos los días: ¿debe pagar?
- La habitación grande: ¿paga lo mismo o más?
- ¿Dividir la luz a partes iguales si uno trabaja desde casa todo el día?
- Fumar en el balcón: ¿cuenta como fumar en casa?
- Compartir piso con 30+ años: ¿normal hoy en día o fracaso? (precio del alquiler)
- Mixto o solo chicos / solo chicas: ¿preferencia o problema? (sin estereotipos, cada uno elige)
- ¿Estudiantes con trabajadores: buena o mala idea?
- Fiestas en casa entre semana: ¿cuántas son demasiadas?
- Mascotas en piso compartido: ¿sí o no?
- Hacer la compra común o cada uno lo suyo.
- El compi que nunca está: ¿el mejor compi del mundo?
- ¿Es de mala persona no querer vivir con alguien que fuma?
- Visitas que se quedan una semana. Música sin cascos. La nevera "comunal".
- Caseros que piden 2-3 meses de fianza + mes por adelantado (sin dar cifras inventadas como datos).
Añade temas nuevos al banco cuando se te ocurran.

## Variedad (obligatoria)
Antes de escribir el spec, lee las últimas 6 líneas del LOG y cambia a la vez:
- **Formato** (no repetir el del vídeo anterior; no más de 2 veces en los últimos 6).
- **Tipo de escena principal** (`item`, `chat`, `versus`, `poll`, `quote`, `checklist`, `profile`, `text`).
- **Color del gancho** (tema distinto al del vídeo anterior) y **duración** (alternar cortos de 10-15 s
  con otros de 20-28 s; los cortos con una sola idea suelen retener mejor).
- **Estilo de gancho**: pregunta directa, "POV:", "Opinión impopular:", "Nadie habla de…",
  "Cosas que…", "Si tu compi hace esto…", "A o B", "Esto me pasó…". Nunca el mismo dos veces seguidas.
- El CTA no siempre igual: variar título y `foot`.

## Formatos (rotar, no repetir el mismo dos veces seguidas)
- **Opinión impopular** (`quote` + `poll` o `text`) — de debate.
- **A o B** (`poll`) — de debate, pide comentar A o B.
- **Checklist** antes de alquilar / lo que tiene que tener tu compi ideal (`checklist`).
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
- `poll`: `{ label?, title, options:[A, B], foot? }` — opción A y B grandes + "Comenta A o B".
- `quote`: `{ label? (por defecto "Opinión impopular"), title, sub? }` — frase polémica grande.
- `checklist`: `{ label?, title, rows:[{t, ok?:false}] }` — 3-5 filas con ✓ o ✗.
- `cta`: `{ title, foot? }`

### Portada (OBLIGATORIA)
`cover: { kicker, title, theme, size? }` en la raíz del spec. Es lo que se ve en el perfil, así que
tiene que leerse de un vistazo: kicker corto (POV, Red flags, Opinión impopular, A o B, Checklist…),
título de 4-9 palabras con una palabra en `*cursiva*`, tema de color distinto al de la portada anterior.
`render.js` la genera como `-cover.jpg` (también se puede sacar sola con `--cover`). MÍRALA antes de publicar.
Cada escena lleva `dur` (s). Reglas de duración: item 2.3, chat ~1 s por mensaje + 1, versus 4,
profile 4.4, chips 4, cta 3.4. Las frases deben caber en ~3 líneas (máx. ~40 caracteres por línea a 104 px).

Render: `node render.js specs/AAAA-MM-DD-slug.json videos/AAAA-MM-DD-slug.mp4`
(genera también `-cover.jpg`). Comprobar SIEMPRE con `--probe` (3–4 instantes) y mirar las
imágenes antes de renderizar: que no se corte ningún texto y que nada quede fuera de la zona segura.

## Publicación (Metricool)
- Marca Metricool: viveconmigoapp (sacar `blogId` y zona horaria con getBrandSettings). Comprueba SIEMPRE que
  `networksData.instagramData` es "viveconmigoapp" (no "metodobreathforce"); si no lo es, NO programes y avisa.
- Límite plan gratis: 20 publicaciones/mes → 10 vídeos/mes (cada vídeo = Instagram + TikTok).
  Antes de programar, contar con getScheduledPosts lo ya programado/publicado del mes; si se
  alcanzaría el límite, no programar y avisar.
- Programar para **el día siguiente** a la mejor hora (getBestTimeToPostByNetwork para tiktok e
  instagram; normalizar cada red por su máximo, sumar y elegir la mejor hora **entre 17:00 y 21:00**,
  para que José tenga el día para revisar el vídeo y añadirle música en TikTok si quiere).
- `media`: URL pública jsDelivr del commit (`https://cdn.jsdelivr.net/gh/<owner>/viveconmigo-media@<sha>/videos/<archivo>.mp4`).
- `providers`: instagram + tiktok. `instagramData.type = "REEL"`, `showReelOnFeed = true`,
  **Música en Instagram (OBLIGATORIA)**: `instagramData.audioConfiguration = {"audioId": "<búsqueda o id>", "audioVolume": 70, "videoVolume": 100}`.
  Desde el 05/11 Instagram está vinculado a la página de Facebook "Vive Conmigo · Pisos compartidos" y funciona.
  Elige una canción en tendencia en España esa semana (búscalo con WebSearch: artículos tipo "audios virales
  Reels/TikTok esta semana", playlists "TikTok Viral España") que encaje con el tono del vídeo: instrumental
  para vídeos con mucho texto, la del trend "POV" para los POV, etc. Pasa como audioId "Título Artista";
  si devuelve varias coincidencias, reintenta con el id numérico del candidato cuyo título sea exactamente
  esa canción (vale `original_sound`). Si no aparece, usa la mejor alternativa de la lista de candidatos.
  No repitas la misma canción que en los 3 vídeos anteriores (apúntala en el LOG).
  Ya usadas: Sunshine Instrumental – Twista, Coming Up Roses – Harry Styles, Housewife (remix) – Tate McRae.
- **Música en TikTok**: el conector no permite elegirla (TikTok solo deja la biblioteca comercial y se pone
  a mano en Metricool). Recuérdaselo a José en el resumen.
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
