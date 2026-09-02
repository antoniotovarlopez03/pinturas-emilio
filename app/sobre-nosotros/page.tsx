import type { Metadata } from 'next';
import Image from 'next/image';
import { site } from '@/lib/site';
import { SOBRE_NOSOTROS } from '@/content/equipo';

export const metadata: Metadata = {
  title: 'Sobre nosotros',
  description: `Quién es ${site.nombre}, pintores en ${site.zona}.`,
};

export default function PaginaSobreNosotros() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      {/* "Sobre nosotros" no se repite en pantalla: ya está en el menú y en
          la pestaña del navegador, así que aquí sería redundante. El h1
          se queda solo para lectores de pantalla y buscadores.

          El texto va escrito sobre la foto de verdad, no en una tarjeta
          opaca encima: un degradado suave dimensiona la parte de abajo (la
          foto se sigue viendo a través), y la sombra de cada letra es la
          que garantiza que se lea pase lo que pase debajo. */}
      <h1 className="sr-only">Sobre nosotros</h1>

      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        <Image
          src="/images/trabajos/interior-techo.jpg"
          alt="Emilio pintando el techo de una vivienda"
          fill
          priority
          sizes="(min-width: 640px) 672px, 100vw"
          className="object-cover blur-[2px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-fondo/75 via-fondo/15 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 space-y-4 p-6 sm:p-8">
          {SOBRE_NOSOTROS.parrafos.map((parrafo) => (
            <p
              key={parrafo}
              className="leading-relaxed text-texto [text-shadow:0_1px_3px_var(--color-fondo),0_2px_16px_var(--color-fondo)]"
            >
              {parrafo}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
