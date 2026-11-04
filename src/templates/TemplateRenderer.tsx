import React, { useRef } from 'react'
import { TemplateItem } from '../config/storeConfig'
import { AudioTrack } from '../config/weddingData'
import { useAutoScrollReveal3D } from '../components/common/Reveal3D'
import { BotanicalSageTemplate, TemplateViewProps } from './botanical-sage/BotanicalSageTemplate'
import { RoyalJavaTemplate } from './royal-java/RoyalJavaTemplate'
import { LuxuryChampagneTemplate } from './luxury-champagne/LuxuryChampagneTemplate'
import { CelestialNightTemplate } from './celestial-night/CelestialNightTemplate'
import { RusticTerracottaTemplate } from './rustic-terracotta/RusticTerracottaTemplate'
import { BlushPeonyTemplate } from './blush-peony/BlushPeonyTemplate'
import { RoyalMidnightTemplate } from './royal-midnight/RoyalMidnightTemplate'
import { ExclusiveNavyTemplate } from './exclusive-navy/ExclusiveNavyTemplate'
import { RoyalKhitanTemplate } from './royal-khitan/RoyalKhitanTemplate'
import { ConfettiBirthdayTemplate } from './confetti-birthday/ConfettiBirthdayTemplate'
import { LittleStarAqiqahTemplate } from './little-star-aqiqah/LittleStarAqiqahTemplate'
import { AcademicEleganceTemplate } from './academic-elegance/AcademicEleganceTemplate'
import { JungleSafariTemplate } from './jungle-safari-birthday/JungleSafariTemplate'
import { SweetBlossomTemplate } from './sweet-blossom-aqiqah/SweetBlossomTemplate'
import { NusantaraKhitanTemplate } from './nusantara-khitan/NusantaraKhitanTemplate'
import { MonochromeGradTemplate } from './monochrome-grad/MonochromeGradTemplate'
import { AdatBanjarTemplate } from './adat-banjar/AdatBanjarTemplate'
import { RetroEditorialTemplate } from './retro-editorial-birthday/RetroEditorialTemplate'
import { EmeraldBotanicalTemplate } from './emerald-botanical-aqiqah/EmeraldBotanicalTemplate'

interface TemplateRendererProps extends TemplateViewProps {
  template: TemplateItem
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = (props) => {
  const { template } = props
  const containerRef = useRef<HTMLDivElement>(null)

  // Activates 60fps 3D scroll reveal and card tilt across every template
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
      {renderTemplateContent()}
    </div>
  )
}
