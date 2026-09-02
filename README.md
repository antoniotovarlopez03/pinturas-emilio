# Pinturas Emilio

Web de Pinturas Emilio, pintor profesional en Granada y alrededores: portada, servicios, unas
fotos de trabajos reales y contacto directo por WhatsApp. No hay catálogo con precios ni
formulario por correo — a propósito, es una web de pocas páginas para generar contactos, no una
tienda.

Hecha con Next.js 16 (App Router), TypeScript y Tailwind 4.

---

## Estado actual

- Hay tres páginas: inicio (`app/page.tsx`), servicios (`app/servicios`) y sobre nosotros
  (`app/sobre-nosotros`). El contacto es siempre por WhatsApp, con el número centralizado en
  `lib/site.ts`.
- El texto de "Sobre nosotros" está pendiente de verdad (no había nada escrito, ni siquiera en la
  web de referencia). Mientras `content/equipo.ts` tenga `texto: null`, la página lo avisa en vez
  de mostrar un hueco en blanco.
- Los tres servicios (`content/servicios.ts`) son el texto que ya había en la web de WordPress de
  Emilio. Es un borrador razonable, pero esa web viene de una plantilla genérica ("Painter" de
  VWThemes), así que no está confirmado que sea la redacción definitiva.
- El logo es solo texto por ahora: hay varias propuestas en `public/images/` (`ChatGPT Image...`)
  sin elegir todavía.
- `scripts/generar-catalogo.mjs` y los comandos `catalogo:generar` / `media:recuperar` /
  `media:auditar` son del proyecto anterior (catálogo de velas + recuperación desde WordPress) y no
  se usan aquí. Se quedan de referencia, sin documentar como si funcionaran.
- `.env.example` sigue trayendo `RESEND_API_KEY` para un futuro formulario por correo, pero esta
  web todavía no tiene ninguno: de momento el único contacto es WhatsApp.

## Comandos

| Comando             | Para qué                                        |
| -------------------- | ------------------------------------------------ |
| `npm run dev`         | Levanta la web en local (http://localhost:3000) |
| `npm run build`       | Compila para producción                         |
| `npm run typecheck`   | Comprueba los tipos                             |
| `npm run lint`        | ESLint                                          |

## Estructura

```
app/
  page.tsx               inicio
  servicios/              los tres servicios
  sobre-nosotros/          quiénes son (texto pendiente)
components/
  layout/                 cabecera, pie, botón flotante de WhatsApp
  ui/                      aviso de texto pendiente
content/
  servicios.ts             los tres servicios (texto de la web de WordPress)
  equipo.ts                 texto de "sobre nosotros" (pendiente)
lib/
  site.ts                   nombre, WhatsApp, zona — un solo sitio para cambiarlo
public/images/
  trabajos/                 fotos reales usadas en la web (seis, elegidas a mano)
scripts/, tests/            heredados del proyecto anterior, no aplican aquí
```
