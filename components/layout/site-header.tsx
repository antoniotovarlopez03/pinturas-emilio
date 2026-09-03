import Image from 'next/image';
import Link from 'next/link';
import { site, whatsappUrl } from '@/lib/site';

const ENLACES = [
  { href: '/', etiqueta: 'Inicio' },
  { href: '/#servicios', etiqueta: 'Servicios' },
  { href: '/sobre-nosotros', etiqueta: 'Sobre nosotros' },
  { href: '/contacto', etiqueta: 'Contacto' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-texto/10 bg-fondo text-texto">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-16 w-16 shrink-0 overflow-hidden">
            <Image
              src="/images/logo-transparente.png"
              alt=""
              fill
              sizes="64px"
              className="scale-150 object-cover"
            />
          </span>
          <span className="text-lg font-semibold tracking-wide">
            {site.nombre}
          </span>
        </Link>

        <nav
          aria-label="Principal"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
        >
          {ENLACES.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              className="rounded-sm transition-colors hover:text-titulo"
            >
              {enlace.etiqueta}
            </Link>
          ))}
        </nav>

        <a
          href={whatsappUrl('Hola, quería pedir presupuesto')}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm border border-titulo px-4 py-2 text-sm font-medium text-titulo transition-colors hover:bg-titulo hover:text-fondo"
        >
          Pedir presupuesto
        </a>
      </div>
    </header>
  );
}
