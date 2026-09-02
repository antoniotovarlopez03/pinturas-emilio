/**
 * Datos del negocio en un solo sitio.
 * Si cambia un teléfono o un texto, se cambia aquí y se propaga a toda la web.
 */
export const site = {
  nombre: 'Pinturas Emilio',
  titulo: 'Pinturas Emilio · Pintor profesional en Granada',
  descripcion:
    'Pintura interior y exterior, reparación de grietas y fisuras, y acabados decorativos. Trabajo limpio y garantizado en Granada y alrededores.',

  // Todavía no hay dominio propio ni web publicada de verdad: esto es un
  // marcador mientras se despliega, igual que arte-y-cera.vercel.app lo fue
  // para ese proyecto antes de arteycera.es. Cambiar en cuanto haya dominio.
  url: 'https://pinturas-emilio.vercel.app',

  /**
   * Solo dígitos, como lo quiere wa.me. Confirmado con la ropa de trabajo
   * de las fotos (se lee "697 57 99 82" en la sudadera), que coincide con
   * el que había en el pie de la web de WordPress. Uno de los logos en
   * pruebas llevaba "697 57 98 42": ese es el que está mal.
   */
  whatsapp: '34697579982',
  whatsappVisible: '697 579 982',

  zona: 'Granada y alrededores',
} as const;

/**
 * Enlace de WhatsApp con el mensaje ya redactado, para no dejar a quien
 * escribe empezando de cero.
 */
export function whatsappUrl(mensaje?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}
