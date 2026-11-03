import React from 'react'
import { CoverScreen } from '../../components/CoverScreen'
import { FallingPetals } from '../../components/FallingPetals'
import { BottomNav } from '../../components/BottomNav'
import { DesktopShowcase } from '../../components/DesktopShowcase'
import { HeroSection } from '../../components/HeroSection'
import { QuoteSection } from '../../components/QuoteSection'
import { CoupleSection } from '../../components/CoupleSection'
import { StorySection } from '../../components/StorySection'
import { EventSection } from '../../components/EventSection'
import { GallerySection } from '../../components/GallerySection'
import { DressCodeSection } from '../../components/DressCodeSection'
import { RsvpSection } from '../../components/RsvpSection'
import { GiftSection } from '../../components/GiftSection'
import { FooterSection } from '../../components/FooterSection'
import { AudioTrack } from '../../config/weddingData'
import { TemplateItem } from '../../config/storeConfig'

export interface TemplateViewProps {
  template: TemplateItem
  isOpened: boolean
  onOpenWithAudio: () => void
  isPlayingAudio: boolean
  onToggleAudio: () => void
  activeTrack: AudioTrack
  onNextTrack: () => void
}

export const BotanicalSageTemplate: React.FC<TemplateViewProps> = ({
  template,
  isOpened,
  onOpenWithAudio,
  isPlayingAudio,
  onToggleAudio,
  activeTrack,
  onNextTrack
}) => {
  return (
    <div className="min-h-screen bg-stone-950 flex justify-center text-stone-800 selection:bg-amber-200 selection:text-stone-900 overflow-x-hidden pt-12">
      {/* Cover Gate: 3D Wax Seal with Classic Sage Envelope */}
      <CoverScreen isOpen={isOpened} onOpenWithAudio={onOpenWithAudio} />

      {/* Floating Flower Petals Ambiance */}
      <FallingPetals active={isOpened} />

      {/* Floating Bottom Navigation Bar */}
      {isOpened && <BottomNav />}

      {/* Adaptive Layout: Desktop Dual-Column Split Screen vs Mobile Full Width */}
      <div className="w-full flex flex-col lg:flex-row min-h-screen">
        {/* Left Column: Desktop Sticky Showcase (Hidden on Mobile) */}
        <DesktopShowcase
          isPlayingAudio={isPlayingAudio}
          onToggleAudio={onToggleAudio}
          activeTrack={activeTrack}
          onNextTrack={onNextTrack}
        />

        {/* Right Column: Scrollable Invitation Content in Sage & Gold */}
        <div
          className="w-full lg:w-[58%] xl:w-[62%] min-h-screen shadow-2xl relative border-l border-amber-600/15 transition-colors duration-500"
          style={{ backgroundColor: template.themeColors.primaryBg }}
        >
          <main className="w-full max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
            <HeroSection />
            <QuoteSection />
            <CoupleSection />
            <StorySection />
            <EventSection />
            <GallerySection />
            <DressCodeSection />
            <RsvpSection />
            <GiftSection />
            <FooterSection />
          </main>
        </div>
      </div>
    </div>
  )
}
