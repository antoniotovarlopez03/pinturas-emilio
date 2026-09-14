import Image from 'next/image';
import Link from 'next/link';
import { site, whatsappUrl } from '@/lib/site';
import { SERVICIOS } from '@/content/servicios';
import { AntesDespues } from '@/components/inicio/antes-despues';
import { Carrusel } from '@/components/inicio/carrusel';

const VENTAJAS = [
  {
    linea1: 'Calidad',
    linea2: 'garantizada',
    icono: (
      <>
        <path d="M12 3 5 6v6c0 5 3.2 8.5 7 10 3.8-1.5 7-5 7-10V6z" />
        <path d="m9.5 12 1.8 1.8L14.8 10" />
      </>
    ),
  },
  {
    linea1: 'Materiales',
    linea2: 'de primera',
    icono: (
      <>
        <rect x="3" y="4" width="12" height="5" rx="1.5" />
        <path d="M9 9v4" />
        <rect x="6" y="13" width="6" height="7" rx="1" />
      </>
    ),
  },
  {
    linea1: 'Limpieza',
    linea2: 'y cuidado',
    icono: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </>
    ),
  },
  {
    linea1: 'Atención',
    linea2: 'cercana',
    icono: (
      <path d="M12 20.5s-7-4.4-7-9.6C5 7.9 7.1 6 9.5 6c1.4 0 2.5.8 2.5 2 0-1.2 1.1-2 2.5-2C16.9 6 19 7.9 19 10.9c0 5.2-7 9.6-7 9.6Z" />
    ),
  },
] as const;

export default function PaginaInicio() {
  return (
    <>
      <section className="border-b border-titulo/10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pt-20">
          <div>
            <p className="text-sm font-semibold tracking-widest text-acento uppercase">
              Pintores en {site.zona}
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-titulo sm:text-5xl lg:text-6xl">
              Pintura interior y <span className="text-acento">exterior</span> en
              Granada
            </h1>
            <p className="mt-5 max-w-md text-texto">
              Acabados impecables, con materiales de calidad y un trabajo
              limpio y responsable.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={whatsappUrl('Hola, quería pedir presupuesto')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-acento px-6 py-3 font-medium text-white transition-colors hover:bg-acento-oscuro"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <rect x="3" y="4" width="12" height="5" rx="1.5" />
                  <path d="M9 9v4" />
                  <rect x="6" y="13" width="6" height="7" rx="1" />
                </svg>
                Pide presupuesto sin compromiso
              </a>
              <Link
                href="#servicios"
                className="inline-flex items-center gap-2 rounded-full border border-titulo/20 px-6 py-3 font-medium text-titulo transition-colors hover:bg-titulo/5"
              >
                Ver servicios
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-fondo">
            <Image
              src="/images/emilio-retrato.png"
              alt="Emilio, pintor de Pinturas Emilio"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative z-10 -mt-10 grid grid-cols-2 gap-8 rounded-2xl bg-white p-8 shadow-xl shadow-titulo/5 ring-1 ring-titulo/5 sm:grid-cols-4 sm:gap-4 sm:divide-x sm:divide-titulo/10 lg:-mt-14">
          {VENTAJAS.map((ventaja) => (
            <div key={ventaja.linea1} className="flex flex-col items-center gap-2 text-center sm:px-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-acento)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-9 w-9"
                aria-hidden="true"
              >
                {ventaja.icono}
              </svg>
              <p className="text-sm font-semibold text-titulo">
                {ventaja.linea1}
                <br />
                {ventaja.linea2}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* "Servicios" ya no es una página aparte: repetía casi lo mismo que
          esta sección, con otro formato. Ahora es todo uno, con el ancla
          para que el enlace "Servicios" del menú apunte aquí. */}
      <section id="servicios" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
          <div>
            <h2 className="text-2xl font-semibold text-titulo sm:text-3xl">
              Reparamos y pintamos en Granada
            </h2>
            <p className="mt-2 max-w-2xl text-texto/70">
              Devolvemos la vida a tus paredes con experiencia, calidad y
              confianza. Presupuesto sin compromiso para tu casa o negocio en
              Granada y alrededores.
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

          <div className="relative">
            <Carrusel />
            <a
              href={whatsappUrl('Hola, quería pedir presupuesto')}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-titulo shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="#25D366" className="h-5 w-5" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.2.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2.9 2.4.1.2 1.6 2.5 4 3.4.6.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.4-.3Z" />
              </svg>
              WhatsApp
            </a>
          </div>
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
            className="shrink-0 rounded-full bg-acento px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-acento-oscuro"
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
          className="mt-6 inline-block rounded-full bg-acento px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-acento-oscuro"
        >
          WhatsApp: {site.whatsappVisible}
        </a>
      </section>
    </>
  );
}
