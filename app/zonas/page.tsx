import type { Metadata } from 'next';
import Link from 'next/link';
import { site, whatsappUrl } from '@/lib/site';
import { SERVICIOS } from '@/content/servicios';

/* Una sola página con todos los municipios, y no una por pueblo: páginas
   casi iguales cambiando solo el nombre ("Pintor en Armilla", "Pintor en
   Maracena"...) Google las trata como relleno y puede penalizar la web.
   Aquí cada municipio se nombra una vez, con contenido real alrededor. */
export const metadata: Metadata = {
  title: 'Pintor en Granada y área metropolitana',
  description: `Pintamos en Granada capital y en ${site.municipios.slice(1, 6).join(', ')} y el resto del área metropolitana. Presupuesto sin compromiso.`,
  alternates: { canonical: '/zonas' },
};

export default function PaginaZonas() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold tracking-widest text-acento uppercase">Zonas de trabajo</p>
      <h1 className="mt-4 text-4xl font-semibold text-titulo sm:text-5xl">
        Pintor en Granada y área metropolitana
      </h1>
      <p className="mt-5 max-w-2xl leading-relaxed text-texto">
        Trabajamos en Granada capital y en los pueblos de alrededor. Nos
        desplazamos para ver la obra y darte un presupuesto sin compromiso,
        y llevamos todo el material.
      </p>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {site.municipios.map((municipio) => (
          <li
            key={municipio}
            className="flex items-center gap-2 rounded-lg border border-texto/10 px-4 py-3 text-titulo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-acento)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
              <path d="M12 21s-6-5.3-6-10.5A6 6 0 0 1 18 10.5C18 15.7 12 21 12 21Z" />
              <circle cx="12" cy="10.5" r="2" />
            </svg>
            {municipio}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-texto/70">
        ¿Tu pueblo no está en la lista? Escríbenos igualmente y te decimos si llegamos.
      </p>

      <h2 className="mt-14 text-2xl font-semibold text-titulo sm:text-3xl">Qué hacemos en tu zona</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {SERVICIOS.map((servicio) => (
          <Link
            key={servicio.slug}
            href={`/servicios/${servicio.slug}`}
            className="rounded-lg border border-texto/10 p-6 transition-colors hover:border-acento"
          >
            <h3 className="font-semibold text-titulo">{servicio.titulo}</h3>
            <p className="mt-2 text-sm text-texto/70">{servicio.resumen}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start gap-6 rounded-lg border border-texto/10 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-titulo">¿Hablamos?</h2>
          <p className="mt-1 text-texto/70">Dinos qué necesitas y en qué municipio, y te respondemos enseguida.</p>
        </div>
        <a
          href={whatsappUrl('Hola, quería presupuesto. Estoy en ')}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-acento px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-acento-oscuro"
        >
          WhatsApp: {site.whatsappVisible}
        </a>
      </div>
    </div>
  );
}
