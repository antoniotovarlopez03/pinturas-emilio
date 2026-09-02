/**
 * Los tres servicios, con el texto que ya tenía Emilio en su web de
 * WordPress (pinturas-emilio.local). Es un borrador razonable, no dado por
 * cerrado: esa web viene de una plantilla ("Painter" de VWThemes) y no todo
 * el texto está confirmado como suyo, a diferencia del teléfono, el nombre
 * y la zona.
 */
export const SERVICIOS = [
  {
    slug: 'reparacion-de-grietas-y-fisuras',
    nombre: 'Reparación de grietas y fisuras',
    resumen:
      'Reparamos grietas y fisuras en tus paredes con un acabado duradero y profesional.',
  },
  {
    slug: 'pintura-interior-y-exterior',
    nombre: 'Pintura interior y exterior',
    resumen:
      'Pintamos interiores y exteriores con materiales de calidad y acabados impecables.',
  },
  {
    slug: 'resane-alisado-y-acabados',
    nombre: 'Resane, alisado y acabados',
    resumen:
      'Resane y alisado profesional para dejar tus paredes perfectas, con un trabajo limpio, responsable y garantizado.',
  },
] as const;
