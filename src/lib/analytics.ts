/**
 * Unified analytics tracker for JanjiSuci.id
 *
 * Sends the same funnel event to every analytics provider that is configured:
 *  - Vercel Web Analytics (always on when deployed on Vercel; custom events need a Pro plan)
 *  - Google Analytics 4  (enabled when NEXT_PUBLIC_GA_ID is set)
 *  - Meta Pixel          (enabled when NEXT_PUBLIC_META_PIXEL_ID is set)
 *  - TikTok Pixel        (enabled when NEXT_PUBLIC_TIKTOK_PIXEL_ID is set)
 *
 * Calling track() is always safe: missing providers are silently skipped,
 * and it is a no-op during server rendering.
 */
import { track as vercelTrack } from '@vercel/analytics'

export type AnalyticsEvent =
  | 'view_template_demo' // buyer opens a template demo from the catalog
  | 'play_audio_preview' // buyer plays a song preview on a catalog card
  | 'open_gate' // invitation cover gate opened (guest or buyer)
  | 'start_order' // order modal opened
  | 'submit_order_wa' // order form submitted -> redirected to WhatsApp
  | 'contact_wa' // generic "chat admin" WhatsApp click
  | 'invitation_footer_click' // guest clicked "Buat undanganmu" in an invitation footer
  | 'copy_guest_link' // couple copied a personalised guest message
  | 'send_guest_wa' // couple sent a personalised guest message via WhatsApp
  | 'copy_demo_link' // buyer copied a demo link from the preview bar

export type AnalyticsProps = Record<string, string | number | boolean | null | undefined>

type Gtag = (command: 'event', name: string, params?: Record<string, unknown>) => void
type Fbq = (command: 'track' | 'trackCustom', name: string, params?: Record<string, unknown>) => void
type Ttq = { track: (name: string, params?: Record<string, unknown>) => void }

declare global {
  interface Window {
    gtag?: Gtag
    fbq?: Fbq
    ttq?: Ttq
  }
}

/** Map funnel events onto the standard events ad platforms optimise for. */
const META_STANDARD_EVENTS: Partial<Record<AnalyticsEvent, string>> = {
  view_template_demo: 'ViewContent',
  start_order: 'InitiateCheckout',
  submit_order_wa: 'Lead',
  contact_wa: 'Contact'
}

const TIKTOK_STANDARD_EVENTS: Partial<Record<AnalyticsEvent, string>> = {
  view_template_demo: 'ViewContent',
  start_order: 'InitiateCheckout',
  submit_order_wa: 'SubmitForm',
  contact_wa: 'Contact'
}

function cleanProps(props?: AnalyticsProps): Record<string, string | number | boolean | null> {
  const out: Record<string, string | number | boolean | null> = {}
  if (!props) return out
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) out[key] = value
  }
  return out
}

export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  if (typeof window === 'undefined') return
  const params = cleanProps(props)

  try {
    vercelTrack(event, params)
  } catch {
    // Vercel Analytics not available (e.g. local dev) — ignore
  }

  try {
    window.gtag?.('event', event, params)
  } catch {
    // ignore
  }

  try {
    const metaStandard = META_STANDARD_EVENTS[event]
    if (metaStandard) window.fbq?.('track', metaStandard, params)
    window.fbq?.('trackCustom', event, params)
  } catch {
    // ignore
  }

  try {
    window.ttq?.track(TIKTOK_STANDARD_EVENTS[event] || event, params)
  } catch {
    // ignore
  }
}

/** Reads ?ref= / UTM attribution once and keeps it for the session, so orders can be attributed. */
export function getAttribution(): { ref?: string; source?: string; campaign?: string } {
  if (typeof window === 'undefined') return {}
  const STORAGE_KEY = 'janjisuci_attribution'
  try {
    const params = new URLSearchParams(window.location.search)
    const fresh = {
      ref: params.get('ref') || undefined,
      source: params.get('utm_source') || undefined,
      campaign: params.get('utm_campaign') || undefined
    }
    if (fresh.ref || fresh.source || fresh.campaign) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
      return fresh
    }
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

