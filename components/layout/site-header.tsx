'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site, whatsappUrl } from '@/lib/site';

const ENLACES = [
  { href: '/', etiqueta: 'Inicio' },
  { href: '/#servicios', etiqueta: 'Servicios' },
  { href: '/sobre-nosotros', etiqueta: 'Sobre nosotros' },
  { href: '/contacto', etiqueta: 'Contacto' },
];

export function SiteHeader() {
  const ruta = usePathname();

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
            const activo = enlace.href === '/' ? ruta === '/' : ruta.startsWith(enlace.href);
            return (
              <Link
                key={enlace.href}
                href={enlace.href}
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

        <a
          href={whatsappUrl('Hola, quería pedir presupuesto')}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-acento px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-acento-oscuro"
        >
          Pedir presupuesto
        </a>
      </div>
    </header>
  );
}
