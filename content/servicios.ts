/**
 * Los tres servicios, con el texto que ya tenía Emilio en su web de
 * WordPress (pinturas-emilio.local). Es un borrador razonable, no dado por
 * cerrado: esa web viene de una plantilla ("Painter" de VWThemes) y no todo
 * el texto está confirmado como suyo, a diferencia del teléfono, el nombre
 * y la zona.
 *
 * Cada servicio tiene además su propia página (/servicios/[slug]) para que
 * Google lo encuentre con búsquedas concretas ("quitar gotelé Granada",
 * "pintor de fachadas Granada"...). `titulo` es el h1 de esa página y
 * `descripcion` lo que sale debajo del enlace en Google. El texto describe
 * cómo se trabaja, sin precios ni plazos que Emilio no haya dado.
 */
export const SERVICIOS = [
  {
    slug: 'reparacion-de-grietas-y-fisuras',
    nombre: 'Reparación de grietas y fisuras',
    resumen:
      'Reparamos grietas y fisuras en tus paredes con un acabado duradero y profesional.',
    titulo: 'Reparación de grietas y fisuras en Granada',
    descripcion:
      'Reparamos grietas y fisuras en paredes y techos en Granada y alrededores: abrimos, sellamos y pintamos para que no vuelvan a aparecer.',
    intro: [
      'Una grieta mal tapada vuelve a salir a los pocos meses. Por eso no nos limitamos a cubrirla con pintura: la abrimos, la limpiamos y la sellamos con el material adecuado antes de igualar la pared.',
      'Trabajamos en viviendas, comunidades y locales de Granada y su área metropolitana, tanto en interiores como en fachadas.',
    ],
    incluye: [
      'Revisión de la grieta para saber si es superficial o necesita otro tratamiento',
      'Apertura, limpieza y sellado de la fisura',
      'Malla o refuerzo cuando la grieta lo pide',
      'Enmasillado y lijado hasta dejar la superficie lisa',
      'Pintura de toda la pared para que no se note el arreglo',
    ],
    foto: { archivo: 'interior-techo.jpg', alt: 'Emilio pintando el techo de una vivienda' },
  },
  {
    slug: 'pintura-interior-y-exterior',
    nombre: 'Pintura interior y exterior',
    resumen:
      'Pintamos interiores y exteriores con materiales de calidad y acabados impecables.',
    titulo: 'Pintura de interiores y fachadas en Granada',
    descripcion:
      'Pintor en Granada para pisos, casas, fachadas y locales. Protegemos muebles y suelos, usamos pintura de calidad y dejamos todo limpio.',
    intro: [
      'Pintamos pisos, casas, comunidades y locales en Granada y alrededores: desde una habitación hasta la fachada entera.',
      'Antes de empezar protegemos suelos y muebles, preparamos bien las paredes y elegimos contigo el color y el tipo de pintura. Al terminar recogemos y limpiamos, para que solo notes el cambio.',
    ],
    incluye: [
      'Pintura de habitaciones, salones, cocinas, baños y techos',
      'Pintura de fachadas, patios, porches y muros exteriores',
      'Pintura de puertas, armarios y carpintería',
      'Protección de suelos y muebles durante el trabajo',
      'Limpieza completa al terminar',
    ],
    foto: { archivo: 'exterior-villa.jpg', alt: 'Fachada de una vivienda pintada por Pinturas Emilio' },
  },
  {
    slug: 'enmasillado-alisado-y-acabados',
    nombre: 'Enmasillado, alisado y acabados',
    resumen:
      'Enmasillado y alisado profesional para dejar tus paredes perfectas, con un trabajo limpio, responsable y garantizado.',
    titulo: 'Alisado de paredes y quitar gotelé en Granada',
    descripcion:
      'Quitamos el gotelé y alisamos paredes en Granada: enmasillado, lijado y pintura para dejarlas lisas y modernas. Presupuesto sin compromiso.',
    intro: [
      'El gotelé y las paredes con desperfectos hacen que una casa parezca más antigua. Las dejamos lisas, listas para pintar en el color que quieras.',
      'Es un trabajo de paciencia: varias manos de masilla, lijado y una buena imprimación antes de la pintura final. Lo hacemos protegiendo la casa y recogiendo el polvo cada día.',
    ],
    incluye: [
      'Quitar o tapar el gotelé, según el estado de la pared',
      'Enmasillado completo y lijado fino',
      'Reparación de golpes, agujeros y desconchones',
      'Imprimación y pintura final',
      'Acabados decorativos y papel pintado si lo prefieres',
    ],
    foto: { archivo: 'despues-armario.jpg', alt: 'Armario empotrado y pared pintados en blanco' },
  },
] as const;

export type Servicio = (typeof SERVICIOS)[number];

export function servicioPorSlug(slug: string): Servicio | undefined {
  return SERVICIOS.find((servicio) => servicio.slug === slug);
}
