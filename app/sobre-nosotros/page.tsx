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

      {/* En pantallas anchas el texto cabe sobre el tercio de abajo de la
          foto (aspect-[3/4] fijo, texto anclado abajo). En móvil el mismo
          texto ocupa muchas más líneas: si se mantuviera la altura fija se
          cortaría por arriba, así que ahí el bloque de texto vuelve al flujo
          normal y es él quien decide la altura de la foto (que le sigue por
          detrás con object-cover, sin recortarse). */}
      <div className="relative overflow-hidden rounded-lg sm:aspect-[3/4]">
        <Image
          src="/images/trabajos/interior-techo.jpg"
          alt="Emilio pintando el techo de una vivienda"
          fill
          priority
          sizes="(min-width: 640px) 672px, 100vw"
          className="object-cover blur-[2px]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-fondo/55 sm:hidden" />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-t from-fondo/75 via-fondo/15 to-transparent sm:block"
        />
        <div className="relative space-y-4 p-6 sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-8">
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
