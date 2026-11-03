import React from 'react'
import { TemplateItem } from '../config/storeConfig'
import { AudioTrack } from '../config/weddingData'
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

interface TemplateRendererProps extends TemplateViewProps {
  template: TemplateItem
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = (props) => {
  const { template } = props

  switch (template.slug || template.id) {
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
