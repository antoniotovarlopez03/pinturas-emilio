import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { site } from '@/lib/site';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { BotonWhatsapp } from '@/components/layout/boton-whatsapp';
import { AvisoCookies } from '@/components/layout/aviso-cookies';
import './globals.css';

/* Fuentes servidas desde el propio dominio (next/font las descarga en build,
   no se piden a fonts.googleapis.com en cada visita). Playfair Display es una
   serif elegante para los títulos; Outfit, una sans limpia para el resto. */
const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--fuente-display',
  display: 'swap',
});

const sans = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--fuente-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.titulo,
    template: `%s · ${site.nombre}`,
  },
  description: site.descripcion,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: site.url,
    siteName: site.nombre,
    title: site.titulo,
    description: site.descripcion,
  },
  twitter: { card: 'summary_large_image' },
};

/* Google Tag Manager solo en la web publicada: ni en `npm run dev` ni en las
   previsualizaciones de Vercel, para no mezclar visitas de prueba. */
const conGtm =
  process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview';

/* Modo de consentimiento v2 de Google: todo denegado por defecto, y se
   declara ANTES de cargar GTM. Si el visitante ya aceptó en otra visita, se
   concede la analítica en el mismo momento para no perder la primera página
   vista. Al aceptar o rechazar en el aviso, lib/consentimiento.ts manda el
   `consent update` correspondiente. */
const consentimientoInicial = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
try {
  if (localStorage.getItem(${JSON.stringify(site.claveCookies)}) === 'aceptadas') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
`;

/* Fragmento oficial de GTM, sin el <script> que lo envuelve. */
const fragmentoGtm = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(site.gtmId)});
`;

export default function RaizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      {conGtm && (
        <head>
          <Script id="consentimiento-google" strategy="beforeInteractive">
            {consentimientoInicial}
          </Script>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {fragmentoGtm}
          </Script>
        </head>
      )}
      <body className="flex min-h-screen flex-col">
        {conGtm && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <BotonWhatsapp />
        <AvisoCookies />
        <Analytics />
      </body>
    </html>
  );
}
