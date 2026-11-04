import React, { useState, useRef, useEffect } from 'react'
import { AudioPlayer } from './components/AudioPlayer'
import { ToastProvider, useToast } from './components/Toast'
import { weddingData, AudioTrack } from './config/weddingData'
import {
  storeConfig,
  TemplateItem,
  PricingTier,
  CustomOrderData
} from './config/storeConfig'
import { InvitationProvider } from './context/InvitationContext'
import { StorefrontPage } from './components/store/StorefrontPage'
import { PreviewFloatingBar } from './components/store/PreviewFloatingBar'
import { OrderModal } from './components/store/OrderModal'
import { ClientPortalModal } from './components/store/ClientPortalModal'
import { TemplateRenderer } from './templates/TemplateRenderer'
import { updateDynamicMetaTags, safeDecodeUri } from './utils/seo'
import { track } from './lib/analytics'

interface AppProps {
  /** Template slug from a path route such as /demo/royal-java (query ?template= still wins). */
  initialTemplateSlug?: string
}

export const AppContent: React.FC<AppProps> = ({ initialTemplateSlug }) => {
  // Check URL parameters on initial load (?template=royal-java&to=Nama+Tamu)
  const urlParams = new URLSearchParams(window.location.search)
  const initialTemplateParam = urlParams.get('template') || initialTemplateSlug || null
  const hasGuestParam = Boolean(urlParams.get('to') || urlParams.get('u') || urlParams.get('guest'))
  const hasPortalParam = Boolean(urlParams.get('portal') || urlParams.get('manage') || urlParams.get('invoice'))

  const matchedInitialTemplate =
    storeConfig.templates.find(
      (t) =>
        t.slug === initialTemplateParam ||
        t.id === initialTemplateParam ||
        (t.slug === 'royal-midnight' &&
          (initialTemplateParam === 'midnight' ||
            initialTemplateParam === 'midnight-aldian' ||
            initialTemplateParam === 'luthfiana-hasyim'))
    ) || storeConfig.templates[0]

  // View Mode: 'storefront' (Catalog Home) or 'preview' (Invitation View)
  const [viewMode, setViewMode] = useState<'storefront' | 'preview'>(
    initialTemplateParam || hasGuestParam ? 'preview' : 'storefront'
  )

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem>(matchedInitialTemplate)
  const [selectedPackage, setSelectedPackage] = useState<PricingTier | undefined>(undefined)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(hasPortalParam)
  const [customPreviewData, setCustomPreviewData] = useState<CustomOrderData | null>(null)

  // Invitation Playback & Cover Gate States
  const [isOpened, setIsOpened] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [activeTrack, setActiveTrack] = useState<AudioTrack>(() => {
    if (matchedInitialTemplate.defaultSongSrc) {
      return {
        id: matchedInitialTemplate.id,
        title: matchedInitialTemplate.defaultSongTitle || 'Payung Teduh - Akad',
        artist: 'Musik Indonesia Pilihan',
        src: matchedInitialTemplate.defaultSongSrc
      }
    }
    return weddingData.audio.activeTrack
  })
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { showToast } = useToast()

  // Update track when template changes
  useEffect(() => {
    if (selectedTemplate.defaultSongSrc) {
      setActiveTrack({
        id: selectedTemplate.id,
        title: selectedTemplate.defaultSongTitle || 'Payung Teduh - Akad',
        artist: 'Musik Indonesia Pilihan',
        src: selectedTemplate.defaultSongSrc
      })
    }
  }, [selectedTemplate])

  // Pause audio if returning to storefront catalog
  useEffect(() => {
    if (viewMode === 'storefront' && audioRef.current) {
      audioRef.current.pause()
      setIsPlayingAudio(false)
    }
  }, [viewMode])

  // Sync Dynamic SEO, Open Graph & WhatsApp metadata in DOM & title
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const guestParam = params.get('to') || params.get('u') || params.get('guest')
    const guestName = guestParam ? safeDecodeUri(guestParam) : undefined

    if (viewMode === 'storefront') {
      updateDynamicMetaTags({ isStorefront: true })
    } else {
      updateDynamicMetaTags({
        template: selectedTemplate,
        guestName,
        customData: customPreviewData,
        isStorefront: false
      })
    }
  }, [viewMode, selectedTemplate, customPreviewData])

  // CRITICAL: Trigger audio playback directly during user gesture click
  const handleOpenInvitationWithAudio = () => {
    setIsOpened(true)
    setIsPlayingAudio(true)
    track('open_gate', {
      template: selectedTemplate.slug,
      has_guest: hasGuestParam,
      custom_preview: Boolean(customPreviewData)
    })

    if (audioRef.current) {
      audioRef.current.volume = 1.0
      audioRef.current
        .play()
        .then(() => {
          showToast(`Memutar: ${activeTrack.title}`, 'success')
        })
        .catch((err) => {
          console.warn('Autoplay error catch:', err)
        })
    }
  }

  const handleToggleAudio = () => {
    setIsPlayingAudio((prev) => !prev)
  }

  const handleTrackChange = (track: AudioTrack) => {
    setActiveTrack(track)
    setIsPlayingAudio(true)
  }

  const handleNextTrack = () => {
    const currentIndex = weddingData.audio.playlist.findIndex((t) => t.id === activeTrack.id)
    const nextIndex = (currentIndex + 1) % weddingData.audio.playlist.length
    const next = weddingData.audio.playlist[nextIndex]
    setActiveTrack(next)
    setIsPlayingAudio(true)
    showToast(`Mengganti lagu: ${next.title}`, 'info')
  }

  // Storefront Handlers
  const handlePreviewTemplate = (template: TemplateItem) => {
    setSelectedTemplate(template)
    setIsOpened(false) // Show envelope cover screen of that template
    setViewMode('preview')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenOrderModal = (template: TemplateItem, pkg?: PricingTier) => {
    setSelectedTemplate(template)
    const defaultPkg =
      pkg ||
      (template.eventType && template.eventType !== 'wedding'
        ? storeConfig.eventPricingTiers.find((p) => p.id === 'paket-syukuran-exclusive') || storeConfig.eventPricingTiers[1]
        : template.slug === 'royal-midnight'
        ? storeConfig.pricingTiers.find((p) => p.id === 'paket-vip') || storeConfig.pricingTiers[2]
        : storeConfig.pricingTiers.find((p) => p.id === 'paket-exclusive') || storeConfig.pricingTiers[1])
    setSelectedPackage(defaultPkg)
    setIsOrderModalOpen(true)
  }

  const handleApplyCustomPreview = (template: TemplateItem, customData: CustomOrderData) => {
    setSelectedTemplate(template)
    setCustomPreviewData(customData)
    setIsOpened(true)
    setViewMode('preview')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Client Portal Modal (Monitor RSVP, Orders, WhatsApp Links) */}
      <ClientPortalModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
        onOpenPreview={(slug) => {
          const found = storeConfig.templates.find((t) => t.slug === slug)
          if (found) handlePreviewTemplate(found)
        }}
      />

      {/* Order & Customizer Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialTemplate={selectedTemplate}
        initialPackage={selectedPackage}
        onApplyCustomPreview={handleApplyCustomPreview}
        onOpenPortal={() => setIsPortalModalOpen(true)}
      />

      {viewMode === 'storefront' ? (
        <StorefrontPage
          onPreviewTemplate={handlePreviewTemplate}
          onOrderTemplate={handleOpenOrderModal}
          onOpenClientPortal={() => setIsPortalModalOpen(true)}
        />
      ) : (
        <InvitationProvider template={selectedTemplate} customOrder={customPreviewData} isOpened={isOpened}>
          {/* Top Bar for Buyers in Preview Mode */}
          <PreviewFloatingBar
            activeTemplate={selectedTemplate}
            onSelectTemplate={(tpl) => {
              setSelectedTemplate(tpl)
              setIsOpened(false) // Let user experience each template's unique opening gate
              showToast(`Tema diganti ke: ${tpl.name}`, 'info')
            }}
            onBackToCatalog={() => setViewMode('storefront')}
            onOpenOrderModal={(tpl) => handleOpenOrderModal(tpl)}
            hasCustomPreviewData={Boolean(customPreviewData)}
            onResetCustomData={() => {
              setCustomPreviewData(null)
              showToast('Dikembalikan ke data contoh template', 'info')
            }}
          />

          {/* Master Audio Controller */}
          <AudioPlayer
            audioElementRef={audioRef}
            src={activeTrack.src}
            activeTrack={activeTrack}
            isPlaying={isPlayingAudio}
            onToggle={handleToggleAudio}
            onTrackChange={handleTrackChange}
          />

          {/* Dynamic Template Component Renderer */}
          <TemplateRenderer
            template={selectedTemplate}
            isOpened={isOpened}
            onOpenWithAudio={handleOpenInvitationWithAudio}
            isPlayingAudio={isPlayingAudio}
            onToggleAudio={handleToggleAudio}
            activeTrack={activeTrack}
            onNextTrack={handleNextTrack}
          />
        </InvitationProvider>
      )}
    </>
  )
}

export const App: React.FC<AppProps> = ({ initialTemplateSlug }) => {
  return (
    <ToastProvider>
      <AppContent initialTemplateSlug={initialTemplateSlug} />
    </ToastProvider>
  )
}

export default App
