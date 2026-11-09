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

### Música (OBLIGATORIA, dentro del vídeo)
José no quiere la música de Metricool. Cada vídeo lleva en el spec `"music": "<id>"` de
`assets/music/catalog.json`: biblioteca propia de canciones **CC0 (dominio público, sin derechos ni
atribución)** sacadas de Free Music Archive (Loyalty Freak Music, HoliznaCC0, Monplaisir). Son clips de 40 s
ya normalizados; `render.js` los mezcla con fundido de entrada y salida.
- Elige por `mood` según el vídeo: `alegre` (humor ligero, consejos), `disco` (listas rápidas, red flags,
  energía), `chill` (POV, chat, vídeos con mucho texto), `tension` (debate, opinión impopular, polémica).
- No repitas ninguna canción usada en los últimos 6 vídeos del LOG (columna Música) y rota entre todas.
- Opcional: `"musicVolume": 0.8` si la canción tapa demasiado; `"musicStart": 5` para empezar más tarde.
- Si José dice que una canción no le gusta, quítala de `catalog.json` (y borra el mp3).
- Para ampliar la biblioteca: SOLO pistas con licencia CC0 verificada en la página del álbum de FMA.

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

## Publicación (desde el 11/11/2026)
Instagram va por **Buffer** (diario, sin límite mensual) y TikTok por **Metricool** (plan gratis: máx. 20
publicaciones publicadas al mes; se aprovechan TODAS). Hora: el día siguiente a la mejor hora entre 17:00 y 21:00.

### Hora
- getBestTimeToPostByNetwork (Metricool, brandId 7884043, tz Europe/Madrid) para tiktok e instagram del día
  siguiente; normaliza cada red por su máximo, suma y elige la mejor hora entre 17:00 y 21:00 (hora de Madrid).
- **Buffer usa UTC**: convierte la hora de Madrid a UTC con zoneinfo (invierno UTC+1, verano UTC+2), p. ej.
  `python3 -c "from datetime import datetime;from zoneinfo import ZoneInfo as Z;print(datetime(2026,11,12,18,0,tzinfo=Z('Europe/Madrid')).astimezone(Z('UTC')).strftime('%Y-%m-%dT%H:%M:%S.000Z'))"`.

### Instagram → Buffer (acción de GitHub `buffer-post`)
La clave de Buffer solo está en el secreto `BUFFER_API_KEY` del repo; nunca la pidas ni la escribas.
```
gh workflow run buffer-post.yml -R joseluisth01/viveconmigo-media -f cmd=post -f service=instagram \
  -f text="<texto>" -f due="<UTC ...Z>" -f video="<URL jsDelivr del mp4>" -f thumb_ms=<coverOffsetMs>
```
`coverOffsetMs` está en `videos/<archivo>.json` (la portada diseñada va en los últimos 0,3 s del vídeo).
Espera a que termine (`gh run list -R ... -w buffer-post -L 1`, `gh run watch <id> --exit-status`) y lee el
resultado con `gh run view <id> --log | grep RESULT_JSON`. Debe ser `PostActionSuccess` con el id del post.
El script solo publica en canales cuyo nombre contenga "viveconmigo" (nunca en los de BreathForce).
Para borrar un post: `-f cmd=delete -f post_id=<id>`. Para cambiar la hora: borrar y crear de nuevo.
Si la acción falla, NO reintentes más de una vez; avisa a José con el error.

### TikTok → Metricool (mientras quede cupo)
- Lee `metricool_usage.json`. Si el mes de publicación ya tiene 20, NO programes TikTok y dilo en el resumen.
- Comprueba con getBrandSettings que tiktokData = "viveconmigoapp".
- createScheduledPost SOLO con provider tiktok, autoPublish true, media = URL jsDelivr del mp4,
  videoThumbnailUrl = URL jsDelivr del -cover.jpg, tiktokData {title (frase corta del gancho, obligatorio),
  privacyOption PUBLIC_TO_EVERYONE, comentarios/dúo/pegar permitidos, commercialContentOwnBrand false,
  autoAddMusic false}. Sin música desde Metricool (ya va en el vídeo).
- Si se programa bien, suma 1 en `metricool_usage.json` para ese mes. Si Metricool rechaza por el límite, pon
  el contador a 20 y no insistas.
- **NUNCA** uses updateScheduledPost sobre una publicación a la que José le haya puesto música a mano.

### Texto del post (igual en las dos redes)
1-2 frases con pregunta o reto para comentarios + "Link en el perfil." + 4-6 hashtags
(#pisocompartido #compañerosdepiso #buscopiso #estudiantes #universidad + uno del tema).
Comprueba antes con curl que el mp4 y el -cover.jpg de jsDelivr (con el SHA del commit) devuelven 200.

## Registro
Añadir una línea a `LOG.md` por vídeo: fecha de publicación · formato · gancho · hora · URL.
Leer `LOG.md` antes de empezar para no repetir formato ni tema de los últimos 6 vídeos.


### IMPORTANTE: cómo lanzar Instagram/Buffer desde la nube
`gh workflow run` da 403 en sesiones de la nube. Usa la cola: crea `queue/AAAA-MM-DD-slug.json` con
`{"service":"instagram","text":"...","due":"<UTC con Z>","video":"<url jsDelivr>","thumb_ms":<coverOffsetMs>}`,
haz commit + push a main (el vídeo ya debe estar subido y servido por jsDelivr). Eso lanza `buffer-post`; el resultado (RESULT_JSON)
se lee con `gh api repos/joseluisth01/viveconmigo-media/actions/runs/<id>/logs`.
