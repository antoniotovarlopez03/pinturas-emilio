'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  EVENTO_REABRIR,
  cargarClarity,
  guardarEleccion,
  leerEleccion,
  retirarClarity,
  type Eleccion,
} from '@/lib/consentimiento';

const BOTON =
  'inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors';

/**
 * Aviso de cookies. Aparece solo si el visitante aún no ha elegido, y
 * «Aceptar» y «Rechazar» van al mismo nivel y del mismo tamaño: la AEPD no
 * admite que rechazar cueste más que aceptar.
 *
 * Arranca oculto y se decide en el cliente: en el servidor no hay
 * localStorage, y pintarlo siempre para esconderlo después daría un
 * parpadeo en cada página a quien ya eligió.
 */
export function AvisoCookies() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const eleccion = leerEleccion();
    if (eleccion === 'aceptadas') cargarClarity();
    // La elección vive en localStorage, que no existe en el servidor: no hay
    // forma de tenerla ya en el primer render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (eleccion === null) setVisible(true);

    const reabrir = () => setVisible(true);
    window.addEventListener(EVENTO_REABRIR, reabrir);
    return () => window.removeEventListener(EVENTO_REABRIR, reabrir);
  }, []);

  function elegir(eleccion: Eleccion) {
    const antes = leerEleccion();
    guardarEleccion(eleccion);
    setVisible(false);
    if (eleccion === 'aceptadas') cargarClarity();
    else if (antes === 'aceptadas') retirarClarity();
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-texto/15 bg-fondo p-5 text-sm text-texto shadow-xl sm:inset-x-auto sm:left-5 print:hidden"
    >
      <p className="font-display text-lg font-semibold text-titulo">¿Nos ayudas a mejorar la web?</p>
      <p className="mt-2 leading-relaxed">
        Con tu permiso usamos Microsoft Clarity para ver, de forma anónima, cómo se navega por la
        web (clics y desplazamiento) y así mejorarla. Si lo rechazas, la web funciona igual.{' '}
        <Link href="/cookies" className="text-titulo underline underline-offset-4">
          Más información
        </Link>
        .
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => elegir('rechazadas')}
          className={`${BOTON} border border-acento text-acento-oscuro hover:bg-acento-claro`}
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => elegir('aceptadas')}
          className={`${BOTON} bg-acento text-white hover:bg-acento-oscuro`}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}

/** Botón para la página de cookies: vuelve a abrir el aviso y permite
 *  cambiar de opinión en cualquier momento, como pide el RGPD (art. 7.3). */
export function BotonCambiarCookies() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENTO_REABRIR))}
      className={`${BOTON} mt-2 border border-acento text-acento-oscuro hover:bg-acento-claro`}
    >
      Cambiar mi elección de cookies
    </button>
  );
}
