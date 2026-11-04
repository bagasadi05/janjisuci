/**
 * Vercel Edge Function: Server-Rendered Open Graph & SEO Meta Injector
 *
 * WhatsApp, Telegram, Facebook, and Google link preview crawlers do not execute
 * client-side JavaScript. This Edge handler intercepts invitation links:
 *   - /?template=<slug>&to=<guestName>
 *   - /demo/<slug>
 *   - /u/<slug>
 * and injects dynamic `<title>`, `<meta property="og:*">`, `<meta name="twitter:*">`,
 * and JSON-LD Event structured data directly into the Vite `index.html` response.
 */
import {
  findTemplate,
  cleanGuestName,
  getEventTitle,
  getEventDate,
  SITE_URL,
  SITE_NAME
} from '../src/lib/invitationMeta'
import { storeConfig } from '../src/config/storeConfig'

export const config = {
  runtime: 'edge'
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const slugParam =
    url.searchParams.get('slug') ||
    url.searchParams.get('template') ||
    url.searchParams.get('tema')
  const rawGuest =
    url.searchParams.get('to') ||
    url.searchParams.get('kpd') ||
    url.searchParams.get('guest') ||
    url.searchParams.get('tamu')
  const customCouple = cleanGuestName(url.searchParams.get('couple'))
  const guestName = cleanGuestName(rawGuest)

  const matchedTemplate = findTemplate(slugParam) || (guestName ? storeConfig.templates[0] : undefined)

  // Fetch the built Vite index.html from the static asset layer
  const indexUrl = new URL('/index.html', url.origin)
  const staticRes = await fetch(indexUrl.toString())
  let html = await staticRes.text()

  if (!matchedTemplate) {
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=3600'
      }
    })
  }

  const eventTitle = customCouple ? `Pernikahan ${customCouple}` : getEventTitle(matchedTemplate)
  const dateText = getEventDate(matchedTemplate)
  const venueText = matchedTemplate.eventMeta?.venueText || matchedTemplate.sampleCouple.venueText

  const pageTitle = guestName
    ? `Undangan Spesial untuk ${guestName} 💍 — ${eventTitle}`
    : `${eventTitle} | ${matchedTemplate.name} — ${SITE_NAME}`

  const pageDescription = guestName
    ? `Kepada Yth. ${guestName}, tanpa mengurangi rasa hormat kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri ${eventTitle} pada ${dateText} bertempat di ${venueText}. Klik untuk membuka undangan digital.`
    : `Buka undangan digital interaktif ${eventTitle} (${dateText} • ${venueText}). Tema eksklusif ${matchedTemplate.name} oleh ${SITE_NAME}.`

  const ogParams = new URLSearchParams({ template: matchedTemplate.slug })
  if (guestName) ogParams.set('to', guestName)
  if (customCouple) ogParams.set('couple', customCouple)

  const ogImageUrl = `${SITE_URL}/api/og?${ogParams.toString()}`
  const canonicalUrl = slugParam && url.pathname.startsWith('/demo/')
    ? `${SITE_URL}/demo/${encodeURIComponent(matchedTemplate.slug)}`
    : `${SITE_URL}/?${ogParams.toString()}`

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: eventTitle,
    description: pageDescription,
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: venueText,
      address: venueText
    },
    image: [ogImageUrl],
    organizer: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    }
  })

  const safeTitle = escapeHtml(pageTitle)
  const safeDesc = escapeHtml(pageDescription)
  const safeImage = escapeHtml(ogImageUrl)
  const safeCanonical = escapeHtml(canonicalUrl)

  // Replace existing head tags with dynamic server-rendered Open Graph tags
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image" content="${safeImage}" />`
    )
    .replace(
      /<meta\s+property="og:image:secure_url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image:secure_url" content="${safeImage}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${safeCanonical}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:image" content="${safeImage}" />`
    )
    .replace(
      '</head>',
      `  <link rel="canonical" href="${safeCanonical}" />\n  <script type="application/ld+json">${jsonLd}</script>\n</head>`
    )

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}

