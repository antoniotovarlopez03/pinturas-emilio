/**
 * Datos del negocio en un solo sitio.
 * Si cambia un teléfono o un texto, se cambia aquí y se propaga a toda la web.
 */
export const site = {
  nombre: 'Pinturas Emilio',
  titulo: 'Pinturas Emilio · Pintor profesional en Granada',
  descripcion:
    'Pintura interior y exterior, reparación de grietas y fisuras, y acabados decorativos. Trabajo limpio y garantizado en Granada y alrededores.',

  // www, no el dominio pelado: el ápex redirige (308) a este en Vercel,
  // y esa es la URL de la que salen el canonical y el og:image.
  url: 'https://www.pinturasgranadaemilio.es',

  email: 'contacto@pinturasgranadaemilio.es',

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

/** mailto con asunto preparado, para quien no use WhatsApp. */
export function mailtoUrl(asunto: string): string {
  return `mailto:${site.email}?${new URLSearchParams({ subject: asunto }).toString()}`;
}
