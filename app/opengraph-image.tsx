import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

/**
 * Imagen que se ve al compartir el enlace en WhatsApp, Instagram o Google.
 *
 * El logo va sobre un panel claro, no sobre el verde oscuro de la marca:
 * la tinta verde del logo nuevo casi no se distingue sobre un fondo también
 * verde. Mismo patrón de dos columnas que en Arte y Cera.
 */
export const alt = 'Pinturas Emilio · Pintor profesional en Granada';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Imagen() {
  const logo = await readFile(
    path.join(process.cwd(), 'public/images/logo-nuevo-recortado.png'),
  );
  const logoBase64 = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#47593f',
          color: '#f4f1e9',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '72px',
            width: '58%',
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: 'uppercase' }}>
            Pintor profesional en Granada
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.08, marginTop: 24 }}>
            Pintura interior y exterior
          </div>
          <div style={{ width: 96, height: 3, backgroundColor: '#f4f1e9', marginTop: 32 }} />
          <div style={{ fontSize: 27, color: '#f4f1e9', opacity: 0.85, marginTop: 32, lineHeight: 1.4 }}>
            Reparación de grietas y fisuras, y acabados decorativos. Trabajo
            limpio y garantizado.
          </div>
          <div style={{ fontSize: 24, color: '#f4f1e9', opacity: 0.7, marginTop: 40 }}>
            {site.url.replace('https://www.', '')}
          </div>
        </div>

        {/* Panel claro para que la tinta verde del logo tenga contraste de
            verdad al lado del verde oscuro de la izquierda. */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42%',
            height: '100%',
            backgroundColor: '#f4f1e9',
          }}
        >
          <img src={logoBase64} alt="" width={1058} height={767} style={{ width: 480, height: 348 }} />
        </div>
      </div>
    ),
    size,
  );
}
