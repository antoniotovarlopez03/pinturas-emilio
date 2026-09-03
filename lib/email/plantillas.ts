import type { DatosFormulario } from '@/lib/contacto';
import { site, whatsappUrl } from '@/lib/site';

/** URL absoluta para las imágenes del correo (los clientes de correo cargan
 *  las imágenes desde fuera de la web, así que no valen rutas relativas). */
function urlImagenCorreo(ruta: string): string {
  return new URL(ruta, site.url).toString();
}

/* ============================================================
   Plantillas de email en HTML, con la misma identidad que la web: solo
   --color-fondo (marrón oscuro) y --color-titulo/--color-texto (el mismo
   tono cálido), sin colores nuevos.

   Todo con tablas y estilos en línea porque es lo único que Outlook de
   escritorio soporta de verdad: no lee <style> de forma fiable ni
   flexbox/grid.
   ============================================================ */

const COLOR = {
  fondo: '#250902',
  fondoSuave: '#3c2815',
  texto: '#d4a373',
} as const;

/** Nunca se interpola texto de quien rellena el formulario sin pasar por
 *  aquí: es HTML de verdad, no texto plano, así que sin escapar esto sería
 *  una inyección de HTML abierta a cualquiera que rellene el formulario. */
function escaparHtml(valor: string): string {
  return valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Igual que escaparHtml, pero conservando los saltos de línea del mensaje
 *  (un <textarea> los tiene; un <div> los ignora si no se convierten). */
function escaparHtmlConSaltos(valor: string): string {
  return escaparHtml(valor).replace(/\n/g, '<br>');
}

function cabecera(): string {
  const logo = urlImagenCorreo('/images/logo-transparente.png');
  return `
  <tr>
    <td bgcolor="${COLOR.fondo}" style="background-color:${COLOR.fondo};border-radius:16px 16px 0 0;padding:36px 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center">
            <img src="${logo}" width="72" height="72" alt="Pinturas Emilio" style="display:block;margin:0 auto;border:0;">
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}

function pie(): string {
  return `
  <tr>
    <td bgcolor="${COLOR.fondo}" style="background-color:${COLOR.fondo};border-radius:0 0 16px 16px;padding:32px 40px;text-align:center;">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;color:${COLOR.texto};margin:0 0 10px;">Pinturas Emilio</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:2;color:${COLOR.texto}bf;">
        <a href="mailto:${site.email}" style="color:${COLOR.texto};text-decoration:none;">${site.email}</a>
        &nbsp;·&nbsp;
        <a href="${site.url}" style="color:${COLOR.texto};text-decoration:none;">pinturasgranadaemilio.es</a>
        &nbsp;·&nbsp;
        <a href="${whatsappUrl()}" style="color:${COLOR.texto};text-decoration:none;">WhatsApp</a>
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${COLOR.texto}73;margin-top:16px;">
        © ${new Date().getFullYear()} Pinturas Emilio. ${site.zona}.
      </div>
    </td>
  </tr>`;
}

function boton(texto: string, href: string): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center" bgcolor="${COLOR.texto}" style="background-color:${COLOR.texto};border-radius:999px;">
        <a href="${escaparHtml(href)}" target="_blank" style="display:inline-block;padding:14px 30px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:${COLOR.fondo};text-decoration:none;letter-spacing:0.02em;">
          ${escaparHtml(texto)}
        </a>
      </td>
    </tr>
  </table>`;
}

/** Una fila «etiqueta arriba, valor debajo», con una línea muy fina como
 *  separador. */
function filaDetalle(etiqueta: string, valorHtml: string, esUltima: boolean): string {
  return `
  <tr>
    <td style="padding:14px 0;${esUltima ? '' : `border-bottom:1px solid ${COLOR.texto}30;`}">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${COLOR.texto}99;">${escaparHtml(etiqueta)}</div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:${COLOR.texto};margin-top:4px;">${valorHtml}</div>
    </td>
  </tr>`;
}

function tarjetaFilas(filas: string): string {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${COLOR.texto}30;border-radius:14px;">
    <tr>
      <td style="padding:6px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${filas}
        </table>
      </td>
    </tr>
  </table>`;
}

function envoltura(preheader: string, contenido: string): string {
  return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
  body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
  body{margin:0;padding:0;width:100% !important;}
  @media screen and (max-width:600px){
    .contenedor{width:100% !important;}
    .pad-movil{padding-left:20px !important;padding-right:20px !important;}
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${COLOR.fondo};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escaparHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.fondo}" style="background-color:${COLOR.fondo};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <!--[if mso]>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td>
        <![endif]-->
        <table role="presentation" class="contenedor" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;border:1px solid ${COLOR.texto}20;border-radius:16px;">
          ${contenido}
        </table>
        <!--[if mso]>
        </td></tr></table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Email al cliente: confirma que su solicitud ha llegado y resume lo que
 *  ha contado. */
export function cuerpoHtmlConfirmacionCliente(datos: Omit<DatosFormulario, 'trampa'>): string {
  const filas: Array<[string, string]> = [
    ['Nombre', escaparHtml(datos.nombre)],
    ...(datos.telefono ? ([['Teléfono', escaparHtml(datos.telefono)]] as [string, string][]) : []),
    ['Correo electrónico', escaparHtml(datos.email)],
    ['Mensaje', escaparHtmlConSaltos(datos.mensaje)],
  ];
  const filasHtml = filas
    .map(([etiqueta, valor], i) => filaDetalle(etiqueta, valor, i === filas.length - 1))
    .join('');

  const contenido = `
  ${cabecera()}
  <tr>
    <td bgcolor="${COLOR.fondo}" class="pad-movil" style="background-color:${COLOR.fondo};padding:16px 40px 8px;">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.3;color:${COLOR.texto};margin:0 0 18px;text-align:center;">
        Gracias por contactar con Pinturas Emilio.
      </div>
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:${COLOR.texto}cc;margin:0 0 8px;">
        Hola ${escaparHtml(datos.nombre)}.
      </p>
      <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:${COLOR.texto}cc;margin:0;">
        Hemos recibido correctamente tu solicitud. Te contestamos en cuanto podamos para ayudarte con tu proyecto.
      </p>
    </td>
  </tr>
  <tr>
    <td bgcolor="${COLOR.fondo}" class="pad-movil" style="background-color:${COLOR.fondo};padding:24px 40px 8px;">
      ${tarjetaFilas(filasHtml)}
    </td>
  </tr>
  <tr>
    <td bgcolor="${COLOR.fondo}" class="pad-movil" style="background-color:${COLOR.fondo};padding:28px 40px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLOR.fondoSuave};border-radius:14px;">
        <tr>
          <td style="padding:28px 32px;text-align:center;">
            <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:${COLOR.texto};margin:0 0 18px;">
              Si tu consulta es urgente también puedes escribirnos directamente por WhatsApp.
            </p>
            ${boton('Hablar por WhatsApp', whatsappUrl(`Hola, os escribí desde la web (${datos.nombre}).`))}
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td bgcolor="${COLOR.fondo}" style="background-color:${COLOR.fondo};line-height:20px;font-size:0;">&nbsp;</td>
  </tr>
  ${pie()}`;

  return envoltura('Hemos recibido tu solicitud. Te contestamos en cuanto podamos.', contenido);
}

/** Email al negocio: avisa de una solicitud nueva, con el mensaje del
 *  cliente resaltado para que se distinga del resto de un vistazo. */
export function cuerpoHtmlNotificacionNegocio(
  datos: Omit<DatosFormulario, 'trampa'>,
  meta: { ip?: string; enviadoEn: Date },
): string {
  const fecha = meta.enviadoEn.toLocaleString('es-ES', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  });

  const filas: Array<[string, string]> = [
    ['Nombre', escaparHtml(datos.nombre)],
    ['Correo', escaparHtml(datos.email)],
    ...(datos.telefono ? ([['Teléfono', escaparHtml(datos.telefono)]] as [string, string][]) : []),
    ['Hora de envío', escaparHtml(fecha)],
  ];
  const filasHtml = filas
    .map(([etiqueta, valor], i) => filaDetalle(etiqueta, valor, i === filas.length - 1))
    .join('');

  const botones = [
    boton(
      'Responder por correo',
      `mailto:${datos.email}?subject=${encodeURIComponent('Re: tu solicitud en Pinturas Emilio')}`,
    ),
    datos.telefono
      ? boton(
          'WhatsApp',
          whatsappUrl(`Hola ${datos.nombre}, te escribimos desde Pinturas Emilio por tu solicitud.`),
        )
      : null,
  ]
    .filter((b): b is string => b !== null)
    .map((b) => `<tr><td style="padding-bottom:10px;">${b}</td></tr>`)
    .join('');

  const contenido = `
  ${cabecera()}
  <tr>
    <td bgcolor="${COLOR.fondo}" class="pad-movil" style="background-color:${COLOR.fondo};padding:16px 40px 8px;">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;color:${COLOR.texto};margin:0;text-align:center;">
        Ha llegado una nueva solicitud desde la web.
      </div>
    </td>
  </tr>
  <tr>
    <td bgcolor="${COLOR.fondo}" class="pad-movil" style="background-color:${COLOR.fondo};padding:24px 40px 8px;">
      ${tarjetaFilas(filasHtml)}
    </td>
  </tr>
  <tr>
    <td bgcolor="${COLOR.fondo}" class="pad-movil" style="background-color:${COLOR.fondo};padding:8px 40px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLOR.fondoSuave};border-radius:14px;">
        <tr>
          <td style="padding:24px 28px;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${COLOR.texto}99;margin:0 0 10px;">Mensaje</div>
            <div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.7;color:${COLOR.texto};">${escaparHtmlConSaltos(datos.mensaje)}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td bgcolor="${COLOR.fondo}" class="pad-movil" style="background-color:${COLOR.fondo};padding:24px 40px 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${botones}
      </table>
    </td>
  </tr>
  ${pie()}`;

  return envoltura(`Nueva solicitud de ${datos.nombre} desde la web.`, contenido);
}
