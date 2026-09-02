import Link from 'next/link';
import { whatsappUrl } from '@/lib/site';

export default function NoEncontrada() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <p className="text-5xl font-bold text-texto/20">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-titulo">
        Esta página no existe
      </h1>
      <p className="mt-4 text-texto/70">
        Puede que el enlace esté mal escrito. Prueba desde aquí:
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-sm bg-titulo px-6 py-3 font-medium text-fondo transition-opacity hover:opacity-90"
        >
          Volver al inicio
        </Link>
        <a
          href={whatsappUrl('Hola, quería pedir presupuesto')}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm border border-texto/20 px-6 py-3 font-medium text-texto transition-colors hover:border-titulo hover:text-titulo"
        >
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  );
}
