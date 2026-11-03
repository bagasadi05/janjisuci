import React from 'react'
import { ArrowLeft, ShoppingBag, Sparkles, Palette, RotateCcw } from 'lucide-react'
import { storeConfig, TemplateItem, formatRupiah } from '../../config/storeConfig'

interface PreviewFloatingBarProps {
  activeTemplate: TemplateItem
  onSelectTemplate: (template: TemplateItem) => void
  onBackToCatalog: () => void
  onOpenOrderModal: (template: TemplateItem) => void
  hasCustomPreviewData: boolean
  onResetCustomData: () => void
}

export const PreviewFloatingBar: React.FC<PreviewFloatingBarProps> = ({
  activeTemplate,
  onSelectTemplate,
  onBackToCatalog,
  onOpenOrderModal,
  hasCustomPreviewData,
  onResetCustomData
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-stone-950/90 backdrop-blur-xl border-b border-amber-500/30 text-white shadow-2xl px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Back to Storefront Catalog */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onBackToCatalog}
            aria-label="Kembali ke katalog template utama"
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-sans font-medium text-stone-100 transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>Katalog</span>
          </button>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-300 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>Demo Langsung:</span>
            <strong className="text-amber-200 font-serif text-sm">{activeTemplate.name}</strong>
          </div>
        </div>

        {/* Center: Quick Template Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-md py-0.5 no-scrollbar">
          <Palette className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden sm:inline" aria-hidden="true" />
          <select
            aria-label="Pilih Template Demo"
            value={activeTemplate.id}
            onChange={(e) => {
              const found = storeConfig.templates.find((t) => t.id === e.target.value)
              if (found) onSelectTemplate(found)
            }}
            className="min-h-[44px] px-3 py-2 rounded-full bg-stone-900 border border-amber-500/40 text-amber-200 text-xs font-sans font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          >
            {storeConfig.templates.map((t) => (
              <option key={t.id} value={t.id} className="bg-stone-900 text-white">
                Tema: {t.name} ({formatRupiah(t.price)})
              </option>
            ))}
          </select>

          {hasCustomPreviewData && (
            <button
              type="button"
              onClick={onResetCustomData}
              aria-label="Kembalikan data ke contoh awal template"
              title="Kembalikan ke data contoh"
              className="min-h-[44px] inline-flex items-center gap-1 px-3 py-2 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-[11px] hover:bg-rose-500/30 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              <span className="hidden sm:inline">Reset Data</span>
            </button>
          )}
        </div>

        {/* Right: Price & Order Button */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex flex-col items-end leading-none">
            <span className="text-[10px] text-stone-400 line-through">
              {formatRupiah(activeTemplate.originalPrice)}
            </span>
            <span className="text-xs font-bold text-amber-300">
              {formatRupiah(activeTemplate.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onOpenOrderModal(activeTemplate)}
            aria-label={`Pakai template ${activeTemplate.name} seharga ${formatRupiah(activeTemplate.price)}`}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-sans font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Pakai Template Ini</span>
          </button>
        </div>
      </div>
    </div>
  )
}
