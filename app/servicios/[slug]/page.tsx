import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site, whatsappUrl } from '@/lib/site';
import { SERVICIOS, servicioPorSlug } from '@/content/servicios';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICIOS.map((servicio) => ({ slug: servicio.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const servicio = servicioPorSlug((await params).slug);
  if (!servicio) return {};
  return {
    title: servicio.titulo,
    description: servicio.descripcion,
    alternates: { canonical: `/servicios/${servicio.slug}` },
    openGraph: { title: servicio.titulo, description: servicio.descripcion },
  };
}

export default async function PaginaServicio({ params }: Props) {
  const servicio = servicioPorSlug((await params).slug);
  if (!servicio) notFound();

  const otros = SERVICIOS.filter((otro) => otro.slug !== servicio.slug);

  // Le dice a Google qué servicio es, quién lo hace y dónde, para que lo
  // relacione con búsquedas locales ("... en Granada").
  const datosGoogle = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: servicio.titulo,
    description: servicio.descripcion,
    url: `${site.url}/servicios/${servicio.slug}`,
    areaServed: site.municipios.map((municipio) => ({ '@type': 'City', name: municipio })),
    provider: {
      '@type': 'HousePainter',
      name: site.nombre,
      url: site.url,
      telephone: `+${site.whatsapp}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosGoogle) }}
      />

      <section className="border-b border-titulo/10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <div>
            <p className="text-sm font-semibold tracking-widest text-acento uppercase">
              Pintores en {site.zona}
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-titulo sm:text-5xl">
              {servicio.titulo}
            </h1>
            {servicio.intro.map((parrafo) => (
              <p key={parrafo} className="mt-5 max-w-xl leading-relaxed text-texto">
                {parrafo}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full bg-acento px-6 py-3 font-medium text-white transition-colors hover:bg-acento-oscuro"
              >
                Pide presupuesto sin compromiso
              </Link>
              <a
                href={whatsappUrl(`Hola, quería presupuesto para ${servicio.nombre.toLowerCase()}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-titulo/20 px-6 py-3 font-medium text-titulo transition-colors hover:bg-titulo/5"
              >
                WhatsApp: {site.whatsappVisible}
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-fondo">
            <Image
              src={`/images/trabajos/${servicio.foto.archivo}`}
              alt={servicio.foto.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-titulo sm:text-3xl">Qué incluye</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {servicio.incluye.map((punto) => (
            <li key={punto} className="flex gap-3 rounded-lg border border-texto/10 p-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-acento)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true">
                <path d="m5 12 4 4 10-10" />
              </svg>
              <span className="text-texto">{punto}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-lg border border-texto/10 p-8">
          <h2 className="text-xl font-semibold text-titulo">Dónde trabajamos</h2>
          <p className="mt-2 text-texto/70">
            {servicio.nombre} en {site.municipios.join(', ')}.{' '}
            <Link href="/zonas" className="font-medium text-acento hover:underline">
              Ver todas las zonas
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-titulo/10 bg-acento-claro/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold text-titulo sm:text-3xl">Otros servicios</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {otros.map((otro) => (
              <Link
                key={otro.slug}
                href={`/servicios/${otro.slug}`}
                className="rounded-lg border border-texto/10 bg-white p-6 transition-colors hover:border-acento"
              >
                <h3 className="font-semibold text-titulo">{otro.titulo}</h3>
                <p className="mt-2 text-sm text-texto/70">{otro.resumen}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
