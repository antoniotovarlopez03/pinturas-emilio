'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

const ENLACES = [
  { href: '/', etiqueta: 'Inicio' },
  { href: '/#servicios', etiqueta: 'Servicios' },
  { href: '/sobre-nosotros', etiqueta: 'Sobre nosotros' },
  { href: '/contacto', etiqueta: 'Contacto' },
];

export function SiteHeader() {
  const ruta = usePathname();

  // "Servicios" no es una ruta propia, es un ancla dentro de "/": para
  // saber si está activa hace falta mirar el hash de la URL, que
  // usePathname() no incluye. Sin esto, "Inicio" se quedaba marcado como
  // activo aunque estuvieras viendo la sección de Servicios. El evento
  // "hashchange" no siempre salta con la navegación de Next (usa
  // history.pushState), así que el propio clic actualiza el hash al
  // vuelo y el listener queda solo como red de seguridad (atrás/adelante).
  const [hash, setHash] = useState('');
  useEffect(() => {
    const actualizar = () => setHash(window.location.hash);
    actualizar();
    window.addEventListener('hashchange', actualizar);
    window.addEventListener('popstate', actualizar);
    return () => {
      window.removeEventListener('hashchange', actualizar);
      window.removeEventListener('popstate', actualizar);
    };
  }, [ruta]);

  return (
    <header className="sticky top-0 z-40 border-b border-texto/10 bg-fondo text-texto">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/logo-nuevo-recortado.png"
            alt={site.nombre}
            width={154}
            height={112}
            priority
            className="h-16 w-auto"
          />
        </Link>

        <nav
          aria-label="Principal"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
        >
          {ENLACES.map((enlace) => {
            const esAncla = enlace.href.startsWith('/#');
            const activo = esAncla
              ? ruta === '/' && enlace.href === `/${hash}`
              : enlace.href === '/'
                ? ruta === '/' && hash === ''
                : ruta.startsWith(enlace.href);
            return (
              <Link
                key={enlace.href}
                href={enlace.href}
                onClick={() => setHash(esAncla ? enlace.href.slice(1) : '')}
                className={
                  'rounded-sm border-b-2 pb-0.5 transition-colors hover:text-titulo ' +
                  (activo ? 'border-acento text-titulo' : 'border-transparent')
                }
              >
                {enlace.etiqueta}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={site.enlaceResena}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-texto/20 px-4 py-2.5 text-sm font-medium text-texto transition-colors hover:border-titulo hover:text-titulo"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d="M12 2.5 14.7 9h6.8l-5.5 4.1L18.2 20 12 15.9 5.8 20l2.2-6.9L2.5 9h6.8Z" />
            </svg>
            Déjanos tu reseña
          </a>
          <Link
            href="/contacto"
            className="rounded-full bg-acento px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-acento-oscuro"
          >
            Pedir presupuesto
          </Link>
        </div>
      </div>
    </header>
  );
}
