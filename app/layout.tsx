import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import { site } from '@/lib/site';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { BotonWhatsapp } from '@/components/layout/boton-whatsapp';
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

export default function RaizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <BotonWhatsapp />
      </body>
    </html>
  );
}
