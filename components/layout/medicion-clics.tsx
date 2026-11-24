'use client';

import { useEffect } from 'react';
import { medir, tipoContacto, ubicacionDe } from '@/lib/medicion';

/** Escucha los clics de toda la web y mide los enlaces de contacto
 *  (WhatsApp, correo, teléfono) sin tener que tocar cada botón. */
export function MedicionClics() {
  useEffect(() => {
    function alClicar(e: MouseEvent) {
      const enlace = (e.target as Element | null)?.closest?.('a[href]');
      if (!enlace) return;
      const href = enlace.getAttribute('href') ?? '';
      const evento = tipoContacto(href);
      if (!evento) return;
      medir(evento, {
        ubicacion: ubicacionDe(enlace),
        texto_enlace: (enlace.textContent ?? '').trim().slice(0, 60) || undefined,
      });
    }
    // Captura: se registra aunque el enlace abra otra pestaña o app.
    document.addEventListener('click', alClicar, true);
    return () => document.removeEventListener('click', alClicar, true);
  }, []);

  return null;
}
