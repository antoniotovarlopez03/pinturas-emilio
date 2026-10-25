/**
 * Datos del negocio en un solo sitio.
 * Si cambia un teléfono o un texto, se cambia aquí y se propaga a toda la web.
 */
export const site = {
  nombre: 'Pinturas Emilio Parra',
  // Lo que sale en Google: empieza por la búsqueda ("pintor en Granada")
  // y cabe en ~60 caracteres para que no se corte en el móvil.
  titulo: 'Pintor en Granada · Presupuesto sin compromiso | Emilio Parra',
  descripcion:
    'Pintor en Granada y alrededores: pintura interior y de fachadas, alisado y quitar gotelé, y reparación de grietas. Trabajo limpio y presupuesto sin compromiso.',

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

  /**
   * Municipios de la página de zonas: los mismos, y en el mismo orden, que
   * la "Zona de servicio" de su Perfil de Empresa en Google (copiados el
   * 26/10/2026). Si se cambia allí, se cambia aquí: Google confía más en
   * un negocio cuando la web y la ficha dicen lo mismo.
   */
  municipios: [
    'Granada',
    'Cájar',
    'Alfacar',
    'Armilla',
    'Maracena',
    'Jun',
    'Loja',
    'Pulianillas',
    'Víznar',
    'La Zubia',
    'Peligros',
    'Santa Fe',
    'Ogíjares',
    'Las Gabias',
    'Los Olivos',
    'Güevéjar',
    'Salobreña',
    'Almuñécar',
    'Churriana de la Vega',
  ],

  /** Enlace directo al formulario de reseña de Google (Perfil de Empresa). */
  enlaceResena: 'https://g.page/r/Ce4OITvQ4rHjEBM/review',

  /** Proyecto de Microsoft Clarity. Solo se carga si el visitante acepta
   *  las cookies (ver lib/consentimiento.ts). */
  clarityId: 'z1rxdj564f',
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
