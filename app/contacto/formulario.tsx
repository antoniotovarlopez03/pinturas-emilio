'use client';

import { useActionState } from 'react';
import { enviarFormulario, type EstadoEnvio } from './acciones';
import { mailtoUrl, site, whatsappUrl } from '@/lib/site';

const INICIAL: EstadoEnvio = { estado: 'inicial' };

export function FormularioContacto() {
  const [estado, accion, enviando] = useActionState(enviarFormulario, INICIAL);

  if (estado.estado === 'ok') {
    return (
      <div className="rounded-lg border border-texto/20 p-8 text-center">
        <p className="text-2xl font-semibold text-titulo">Mensaje enviado</p>
        <p className="mt-3 text-texto/80">
          Gracias por escribirnos. Te contestamos al correo que nos has dejado en cuanto podamos.
        </p>
        <p className="mt-6 text-sm text-texto/70">
          Si tienes prisa, escríbenos también por WhatsApp al{' '}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener"
            className="text-titulo underline decoration-titulo/40 underline-offset-4"
          >
            {site.whatsappVisible}
          </a>
          .
        </p>
      </div>
    );
  }

  const errores = estado.estado === 'error' ? (estado.errores ?? {}) : {};

  return (
    <form action={accion} className="space-y-5" noValidate>
      {/* Aviso cuando el correo no está configurado: en vez de fingir que se
          ha enviado, se dice qué pasa y por dónde escribir. */}
      {estado.estado === 'sin-configurar' && (
        <div className="rounded-lg border border-texto/30 bg-fondo/60 p-4 text-sm">
          <p className="font-medium text-titulo">El envío por correo aún no está activado.</p>
          <p className="mt-1 text-texto/80">
            Tu mensaje no se ha enviado. Copia lo que has escrito y mándanoslo por WhatsApp o por
            correo; los dos llegan igual de bien.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={whatsappUrl('Hola, os escribo desde la web de Pinturas Emilio.')}
              target="_blank"
              rel="noopener"
              className="rounded-sm bg-titulo px-5 py-2.5 text-sm font-medium text-fondo transition-opacity hover:opacity-90"
            >
              WhatsApp
            </a>
            <a
              href={mailtoUrl('Consulta desde la web')}
              className="rounded-sm border border-texto/40 px-5 py-2.5 text-sm font-medium text-texto transition-colors hover:border-titulo hover:text-titulo"
            >
              {site.email}
            </a>
          </div>
        </div>
      )}

      {estado.estado === 'error' && (
        <p role="alert" className="rounded-lg border border-titulo/50 bg-fondo/60 p-4 text-sm font-medium text-titulo">
          {estado.mensaje}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo etiqueta="Nombre" nombre="nombre" error={errores.nombre} requerido />
        <Campo etiqueta="Email" nombre="email" tipo="email" error={errores.email} requerido />
      </div>

      <Campo etiqueta="Teléfono (opcional)" nombre="telefono" tipo="tel" error={errores.telefono} />

      <div>
        <label htmlFor="mensaje" className="block text-sm text-texto/80">
          Cuéntanos qué necesitas <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          aria-describedby={errores.mensaje ? 'error-mensaje' : undefined}
          aria-invalid={errores.mensaje ? true : undefined}
          className={
            'mt-1.5 w-full rounded-lg border bg-fondo px-4 py-3 text-texto ' +
            (errores.mensaje ? 'border-titulo' : 'border-texto/30')
          }
        />
        {errores.mensaje && (
          <p id="error-mensaje" className="mt-1.5 text-sm font-medium text-titulo">
            {errores.mensaje}
          </p>
        )}
      </div>

      {/* Campo trampa para robots: oculto para las personas, invisible
          también para los lectores de pantalla. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="trampa">No rellenar</label>
        <input id="trampa" name="trampa" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex gap-3 text-sm text-texto/80">
          <input
            type="checkbox"
            name="consentimiento"
            value="si"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-titulo"
          />
          <span>Acepto que Pinturas Emilio use mis datos para responderme.</span>
        </label>
        {errores.consentimiento && (
          <p className="mt-1.5 text-sm font-medium text-titulo">{errores.consentimiento}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-sm bg-titulo px-6 py-3 font-medium text-fondo transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {enviando ? 'Enviando…' : 'Enviar mensaje'}
      </button>

      <p className="text-center text-xs text-texto/70">
        También puedes escribirnos por WhatsApp al {site.whatsappVisible}.
      </p>
    </form>
  );
}

function Campo({
  etiqueta,
  nombre,
  tipo = 'text',
  error,
  requerido,
}: {
  etiqueta: string;
  nombre: string;
  tipo?: string;
  error?: string;
  requerido?: boolean;
}) {
  const idError = `error-${nombre}`;
  return (
    <div>
      <label htmlFor={nombre} className="block text-sm text-texto/80">
        {etiqueta} {requerido && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={nombre}
        name={nombre}
        type={tipo}
        required={requerido}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? idError : undefined}
        autoComplete={nombre === 'email' ? 'email' : nombre === 'telefono' ? 'tel' : 'name'}
        className={
          'mt-1.5 w-full rounded-lg border bg-fondo px-4 py-3 text-texto ' +
          (error ? 'border-titulo' : 'border-texto/30')
        }
      />
      {error && (
        <p id={idError} className="mt-1.5 text-sm font-medium text-titulo">
          {error}
        </p>
      )}
    </div>
  );
}
