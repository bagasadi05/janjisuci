/**
 * Vercel Edge Function: Dynamic 1200x630 Open Graph Image Generator
 * Endpoint: /api/og?template=<slug>&to=<guestName>&couple=<customCouple>&format=<jpg|svg>
 *
 * - Default (for WhatsApp / Telegram / Facebook / Twitter link-preview crawlers):
 *   Streams a crisp 1200x630 raster JPEG (<200 KB) of the selected template cover
 *   directly from the origin domain with 24h CDN caching so WhatsApp never drops the preview.
 * - With `?format=svg`:
 *   Renders a luxury 1200x630 vector Open Graph card displaying the template theme,
 *   couple/event title, date, and personalized "Kepada Yth. [Nama Tamu]" badge.
 */
import { findTemplate, cleanGuestName, getEventTitle, getEventDate } from '../src/lib/invitationMeta'
import { storeConfig } from '../src/config/storeConfig'

export const config = {
  runtime: 'edge'
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toOgJpegUrl(rawUrl: string): string {
  try {
    const u = new URL(rawUrl)
    if (u.hostname.includes('unsplash.com')) {
      u.searchParams.set('auto', 'format')
      u.searchParams.set('fit', 'crop')
      u.searchParams.set('w', '1200')
      u.searchParams.set('h', '630')
      u.searchParams.set('q', '80')
      u.searchParams.set('fm', 'jpg')
      return u.toString()
    }
    return rawUrl
  } catch {
    return rawUrl
  }
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const slugParam = url.searchParams.get('template') || url.searchParams.get('slug') || 'botanical-sage'
  const guestName = cleanGuestName(url.searchParams.get('to') || url.searchParams.get('kpd'))
  const customCouple = cleanGuestName(url.searchParams.get('couple'))
  const format = (url.searchParams.get('format') || '').toLowerCase()

  const template = findTemplate(slugParam) || storeConfig.templates[0]
  const eventTitle = customCouple ? `Pernikahan ${customCouple}` : getEventTitle(template)
  const eventDate = getEventDate(template)
  const venueText = template.eventMeta?.venueText || template.sampleCouple.venueText

  // 1. Vector Card Mode (?format=svg) for interactive UI previews
  if (format === 'svg') {
    const accent = template.themeColors.accentHex || '#D4AF37'
    const guestLabel = guestName ? `Kepada Yth. ${guestName}` : 'Undangan Digital Eksklusif'

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c0a09" />
      <stop offset="55%" stop-color="#1c1917" />
      <stop offset="100%" stop-color="#09090b" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B48628" />
      <stop offset="50%" stop-color="#FBE69B" />
      <stop offset="100%" stop-color="${escapeXml(accent)}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect x="32" y="32" width="1136" height="566" rx="28" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-opacity="0.55" />
  <rect x="46" y="46" width="1108" height="538" rx="22" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.25" />

  <text x="600" y="135" text-anchor="middle" fill="#D4AF37" font-family="Georgia, serif" font-size="20" letter-spacing="6">
    JANJISUCI.ID • ${escapeXml(template.name.toUpperCase())}
  </text>

  <text x="600" y="265" text-anchor="middle" fill="#FFFFFF" font-family="Georgia, serif" font-weight="bold" font-size="64">
    ${escapeXml(eventTitle)}
  </text>

  <text x="600" y="330" text-anchor="middle" fill="#D6D3D1" font-family="sans-serif" font-size="26">
    ${escapeXml(eventDate)} • ${escapeXml(venueText.slice(0, 56))}
  </text>

  <rect x="250" y="395" width="700" height="110" rx="24" fill="#1C1917" stroke="url(#goldGrad)" stroke-width="1.5" />
  <text x="600" y="438" text-anchor="middle" fill="#FDE68A" font-family="sans-serif" font-size="18" letter-spacing="3">
    UNDANGAN SPESIAL
  </text>
  <text x="600" y="478" text-anchor="middle" fill="#FFFFFF" font-family="Georgia, serif" font-weight="bold" font-size="32">
    ${escapeXml(guestLabel)}
  </text>
</svg>`

    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400'
      }
    })
  }

  // 2. Raster JPEG Mode (Default for WhatsApp / Social Crawlers — strictly <300KB image/jpeg)
  const targetImageUrl = toOgJpegUrl(template.coverImage || template.thumbnail)
  try {
    const imgResponse = await fetch(targetImageUrl)
    if (imgResponse.ok && imgResponse.body) {
      return new Response(imgResponse.body, {
        status: 200,
        headers: {
          'Content-Type': imgResponse.headers.get('content-type') || 'image/jpeg',
          'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
        }
      })
    }
  } catch {
    // Fall through to 302 redirect
  }

  return Response.redirect(targetImageUrl, 302)
}

