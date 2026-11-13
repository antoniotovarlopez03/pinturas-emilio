'use client';

import { site } from '@/lib/site';

/**
 * Consentimiento de cookies para Microsoft Clarity y Google Analytics (vía
 * Google Tag Manager).
 *
 * GTM se carga siempre en producción, pero con el modo de consentimiento de
 * Google en «denegado» (ver app/layout.tsx): mientras no se acepte, Google no
 * guarda cookies. Al aceptar se manda `consent update` con la analítica
 * concedida; la publicidad sigue denegada porque la web no tiene anuncios.
 *
 * Clarity graba cómo se mueve la gente por la web (clics, scroll, mapas de
 * calor) y deja cookies propias, así que la LSSI (art. 22.2) obliga a pedir
 * permiso ANTES de cargarlo. Por eso el script no va en el layout: solo se
 * inyecta cuando el visitante pulsa «Aceptar», y la decisión se guarda en
 * localStorage para no volver a preguntar en cada página.
 *
 * Además se manda a Clarity la señal de consentimiento (consentv2), que
 * Microsoft exige para las visitas del Espacio Económico Europeo.
 */

export type Eleccion = 'aceptadas' | 'rechazadas';

const CLAVE = site.claveCookies;

/** Evento propio para volver a abrir el aviso desde la página de cookies
 *  sin recargar («storage» no avisa a la propia pestaña). */
export const EVENTO_REABRIR = 'pinturas-emilio-cookies-reabrir';

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    clarity?: ClarityFn;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Avisa a Google Tag Manager de la elección. `gtag` solo existe en
 *  producción (lo define el script inicial del layout); en local no hace nada.
 *  Además se empuja un evento al dataLayer por si en GTM se quiere disparar
 *  algo justo al aceptar. */
export function actualizarGoogle(eleccion: Eleccion) {
  if (typeof window.gtag !== 'function') return;
  const estado = eleccion === 'aceptadas' ? 'granted' : 'denied';
  window.gtag('consent', 'update', { analytics_storage: estado });
  window.dataLayer?.push({ event: 'consentimiento_cookies', analitica: estado });
}

export function leerEleccion(): Eleccion | null {
  try {
    const valor = window.localStorage.getItem(CLAVE);
    return valor === 'aceptadas' || valor === 'rechazadas' ? valor : null;
  } catch {
    return null;
  }
}

export function guardarEleccion(eleccion: Eleccion) {
  try {
    window.localStorage.setItem(CLAVE, eleccion);
  } catch {
    // Navegación privada sin almacenamiento: se pregunta en cada visita.
  }
}

/** El fragmento oficial de Clarity, sin el <script> inline: cola de
 *  llamadas mientras carga y el tag asíncrono de su CDN. */
export function cargarClarity() {
  if (document.getElementById('clarity-tag')) return;

  const cola: ClarityFn = function (...args: unknown[]) {
    (cola.q = cola.q || []).push(args);
  };
  window.clarity = window.clarity || cola;

  const tag = document.createElement('script');
  tag.id = 'clarity-tag';
  tag.async = true;
  tag.src = `https://www.clarity.ms/tag/${site.clarityId}`;
  document.head.appendChild(tag);

  window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
}

/** Retirar el permiso: Clarity borra sus cookies y deja de grabar. */
export function retirarClarity() {
  window.clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
  window.clarity?.('consent', false);
}
