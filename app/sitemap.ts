import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/sobre-nosotros`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${site.url}/contacto`, changeFrequency: 'yearly', priority: 0.7 },
  ];
}
