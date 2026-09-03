import Image from 'next/image';
import Link from 'next/link';
import { site, whatsappUrl } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-texto/10 bg-fondo text-texto">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="relative h-20 w-20">
            <Image
              src="/images/logo-transparente.png"
              alt={`Logotipo de ${site.nombre}`}
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-lg font-semibold text-titulo">{site.nombre}</p>
          <p className="mt-2 text-sm text-texto/70">
            Pintores profesionales en {site.zona}. Reparación de grietas,
            pintura interior y exterior, y acabados decorativos, con un
            trabajo limpio y garantizado.
          </p>
        </div>

        <nav aria-label="Pie de página" className="flex flex-col gap-2 text-sm">
          <Link href="/" className="hover:text-titulo">
            Inicio
          </Link>
          <Link href="/#servicios" className="hover:text-titulo">
            Servicios
          </Link>
          <Link href="/sobre-nosotros" className="hover:text-titulo">
            Sobre nosotros
          </Link>
          <Link href="/contacto" className="hover:text-titulo">
            Contacto
          </Link>
        </nav>

        <div className="text-sm">
          <p className="text-texto/70">{site.zona}</p>
          <a
            href={whatsappUrl('Hola, quería pedir presupuesto')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block font-medium text-titulo hover:underline"
          >
            WhatsApp: {site.whatsappVisible}
          </a>
          <a href={`mailto:${site.email}`} className="mt-1 block text-texto/70 hover:text-titulo">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
