import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/**
 * Vercel también sirve cada despliegue en su propio *.vercel.app: sin esto,
 * Google podría indexar esa copia además del dominio real. Solo se permite
 * rastrear cuando la variable SITIO_PUBLICO=1 está puesta en Vercel, que se
 * añade únicamente en el dominio de producción.
 */
export default function robots(): MetadataRoute.Robots {
  const esElSitioDefinitivo = process.env.SITIO_PUBLICO === '1';

  if (!esElSitioDefinitivo) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
