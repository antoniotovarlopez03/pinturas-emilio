'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const PARES = [
  {
    titulo: 'Pasillo industrial',
    antes: { archivo: 'antes-nave.jpg', alt: 'Pasillo antes de pintar, en obra' },
    despues: {
      archivo: 'nave-pasillo.jpg',
      alt: 'Pasillo ya pintado en blanco y azul',
    },
  },
  {
    titulo: 'Cuarto de baño',
    antes: { archivo: 'antes-bano.jpg', alt: 'Baño antes del acabado decorativo' },
    despues: {
      archivo: 'despues-bano.jpg',
      alt: 'Baño con el acabado decorativo terminado',
    },
  },
  {
    titulo: 'Fachada de vivienda',
    antes: { archivo: 'antes-villa-2.jpg', alt: 'Fachada a medio pintar' },
    despues: {
      archivo: 'despues-villa-2.jpg',
      alt: 'Fachada terminada, en color terracota',
    },
  },
  {
    titulo: 'Pared con papel tropical',
    // Estas dos vienen en horizontal (4:3), al revés que el resto: por eso
    // este par pide su propio aspecto en vez del 3/4 de los demás. Ocupa
    // fila completa (las 3 columnas) para salir grande y, sobre todo,
    // porque con solo 2 columnas dejaba un hueco vacío al lado de "Fachada
    // de vivienda" (3 pares sueltos + 1 que ocupa 2 columnas no encaja
    // limpio en una rejilla de 2). Con 3 columnas, los 3 primeros llenan la
    // fila entera y este empieza fila nueva sin dejar ningún hueco.
    aspecto: 'aspect-[4/3]',
    ancho: 'sm:col-span-3',
    antes: { archivo: 'antes-papel-tropical.jpg', alt: 'Pared curva antes de empapelar, en liso' },
    despues: {
      archivo: 'despues-papel-tropical.jpg',
      alt: 'Pared curva con papel pintado de hojas tropicales',
    },
  },
];

/** Los 6 pares aplanados en una sola lista, para que las flechas del visor
 *  puedan pasar de una foto a la siguiente sin importar de qué par sea. */
const FOTOS = PARES.flatMap((par) => [
  { ...par.antes, etiqueta: 'Antes', titulo: par.titulo },
  { ...par.despues, etiqueta: 'Después', titulo: par.titulo },
]);

function Foto({
  archivo,
  alt,
  etiqueta,
  aspecto = 'aspect-[3/4]',
  onClick,
}: {
  archivo: string;
  alt: string;
  etiqueta: string;
  aspecto?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-lg text-left ${aspecto}`}
    >
      <Image
        src={`/images/trabajos/${archivo}`}
        alt={alt}
        fill
        sizes="(min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute top-2 left-2 rounded-sm bg-fondo/80 px-2 py-1 text-xs font-medium text-texto uppercase">
        {etiqueta}
      </span>
    </button>
  );
}

export function AntesDespues() {
  const [indice, setIndice] = useState<number | null>(null);
  const disparador = useRef<HTMLElement | null>(null);
  const contenedor = useRef<HTMLDivElement>(null);

  const abrir = useCallback((i: number, origen: HTMLElement) => {
    disparador.current = origen;
    setIndice(i);
  }, []);
  const cerrar = useCallback(() => setIndice(null), []);
  const mover = useCallback((paso: number) => {
    setIndice((actual) => {
      if (actual === null) return actual;
      return (actual + paso + FOTOS.length) % FOTOS.length;
    });
  }, []);

  useEffect(() => {
    if (indice === null) return;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    contenedor.current?.focus();
    return () => {
      document.body.style.overflow = overflowPrevio;
      disparador.current?.focus();
    };
  }, [indice]);

  const foto = indice === null ? null : FOTOS[indice]!;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl text-titulo sm:text-3xl">Antes y después</h2>
      <p className="mt-2 max-w-2xl text-texto/70">
        Trabajos reales, tal y como quedaron.
      </p>

      <div className="mt-8 grid gap-10 sm:grid-cols-3">
        {PARES.map((par, i) => (
          <div key={par.titulo} className={par.ancho}>
            <div className="grid grid-cols-2 gap-2">
              <Foto
                {...par.antes}
                aspecto={par.aspecto}
                etiqueta="Antes"
                onClick={(e) => abrir(i * 2, e.currentTarget)}
              />
              <Foto
                {...par.despues}
                aspecto={par.aspecto}
                etiqueta="Después"
                onClick={(e) => abrir(i * 2 + 1, e.currentTarget)}
              />
            </div>
            <p className="mt-3 text-sm font-medium text-texto">{par.titulo}</p>
          </div>
        ))}
      </div>

      {foto && (
        <div
          ref={contenedor}
          role="dialog"
          aria-modal="true"
          aria-label={`${foto.titulo}: foto en grande`}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') mover(1);
            if (e.key === 'ArrowLeft') mover(-1);
            if (e.key === 'Escape') cerrar();
          }}
          onClick={(e) => {
            if (e.target === contenedor.current) cerrar();
          }}
          className="fixed inset-0 z-50 flex flex-col bg-fondo/95 text-texto outline-none"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 p-4 sm:p-6">
            <p className="text-sm tracking-wide text-texto/70">
              {foto.titulo} · {foto.etiqueta}
            </p>
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-texto/30 hover:bg-texto/10"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center gap-2 px-4 pb-6 sm:gap-4 sm:px-6">
            <FlechaVisor direccion="anterior" onClick={() => mover(-1)} />
            <div className="relative h-full min-w-0 flex-1">
              <Image
                key={foto.archivo}
                src={`/images/trabajos/${foto.archivo}`}
                alt={foto.alt}
                fill
                sizes="90vw"
                priority
                className="object-contain"
              />
            </div>
            <FlechaVisor direccion="siguiente" onClick={() => mover(1)} />
          </div>
        </div>
      )}
    </section>
  );
}

function FlechaVisor({
  direccion,
  onClick,
}: {
  direccion: 'anterior' | 'siguiente';
  onClick: () => void;
}) {
  const anterior = direccion === 'anterior';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={anterior ? 'Foto anterior' : 'Foto siguiente'}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-texto/30 hover:bg-texto/10"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <path
          d={anterior ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
