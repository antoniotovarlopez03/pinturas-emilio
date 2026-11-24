/**
 * Eventos propios para medir los contactos.
 *
 * Cada evento se manda al dataLayer (GTM decide si lo envía a GA4; solo con
 * la analítica aceptada, por el modo de consentimiento) y a Clarity como
 * evento personalizado (solo existe si se aceptaron las cookies), para poder
 * filtrar las grabaciones de quien acabó escribiendo.
 *
 * Eventos:
 *  - clic_whatsapp   · cualquier enlace a wa.me
 *  - clic_email      · cualquier enlace mailto:
 *  - clic_telefono   · cualquier enlace tel:
 *  - formulario_enviado / formulario_error · formulario de /contacto
 *
 * Parámetros: `ubicacion` (cabecera, pie, boton-flotante o contenido) y
 * `pagina` (ruta donde ocurrió).
 */

type Datos = Record<string, string | number | undefined>;

export function medir(evento: string, datos: Datos = {}) {
  if (typeof window === 'undefined') return;
  const w = window as Window & {
    dataLayer?: unknown[];
    clarity?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: evento, pagina: window.location.pathname, ...datos });
  w.clarity?.('event', evento);
}

/** Tipo de contacto según el enlace, o null si no es de contacto. */
export function tipoContacto(href: string): string | null {
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) return 'clic_whatsapp';
  if (href.startsWith('mailto:')) return 'clic_email';
  if (href.startsWith('tel:')) return 'clic_telefono';
  return null;
}

/** Zona de la página donde está el enlace. */
export function ubicacionDe(el: Element): string {
  const marcada = el.closest<HTMLElement>('[data-ubicacion]');
  if (marcada?.dataset.ubicacion) return marcada.dataset.ubicacion;
  if (el.closest('header')) return 'cabecera';
  if (el.closest('footer')) return 'pie';
  return 'contenido';
}
