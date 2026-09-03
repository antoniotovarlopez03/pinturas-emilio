import Image from 'next/image';
import Link from 'next/link';
import { site, whatsappUrl } from '@/lib/site';
import { SERVICIOS } from '@/content/servicios';
import { AntesDespues } from '@/components/inicio/antes-despues';
import { Carrusel } from '@/components/inicio/carrusel';

export default function PaginaInicio() {
  return (
    <>
      <section className="bg-fondo text-texto">
        {/* El corte a dos columnas empieza en md (768 px), no en lg: por
            debajo de eso, la foto a todo el ancho se ponía altísima (ancho
            completo × 4/3) y había que bajar mucho para llegar al suelo de
            la habitación. A partir de md la foto va a media anchura y la
            altura baja a algo razonable. */}
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="text-sm font-medium tracking-wide text-titulo uppercase">
              Pintores en {site.zona}
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-titulo sm:text-5xl">
              Pintura interior y exterior
            </h1>
            <p className="mt-4 max-w-xl text-texto/90">
              Acabados impecables, con materiales de calidad y un trabajo
              limpio y responsable.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappUrl('Hola, quería pedir presupuesto')}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-titulo px-6 py-3 font-medium text-fondo transition-opacity hover:opacity-90"
              >
                Pide presupuesto sin compromiso
              </a>
              <Link
                href="#servicios"
                className="rounded-sm border border-texto px-6 py-3 font-medium transition-colors hover:border-titulo hover:text-titulo"
              >
                Ver servicios
              </Link>
            </div>
          </div>

          <div className="relative aspect-[6/5] overflow-hidden rounded-lg">
            <Image
              src="/images/trabajos/portada.jpg"
              alt="Emilio pintando en lo alto de una escalera, bajo un techo de madera"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* "Servicios" ya no es una página aparte: repetía casi lo mismo que
          esta sección, con otro formato. Ahora es todo uno, con el ancla
          para que el enlace "Servicios" del menú apunte aquí. */}
      <section id="servicios" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
          <div>
            <h2 className="text-2xl font-semibold text-titulo sm:text-3xl">
              Reparamos y pintamos
            </h2>
            <p className="mt-2 max-w-2xl text-texto/70">
              Devolvemos la vida a tus paredes con experiencia, calidad y
              confianza.
            </p>

            <div className="mt-8 grid gap-6">
              {SERVICIOS.map((servicio) => (
                <div
                  key={servicio.slug}
                  className="rounded-lg border border-texto/10 p-6"
                >
                  <h3 className="font-semibold text-titulo">{servicio.nombre}</h3>
                  <p className="mt-2 text-sm text-texto/70">{servicio.resumen}</p>
                </div>
              ))}
            </div>
          </div>

          <Carrusel />
        </div>

        <div className="mt-10 flex flex-col items-start gap-6 rounded-lg border border-texto/10 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-titulo">¿Qué necesitas pintar?</h3>
            <p className="mt-1 text-texto/70">
              Cuéntanoslo por WhatsApp y te decimos cómo lo hacemos.
            </p>
          </div>
          <a
            href={whatsappUrl('Hola, quería pedir presupuesto')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-sm bg-titulo px-6 py-3 font-medium text-fondo transition-opacity hover:opacity-90"
          >
            Pide presupuesto sin compromiso
          </a>
        </div>
      </section>

      <AntesDespues />

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-semibold text-titulo sm:text-3xl">
          ¿Hablamos?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-texto/70">
          Escríbenos por WhatsApp y te respondemos enseguida.
        </p>
        <a
          href={whatsappUrl('Hola, quería pedir presupuesto')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-sm bg-titulo px-6 py-3 font-medium text-fondo transition-opacity hover:opacity-90"
        >
          WhatsApp: {site.whatsappVisible}
        </a>
      </section>
    </>
  );
}
