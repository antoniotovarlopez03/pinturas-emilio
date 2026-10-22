import type { Metadata } from 'next';
import { BotonCambiarCookies } from '@/components/layout/aviso-cookies';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Cookies',
  description: 'Qué cookies usa esta web, para qué sirven y cómo cambiar tu elección.',
  alternates: { canonical: '/cookies' },
  robots: { index: false, follow: true },
};

export default function PaginaCookies() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-titulo">Cookies</h1>
      <p className="mt-3 text-sm text-texto/70">Última revisión: 22 de octubre de 2026.</p>

      <div className="mt-10 space-y-8 leading-relaxed text-texto [&_a]:text-titulo [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-titulo [&_li]:mt-1.5 [&_p+p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        <section>
          <h2>Solo una herramienta, y solo si aceptas</h2>
          <p>
            Esta web usa una única herramienta con cookies: <strong>Microsoft Clarity</strong>, que
            nos enseña de forma anónima cómo se navega por ella (dónde se hace clic, hasta dónde se
            baja en cada página) para poder mejorarla. No hay publicidad, ni Google Analytics, ni
            píxel de Meta.
          </p>
          <p>
            Clarity no se carga hasta que pulsas «Aceptar» en el aviso. Si lo rechazas, no se
            instala ninguna cookie y la web funciona exactamente igual.
          </p>
        </section>

        <section>
          <h2>Las cookies de Clarity</h2>
          <ul>
            <li>
              <strong>_clck</strong>: identifica de forma anónima al navegador para no contar dos
              veces la misma visita. Dura un año.
            </li>
            <li>
              <strong>_clsk</strong>: agrupa las páginas que ves en una misma visita. Dura un día.
            </li>
          </ul>
          <p>
            Las gestiona Microsoft Corporation, que puede tratar los datos fuera de la Unión Europea
            con las garantías del Marco de Privacidad de Datos UE-EE. UU. Clarity oculta
            automáticamente lo que escribes en los formularios. Más detalles en la{' '}
            <a href="https://privacy.microsoft.com/es-es/privacystatement" target="_blank" rel="noopener">
              declaración de privacidad de Microsoft
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Lo que no necesita tu permiso</h2>
          <p>
            Tu elección sobre las cookies se guarda en tu navegador (localStorage) para no volver a
            preguntarte en cada página, y nunca sale de tu dispositivo. Las visitas se cuentan además
            con Vercel Web Analytics, que no usa cookies ni identifica a nadie. El botón de WhatsApp
            es un enlace normal: no carga nada de WhatsApp hasta que lo pulsas.
          </p>
        </section>

        <section>
          <h2>Cambiar de opinión</h2>
          <p>Puedes aceptar o retirar tu permiso cuando quieras:</p>
          <BotonCambiarCookies />
        </section>

        <section>
          <h2>Dudas</h2>
          <p>
            Escríbenos a <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
