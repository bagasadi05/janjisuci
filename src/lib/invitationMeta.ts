/**
 * Server-safe helpers that build SEO / Open Graph metadata for invitation links.
 *
 * WhatsApp, Facebook and Telegram link-preview bots do NOT execute JavaScript,
 * so these tags must be rendered on the server (see app/page.tsx and
 * app/demo/[slug]/page.tsx). Do not import browser-only modules here.
 */
import { storeConfig, TemplateItem } from '../config/storeConfig'

const envSiteUrl =
  typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_SITE_URL
    ? (import.meta as { env?: Record<string, string> }).env!.VITE_SITE_URL
    : 'https://janjisuci.web.id'

export const SITE_URL = envSiteUrl.replace(/\/$/, '')
export const SITE_NAME = 'JanjiSuci.id'

const TEMPLATE_ALIASES: Record<string, string> = {
  midnight: 'royal-midnight',
  'midnight-aldian': 'royal-midnight',
  'luthfiana-hasyim': 'royal-midnight'
}

export function findTemplate(slugOrId?: string | null): TemplateItem | undefined {
  if (!slugOrId) return undefined
  const key = TEMPLATE_ALIASES[slugOrId] || slugOrId
  return storeConfig.templates.find((t) => t.slug === key || t.id === key)
}

/** Decodes a guest name from a query value without ever throwing on malformed % sequences. */
export function cleanGuestName(raw?: string | string[] | null): string | undefined {
  const value = Array.isArray(raw) ? raw[0] : raw
  if (!value) return undefined
  let decoded = value.replace(/\+/g, ' ')
  try {
    decoded = decodeURIComponent(decoded)
  } catch {
    // keep the raw value
  }
  const trimmed = decoded.replace(/\s+/g, ' ').trim().slice(0, 80)
  return trimmed || undefined
}

/** Human title of the celebration, e.g. "Pernikahan Bagus & Ayu" or "Khitanan Arkan". */
export function getEventTitle(template: TemplateItem): string {
  const couple = template.sampleCouple
  switch (template.eventType) {
    case 'khitan':
      return `Walimatul Khitan ${template.eventMeta?.primaryTitle || couple.groomShort}`
    case 'birthday':
      return `Ulang Tahun ${template.eventMeta?.primaryTitle || couple.groomShort}`
    case 'aqiqah':
      return `Aqiqah ${template.eventMeta?.primaryTitle || couple.groomShort}`
    case 'graduation':
      return `Wisuda ${template.eventMeta?.primaryTitle || couple.groomShort}`
    default:
      return `Pernikahan ${couple.groomShort} & ${couple.brideShort}`
  }
}

export function getEventDate(template: TemplateItem): string {
  return template.eventMeta?.dateText || template.sampleCouple.dateText
}

export interface InvitationMeta {
  title: string
  description: string
  ogImageUrl: string
  canonicalUrl: string
}

/** Metadata for an invitation link, personalised when a guest name is present. */
export function buildInvitationMeta(
  template: TemplateItem,
  guestName: string | undefined,
  canonicalPath: string
): InvitationMeta {
  const eventTitle = getEventTitle(template)
  const dateText = getEventDate(template)

  const title = guestName
    ? `Kepada Yth. ${guestName} — Undangan ${eventTitle}`
    : `Undangan ${eventTitle} 💍`

  const description = guestName
    ? `Tanpa mengurangi rasa hormat, kami mengundang ${guestName} untuk hadir di ${eventTitle} pada ${dateText}. Ketuk untuk membuka undangan.`
    : `Dengan penuh sukacita kami mengundang Anda di ${eventTitle} pada ${dateText}. Ketuk untuk membuka undangan digital.`

  const ogParams = new URLSearchParams({ template: template.slug })
  if (guestName) ogParams.set('to', guestName)

  return {
    title,
    description,
    ogImageUrl: `${SITE_URL}/api/og?${ogParams.toString()}`,
    canonicalUrl: `${SITE_URL}${canonicalPath}`
  }
}

