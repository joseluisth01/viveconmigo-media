# Vive Conmigo · Playbook del blog (artículo diario)

Lo usa la tarea programada que publica un artículo cada madrugada en https://vive-conmigo.es/blog
mediante el conector MCP de Viveconmigo (herramientas `blog_*`, `db_query`). Objetivo nº 1: **posicionar en
Google España** búsquedas reales de estudiantes y gente que comparte piso, y llevarlas a registrarse/buscar.

## 1. Elegir tema y palabra clave (antes de escribir)
1. `blog_list_clusters` y `blog_list_posts` (todos los estados): lista títulos, slugs y keywords. **No repitas tema
   ni palabra clave** de otro artículo (ni una casi igual: canibalización). Mira también `LOG-BLOG.md`.
2. Elige UNA palabra clave principal **long tail alcanzable** (3-7 palabras, frase natural o pregunta) con búsqueda real
   en España. Comprueba con WebSearch el top 10: si dominan foros (enalquiler, forocoches, reddit), blogs medianos
   (yaq.es, uniplaces, uniscopio, housfy…) o medios generalistas, es alcanzable; si solo salen idealista/fotocasa/
   grandes portales con páginas transaccionales, busca otra.
3. Analiza el top 5: intención (informativa, cómo hacer, comparación, lista), formato que gana, subtemas que todos
   cubren y lo que les falta. Tu artículo cubre esos subtemas y aporta más (plan paso a paso, test, plantilla, checklist).
4. 4-6 keywords secundarias (variantes, "otras preguntas de los usuarios") para H2/H3 y FAQ.

### Rotación de temas (alternar, ~en este orden de prioridad)
- **Universidad / estudiantes (≈40 %)**: residencia vs piso vs colegio mayor; qué llevar a un piso de estudiantes
  (checklist); presupuesto mensual de un universitario fuera de casa; cómo buscar piso para Erasmus/estudiantes que
  vienen de fuera; cuándo empezar a buscar piso para septiembre; piso de estudiantes cerca de la facultad;
  compañeros de piso en primero de carrera; estudiar en un piso compartido (ruido, exámenes); becas y ayudas al
  alquiler para jóvenes/estudiantes (solo datos oficiales con enlace, nada inventado); contrato de habitación para
  estudiantes y padres avalistas; mudarse a otra ciudad por la universidad.
- **Convivencia / conducta (≈40 %)** — los temas que enfrentan a la gente: mi compañero de piso no limpia (qué hacer);
  cuadrante/turnos de limpieza; compañero que fuma en casa; mascotas en piso compartido (alergias, normas, contrato);
  pareja que se queda a dormir; ruido y fiestas; compañero que no paga; cómo hablar de un conflicto sin romper la
  convivencia; normas de convivencia (plantilla); cómo echar o cambiar a un compañero (con LAU, sin inventar);
  calefacción y facturas en invierno; teletrabajo en piso compartido; convivir con alguien de otro horario.
- **Buscar piso / legal / dinero (≈20 %)**: fianza y garantías (LAU, con enlace al BOE); estafas de alquiler de
  habitaciones; preguntas en la visita; empadronarse en un piso compartido; dividir gastos; buscar compañero sin ser
  propietario.
- Ciudades: SOLO si hay una búsqueda clara y sin canibalizar (el clúster `ciudades` ya tiene Madrid). No crear landings
  "alquilar habitación en X".

## 2. Escritura (estilo y SEO on-page)
- Español de España, tuteo, frases cortas, útil, sin frases típicas de IA ("en el mundo actual", "sin lugar a dudas",
  "en definitiva", "sumérgete"…). Nada de cifras, estudios o testimonios inventados: cualquier dato lleva fuente real
  verificada con WebFetch (y se nombra en el texto: "según idealista…", "según el BOE…").
- **Título (H1)** con la palabra clave exacta; **meta_title ≤ 60-65** (el sistema añade "· Viveconmigo") con la keyword
  al principio; **meta_description 140-155** con keyword + beneficio/CTA; **slug** corto = keyword sin palabras vacías;
  **excerpt** 150-250 caracteres.
- **Primer párrafo**: keyword en las primeras 100 palabras y RESPUESTA DIRECTA en 40-60 palabras (fragmento destacado).
- H2 = subpreguntas reales (varios con keywords secundarias); H3 solo dentro de H2. Keyword principal 3-6 veces, natural.
- 1.100-1.600 palabras. Incluye algo práctico: checklist, pasos numerados, test rápido, plantilla o guion de conversación.
- Sección final `## Preguntas frecuentes` con 3-5 `### pregunta` y respuestas de 2-4 frases.
- Termina con una cita `> frase — Equipo Viveconmigo` (se pinta como cita).

### Markdown que SÍ soporta el motor (y lo que NO)
- Sí: `##`, `###`, párrafos, listas `- ` y `1. `, `**negrita**`, `[texto](/ruta)`, `> 💡 destacado`, `> cita — Autor`,
  `![alt](ruta "pie")`.
- **NO tablas** (salen como texto con `|`): usa listas "**Concepto**: A…; B…".
- **Cada párrafo/línea separada por una línea en blanco**: dos líneas seguidas sin hueco se juntan en un solo párrafo.

## 3. Interlinking (obligatorio, mucho)
- **Salientes**: mínimo **5 enlaces internos a artículos del blog** relacionados (anchor descriptivo con la keyword del
  destino, nunca "aquí") + **3 a páginas del producto**: `/buscar`, `/perfil-convivencia`, `/busco-companero-de-piso`,
  `/como-funciona` y landings que existen: `/pisos-compartidos/{provincia}`, `/pisos-compartidos-estudiantes/{provincia}`,
  `/pisos-compartidos-baratos/{provincia}`, `/pisos-compartidos-sin-fumadores/{provincia}`,
  `/pisos-compartidos-con-mascotas/{provincia}`, `/pisos-compartidos-solo-chicas/{provincia}`,
  `/pisos-compartidos-solo-chicos/{provincia}`, `/pisos-compartidos-gastos-incluidos/{provincia}`
  (provincia en minúsculas sin tildes: madrid, barcelona, sevilla, valencia, cordoba, granada, malaga…).
  Comprueba con curl que cada URL devuelve 200 antes de publicar.
- **Entrantes**: edita con `blog_update_post` **2 artículos antiguos** relacionados para añadir un párrafo/frase con
  enlace al nuevo (anchor = keyword del nuevo). Usa `blog_get_post`, cambia SOLO lo necesario y reenvía el cuerpo
  completo sin perder nada (respeta líneas en blanco). No toques el mismo artículo antiguo dos días seguidos.
- 1 enlace externo a fuente seria si aporta (BOE, organismo, universidad, idealista para precios).

## 4. Portada (diseñada por ti, 1600x900)
- Generador: `node blog/cover.js blog/covers/<slug>.json blog/covers/<slug>.jpg`
  spec: `{kicker, title ("*palabra*" en cursiva acento), sub, theme: cream|sand|ink|terra|olive,
  motif: residencia|limpieza|llaves|maleta|birrete, cards?: [{x,y,t,small?,pill?}], svg?: "<svg interno viewBox 0 0 640 640>"}`.
  Si ningún motivo encaja, dibuja tu propio `svg` de línea simple (mismo estilo: trazo 5-6 px del color de línea,
  rellenos planos) relacionado con el tema (p. ej. cigarro tachado, perro, plato sucio, calendario, euro, libros).
  Puedes añadir motivos nuevos a cover.html si los vas a reutilizar.
- Título de portada corto (2-6 palabras), NO el H1 entero. Tema de color distinto al de la portada anterior.
- **Zona segura**: la web recorta con object-cover (cabecera 2.4:1 y móvil 1.35:1). Todo lo importante dentro de
  x 200-1400 e y 125-775 (el layout ya lo respeta; si añades cards, que no se salgan). MIRA la imagen con Read.
- Sube: commit + push del jpg al repo, URL jsDelivr con SHA → `blog_upload_image {url}` → usa la `ruta` como `cover`.

## 5. Publicar y comprobar
1. `blog_create_post` con status `published` (sin publish_at = ahora) o publish_at del mismo día 07:00 Madrid.
2. Espera ~1 min y comprueba con curl https://vive-conmigo.es/blog/<slug>: 200, un solo `<h1>`, `<title>` = meta_title,
   la portada carga (`/_next/image?url=…storage%2Fblog…`), **no aparece `|---|` ni texto con `|`**, todos los enlaces
   internos dan 200. (Las ediciones pueden tardar hasta 5 min en verse por la caché ISR.)
3. Haz una captura con Playwright (1280 y 390 de ancho) y MÍRALA.
4. Añade una línea a `blog/LOG-BLOG.md`: fecha · slug · keyword principal · clúster · portada · artículos antiguos enlazados.
