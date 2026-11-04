import React, { Suspense, lazy, useRef } from 'react'
import { TemplateItem } from '../config/storeConfig'
import { useAutoScrollReveal3D } from '../components/common/Reveal3D'
import { ViralStudioAttribution } from '../components/FooterSection'
import type { TemplateViewProps } from './botanical-sage/BotanicalSageTemplate'

// Lazy-load every template so each guest or buyer only downloads the active template (~20-45 KB)
// instead of all 19 templates at once.
const BotanicalSageTemplate = lazy(() =>
  import('./botanical-sage/BotanicalSageTemplate').then((m) => ({ default: m.BotanicalSageTemplate }))
)
const RoyalJavaTemplate = lazy(() =>
  import('./royal-java/RoyalJavaTemplate').then((m) => ({ default: m.RoyalJavaTemplate }))
)
const LuxuryChampagneTemplate = lazy(() =>
  import('./luxury-champagne/LuxuryChampagneTemplate').then((m) => ({ default: m.LuxuryChampagneTemplate }))
)
const CelestialNightTemplate = lazy(() =>
  import('./celestial-night/CelestialNightTemplate').then((m) => ({ default: m.CelestialNightTemplate }))
)
const RusticTerracottaTemplate = lazy(() =>
  import('./rustic-terracotta/RusticTerracottaTemplate').then((m) => ({ default: m.RusticTerracottaTemplate }))
)
const BlushPeonyTemplate = lazy(() =>
  import('./blush-peony/BlushPeonyTemplate').then((m) => ({ default: m.BlushPeonyTemplate }))
)
const RoyalMidnightTemplate = lazy(() =>
  import('./royal-midnight/RoyalMidnightTemplate').then((m) => ({ default: m.RoyalMidnightTemplate }))
)
const ExclusiveNavyTemplate = lazy(() =>
  import('./exclusive-navy/ExclusiveNavyTemplate').then((m) => ({ default: m.ExclusiveNavyTemplate }))
)
const RoyalKhitanTemplate = lazy(() =>
  import('./royal-khitan/RoyalKhitanTemplate').then((m) => ({ default: m.RoyalKhitanTemplate }))
)
const ConfettiBirthdayTemplate = lazy(() =>
  import('./confetti-birthday/ConfettiBirthdayTemplate').then((m) => ({ default: m.ConfettiBirthdayTemplate }))
)
const LittleStarAqiqahTemplate = lazy(() =>
  import('./little-star-aqiqah/LittleStarAqiqahTemplate').then((m) => ({ default: m.LittleStarAqiqahTemplate }))
)
const AcademicEleganceTemplate = lazy(() =>
  import('./academic-elegance/AcademicEleganceTemplate').then((m) => ({ default: m.AcademicEleganceTemplate }))
)
const JungleSafariTemplate = lazy(() =>
  import('./jungle-safari-birthday/JungleSafariTemplate').then((m) => ({ default: m.JungleSafariTemplate }))
)
const SweetBlossomTemplate = lazy(() =>
  import('./sweet-blossom-aqiqah/SweetBlossomTemplate').then((m) => ({ default: m.SweetBlossomTemplate }))
)
const NusantaraKhitanTemplate = lazy(() =>
  import('./nusantara-khitan/NusantaraKhitanTemplate').then((m) => ({ default: m.NusantaraKhitanTemplate }))
)
const MonochromeGradTemplate = lazy(() =>
  import('./monochrome-grad/MonochromeGradTemplate').then((m) => ({ default: m.MonochromeGradTemplate }))
)
const AdatBanjarTemplate = lazy(() =>
  import('./adat-banjar/AdatBanjarTemplate').then((m) => ({ default: m.AdatBanjarTemplate }))
)
const RetroEditorialTemplate = lazy(() =>
  import('./retro-editorial-birthday/RetroEditorialTemplate').then((m) => ({ default: m.RetroEditorialTemplate }))
)
const EmeraldBotanicalTemplate = lazy(() =>
  import('./emerald-botanical-aqiqah/EmeraldBotanicalTemplate').then((m) => ({ default: m.EmeraldBotanicalTemplate }))
)

interface TemplateRendererProps extends TemplateViewProps {
  template: TemplateItem
}

const TemplateLoadingFallback: React.FC<{ template: TemplateItem }> = ({ template }) => (
  <div
    className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center bg-stone-950 text-amber-100"
    role="status"
    aria-live="polite"
  >
    <div className="w-12 h-12 rounded-full border-2 border-amber-400/30 border-t-amber-300 animate-spin mb-4" />
    <p className="font-serif text-lg text-amber-200">{template.name}</p>
    <p className="text-xs text-stone-400 mt-1 font-sans">Menyiapkan undangan digital...</p>
  </div>
)

export const TemplateRenderer: React.FC<TemplateRendererProps> = (props) => {
  const { template } = props
  const containerRef = useRef<HTMLDivElement>(null)

  // Activates 60fps scroll reveal and card cascade across every template
  useAutoScrollReveal3D(containerRef)

  const renderTemplateContent = () => {
    switch (template.slug || template.id) {
      case 'emerald-botanical-aqiqah':
        return <EmeraldBotanicalTemplate {...props} />

      case 'retro-editorial-birthday':
        return <RetroEditorialTemplate {...props} />

      case 'adat-banjar':
        return <AdatBanjarTemplate {...props} />

      case 'jungle-safari-birthday':
        return <JungleSafariTemplate {...props} />

      case 'sweet-blossom-aqiqah':
        return <SweetBlossomTemplate {...props} />

      case 'nusantara-khitan':
        return <NusantaraKhitanTemplate {...props} />

      case 'monochrome-grad':
        return <MonochromeGradTemplate {...props} />

      case 'royal-khitan':
        return <RoyalKhitanTemplate {...props} />

      case 'confetti-birthday':
        return <ConfettiBirthdayTemplate {...props} />

      case 'little-star-aqiqah':
        return <LittleStarAqiqahTemplate {...props} />

      case 'academic-elegance':
        return <AcademicEleganceTemplate {...props} />

      case 'exclusive-navy':
        return <ExclusiveNavyTemplate {...props} />

      case 'royal-midnight':
      case 'midnight-aldian':
      case 'luthfiana-hasyim':
        return <RoyalMidnightTemplate {...props} />

      case 'royal-java':
        return <RoyalJavaTemplate {...props} />

      case 'luxury-champagne':
        return <LuxuryChampagneTemplate {...props} />

      case 'celestial-night':
        return <CelestialNightTemplate {...props} />

      case 'rustic-terracotta':
        return <RusticTerracottaTemplate {...props} />

      case 'blush-peony':
        return <BlushPeonyTemplate {...props} />

      case 'botanical-sage':
      default:
        return <BotanicalSageTemplate {...props} />
    }
  }

  return (
    <div id="main-content" tabIndex={-1} ref={containerRef} className="w-full min-h-screen outline-none">
      <Suspense fallback={<TemplateLoadingFallback template={template} />}>
        {renderTemplateContent()}
        {template.slug !== 'botanical-sage' && (
          <div className="bg-stone-950 px-4 py-8 border-t border-amber-500/20">
            <ViralStudioAttribution
              isDark
              templateSlug={template.slug}
              templateName={template.name}
            />
          </div>
        )}
      </Suspense>
    </div>
  )
}
