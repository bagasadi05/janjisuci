import { TemplateItem, CustomOrderData } from '../config/storeConfig'

/**
 * Safely decodes URI strings without throwing URIError on malformed % characters
 */
export function safeDecodeUri(val: string): string {
  try {
    return decodeURIComponent(val.replace(/\+/g, ' '))
  } catch {
    return val.replace(/\+/g, ' ')
  }
}

export interface SeoMetaOptions {
  template?: TemplateItem
  guestName?: string
  coupleName?: string
  eventTitle?: string
  dateText?: string
  venueText?: string
  customData?: CustomOrderData | null
  isStorefront?: boolean
}

/**
 * Utility to update or create HTML meta tags safely
 */
function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attributeName, attributeValue)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

/**
 * Updates dynamic browser title, Open Graph (WhatsApp, FB, Telegram),
 * Twitter Cards, Theme Color, and JSON-LD Event Schema
 */
export function updateDynamicMetaTags(options: SeoMetaOptions) {
  if (typeof document === 'undefined') return

  const {
    template,
    guestName,
    coupleName: propCoupleName,
    eventTitle,
    dateText: propDateText,
    venueText: propVenueText,
    customData,
    isStorefront = false
  } = options

  // Resolve dynamic names
  const coupleName =
    customData?.groomShortName && customData?.brideShortName
      ? `${customData.groomShortName} & ${customData.brideShortName}`
      : propCoupleName ||
        (template?.sampleCouple
          ? `${template.sampleCouple.groomShort} & ${template.sampleCouple.brideShort}`
          : 'Sarah & Dimas')

  const dateText =
    customData?.akadDate || propDateText || template?.sampleCouple?.dateText || '25 Desember 2025'
  const venueText =
    customData?.akadVenue || propVenueText || template?.sampleCouple?.venueText || 'Jakarta Convention Center'

  const effectiveEventTitle =
    eventTitle ||
    (template?.eventType && template.eventType !== 'wedding'
      ? template.eventMeta?.primaryTitle || template.name
      : `Pernikahan ${coupleName}`)

  // Fallback high-res 1200x630 wedding image for WhatsApp preview
  const previewImage =
    template?.coverImage ||
    template?.thumbnail ||
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&h=630&q=85'

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://janjisuci.web.id/'

  let pageTitle = ''
  let ogTitle = ''
  let ogDescription = ''

  if (isStorefront) {
    pageTitle = 'JanjiSuci.id — Platform Katalog Undangan Pernikahan Digital Premium'
    ogTitle = 'JanjiSuci.id 💍 — Platform Undangan Digital & Katalog Pernikahan Premium'
    ogDescription =
      'Wujudkan undangan online impianmu mulai Rp 75.000. Pilihan 18+ template tematik unik, pemutar musik Indonesia, RSVP real-time, kado digital, dan siap sebar via WhatsApp.'
  } else if (guestName && guestName.trim() !== '' && guestName !== 'Tamu Undangan') {
    pageTitle = `Undangan Spesial untuk ${guestName} 💍 | ${effectiveEventTitle}`
    ogTitle = `Kepada Yth. ${guestName} — Undangan ${effectiveEventTitle}`
    ogDescription = `Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i ${guestName} untuk menghadiri ${effectiveEventTitle} pada ${dateText} di ${venueText}. Klik untuk membuka undangan.`
  } else {
    pageTitle = `${effectiveEventTitle} — Undangan Digital ${template?.name || 'JanjiSuci.id'}`
    ogTitle = `The Wedding of ${coupleName} 💍 — Undangan Digital Eksklusif`
    ogDescription = `Kami mengundang Anda untuk merayakan momen bahagia ${effectiveEventTitle} pada ${dateText}. Buka undangan digital interaktif dan berikan doa restu.`
  }

  // 1. Update Document Title
  document.title = pageTitle

  // 2. Open Graph (WhatsApp, Facebook, Telegram, LinkedIn)
  setMetaTag('property', 'og:title', ogTitle)
  setMetaTag('property', 'og:description', ogDescription)
  setMetaTag('property', 'og:image', previewImage)
  setMetaTag('property', 'og:image:width', '1200')
  setMetaTag('property', 'og:image:height', '630')
  setMetaTag('property', 'og:image:type', 'image/jpeg')
  setMetaTag('property', 'og:url', currentUrl)
  setMetaTag('property', 'og:type', 'website')
  setMetaTag('property', 'og:site_name', 'JanjiSuci.id')
  setMetaTag('property', 'og:locale', 'id_ID')

  // 3. Twitter Card
  setMetaTag('name', 'twitter:card', 'summary_large_image')
  setMetaTag('name', 'twitter:title', ogTitle)
  setMetaTag('name', 'twitter:description', ogDescription)
  setMetaTag('name', 'twitter:image', previewImage)

  // 4. Standard Meta Description & Theme Color
  setMetaTag('name', 'description', ogDescription)
  if (template?.themeColors?.primaryBg) {
    setMetaTag('name', 'theme-color', template.themeColors.primaryBg)
  }

  // 5. Schema.org JSON-LD Structured Data
  let scriptEl = document.querySelector('script[type="application/ld+json"]#event-schema')
  if (!scriptEl) {
    scriptEl = document.createElement('script')
    scriptEl.setAttribute('type', 'application/ld+json')
    scriptEl.setAttribute('id', 'event-schema')
    document.head.appendChild(scriptEl)
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: effectiveEventTitle,
    description: ogDescription,
    image: [previewImage],
    startDate: dateText,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: venueText,
      address: {
        '@type': 'PostalAddress',
        addressLocality: venueText,
        addressCountry: 'ID'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'JanjiSuci.id',
      url: 'https://janjisuci.web.id'
    }
  }

  scriptEl.textContent = JSON.stringify(structuredData)
}
