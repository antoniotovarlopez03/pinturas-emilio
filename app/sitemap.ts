import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { SERVICIOS } from '@/content/servicios';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: 'monthly', priority: 1 },
    ...SERVICIOS.map((servicio) => ({
      url: `${site.url}/servicios/${servicio.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    { url: `${site.url}/zonas`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/sobre-nosotros`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${site.url}/contacto`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${site.url}/cookies`, changeFrequency: 'yearly', priority: 0.1 },
  ];
}
