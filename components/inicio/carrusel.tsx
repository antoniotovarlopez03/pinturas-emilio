'use client';

import Image from 'next/image';
import { useEffect, useState, useSyncExternalStore } from 'react';

const FOTOS = [
  { archivo: 'acabado-decorativo.jpg', alt: 'Papel pintado decorativo terminado' },
  { archivo: 'acabado-decorativo-2.jpg', alt: 'Salón con papel pintado decorativo, vista general' },
  { archivo: 'exterior-villa-2.jpg', alt: 'Fachada de vivienda en Granada, en obra' },
  { archivo: 'exterior-villa-3.jpg', alt: 'Fachada de vivienda terminada, en color terracota' },
  { archivo: 'instalacion-papel-tropical.jpg', alt: 'Instalando papel pintado de hojas tropicales' },
];

/** Segundos por foto, igual que en Arte y Cera: para que el "modo vídeo" se
 *  sienta con el mismo ritmo. */
const SEGUNDOS = 4.5;

export function Carrusel() {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);

  const reducirMovimiento = useSyncExternalStore(
    (avisar) => {
      const consulta = window.matchMedia('(prefers-reduced-motion: reduce)');
      consulta.addEventListener('change', avisar);
      return () => consulta.removeEventListener('change', avisar);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );

  const total = FOTOS.length;
  const enMarcha = !pausado && !reducirMovimiento;

  useEffect(() => {
    if (!enMarcha) return;
    const reloj = setInterval(() => setIndice((i) => (i + 1) % total), SEGUNDOS * 1000);
    return () => clearInterval(reloj);
  }, [enMarcha, total]);

  return (
    <div
      className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-lg bg-fondo lg:mx-0 lg:aspect-auto lg:h-full"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      {FOTOS.map((foto, i) => {
        const activa = i === indice;
        return (
          <Image
            key={foto.archivo}
            src={`/images/trabajos/${foto.archivo}`}
            alt={activa ? foto.alt : ''}
            fill
            priority={i === 0}
            aria-hidden={!activa}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain transition-opacity duration-700 ease-[var(--ease-suave)]"
            style={{
              opacity: activa ? 1 : 0,
              // Propiedades largas, no el atajo "animation": mezclarlo con
              // animationPlayState en el mismo objeto (que cambia en cada
              // render) es justo lo que React avisa que da fallos de estilo.
              animationName: activa && !reducirMovimiento ? 'deriva' : 'none',
              animationDuration: `${SEGUNDOS + 2}s`,
              animationTimingFunction: 'ease-out',
              animationFillMode: 'forwards',
              animationPlayState: enMarcha ? 'running' : 'paused',
            }}
          />
        );
      })}

      <div className="absolute inset-x-3 top-3 flex items-center gap-3">
        <ul role="list" className="flex flex-1 items-center gap-2">
          {FOTOS.map((foto, i) => (
            <li key={foto.archivo} className="flex-1">
              <button
                type="button"
                onClick={() => setIndice(i)}
                aria-label={`Ver la foto ${i + 1} de ${total}`}
                aria-current={i === indice}
                className="flex h-6 w-full items-center"
              >
                <span className="block h-[3px] w-full overflow-hidden rounded-full bg-texto/30">
                  <span
                    className="block h-full origin-left rounded-full bg-titulo"
                    style={
                      i < indice
                        ? { transform: 'scaleX(1)' }
                        : i === indice
                          ? {
                              animationName: 'progreso',
                              animationDuration: `${SEGUNDOS}s`,
                              animationTimingFunction: 'linear',
                              animationFillMode: 'forwards',
                              animationPlayState: enMarcha ? 'running' : 'paused',
                              transform: enMarcha ? undefined : 'scaleX(1)',
                            }
                          : { transform: 'scaleX(0)' }
                    }
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {!reducirMovimiento && (
          <button
            type="button"
            onClick={() => setPausado((v) => !v)}
            aria-label={pausado ? 'Reanudar el pase de fotos' : 'Pausar el pase de fotos'}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fondo/70 text-texto hover:bg-fondo/90"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              {pausado ? <path d="M8 5l11 7-11 7z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
