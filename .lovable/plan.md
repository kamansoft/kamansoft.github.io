# Sitio bilingüe: inglés y español (Latinoamérica)

## Qué verá el visitante
- El sitio abre en español si el navegador está en cualquier variante de español (es, es-CO, es-MX, es-419...). En cualquier otro caso abre en inglés.
- Un selector "EN / ES" en el menú (junto al cambio de tema), en escritorio y móvil. La elección se recuerda en visitas siguientes y tiene prioridad sobre el navegador.
- Todo el texto cambia de idioma: menú, portada, diagramas, servicios, enfoque, proceso, equipo, blog (lista y artículos completos), contacto, pie de página, burbuja de WhatsApp (incluido el mensaje precargado) y página 404.
- El título y la descripción de la pestaña también cambian, y la página declara su idioma.

## Traducción
- Español latinoamericano neutro: "ustedes" en vez de "vosotros", tuteo profesional ("tu operación"), vocabulario común en Colombia/México ("computadora", "aplicación", "nube"), sin modismos de España.
- Se mantiene el tono: frases cortas, ingenieros primero, operación antes que código. Se conservan las frases clave adaptadas, p. ej. "Entendemos / Dirigimos / Revisamos" y "Negocio primero".
- Términos técnicos de uso habitual se dejan en inglés cuando así se usan en la región (MVP, sprint, DevOps, ETL); nombres propios y correos sin cambios.

## Detalles técnicos
- Cada archivo de `src/data/*.json` pasa a tener una versión por idioma: `src/data/en/*.json` y `src/data/es/*.json` (misma estructura). `site.json` sigue siendo único.
- Los adaptadores JSON reciben el idioma y cargan `data/{lang}/{archivo}.json`, con respaldo a `en` si falta un archivo; un futuro adaptador de API solo añadiría `?lang=`.
- Nuevo `LanguageProvider` (contexto React) + `LanguageService`: detección con `navigator.languages`, lista de idiomas disponibles, preferencia guardada en `localStorage`, respaldo `en`; actualiza `<html lang>`, título y meta descripción.
- Los servicios y secciones se recrean/recargan al cambiar el idioma (el idioma va en las dependencias de `useMemo`/`useEffect`).
- Textos fijos que hoy están en componentes (enlaces del menú, "Contact Us", etiquetas aria, tooltips, 404) pasan a un `ui.json` por idioma.
- Pruebas: detección (es-CO → es, fr → en, preferencia guardada gana) y respaldo de archivo faltante a inglés.
- Regla de arquitectura registrada en AGENTS.md; verificación en navegador con idioma es-CO y en-US.
