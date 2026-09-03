import type { Metadata } from 'next';
import { FormularioContacto } from './formulario';
import { site, whatsappUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Escríbenos y te contamos cómo abordamos tu proyecto de pintura o reparación en ${site.zona}.`,
};

export default function PaginaContacto() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-12 rounded-lg border border-texto/10 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-sm font-medium tracking-wide text-titulo uppercase">Hablemos</p>
          <h1 className="mt-3 text-4xl font-semibold text-titulo sm:text-5xl">
            ¿Tienes algo que pintar?
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-texto/80">
            Cuéntanos qué necesitas y te decimos cómo lo haríamos, sin compromiso.
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <a
                href={whatsappUrl('Hola, os escribo desde la web de Pinturas Emilio.')}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 text-texto hover:text-titulo"
              >
                <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5 fill-current">
                  <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.34.66 4.523 1.804 6.383L4 29l7.83-1.77A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818a9.78 9.78 0 0 1-5.02-1.379l-.36-.213-4.65 1.05 1.08-4.53-.235-.372A9.77 9.77 0 0 1 5.2 15c0-5.965 4.85-10.818 10.804-10.818S26.8 9.035 26.8 15 21.958 24.818 16.004 24.818Zm5.6-7.42c-.307-.154-1.816-.897-2.098-1-.281-.103-.486-.154-.69.154-.204.307-.79 1-.97 1.205-.178.205-.357.23-.664.077-.307-.154-1.296-.478-2.469-1.523-.913-.814-1.53-1.82-1.708-2.128-.178-.307-.019-.473.135-.626.138-.138.307-.358.46-.537.154-.18.205-.307.307-.512.103-.205.052-.384-.026-.538-.077-.154-.69-1.663-.946-2.278-.249-.599-.502-.518-.69-.528l-.588-.01c-.204 0-.537.077-.818.384-.281.307-1.073 1.05-1.073 2.558 0 1.51 1.099 2.968 1.252 3.173.153.205 2.163 3.303 5.24 4.632.732.316 1.303.505 1.748.646.734.234 1.403.2 1.932.121.589-.088 1.816-.742 2.072-1.46.256-.717.256-1.332.18-1.46-.077-.128-.281-.205-.588-.359Z" />
                </svg>
                {site.whatsappVisible}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-texto hover:text-titulo"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M4 6h16v12H4z" strokeLinejoin="round" />
                  <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {site.email}
              </a>
            </li>
          </ul>

          <p className="mt-8 text-sm text-texto/70">{site.zona}</p>
        </div>

        <div className="rounded-lg border border-texto/10 bg-fondo p-6 sm:p-8">
          <FormularioContacto />
        </div>
      </div>
    </div>
  );
}
