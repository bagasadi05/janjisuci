import React from 'react'
import { ArrowLeft, ShoppingBag, Sparkles, RotateCcw, ChevronDown } from 'lucide-react'
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
    <header className="fixed top-0 left-0 right-0 z-[60] bg-stone-950/90 backdrop-blur-md border-b border-amber-500/30 text-white shadow-xl h-14">
      <div className="max-w-7xl mx-auto h-full px-2.5 sm:px-4 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Left: Back to Storefront Catalog */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onBackToCatalog}
            aria-label="Kembali ke katalog template utama"
            className="min-h-[40px] h-10 inline-flex items-center gap-1.5 px-3 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-white/15 text-xs font-sans font-medium text-stone-100 transition-all cursor-pointer active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="text-xs">Katalog</span>
          </button>

          <div className="hidden xl:flex items-center gap-1.5 text-xs text-stone-300 font-sans ml-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="text-stone-400">Demo:</span>
            <strong className="text-amber-200 font-serif text-xs">{activeTemplate.name}</strong>
          </div>
        </div>

        {/* Center: Quick Template Switcher Dropdown */}
        <div className="flex-1 min-w-0 max-w-[170px] xs:max-w-[210px] sm:max-w-xs md:max-w-sm flex items-center justify-center gap-1.5">
          <div className="relative w-full">
            <select
              aria-label="Pilih Template Demo"
              value={activeTemplate.id}
              onChange={(e) => {
                const found = storeConfig.templates.find((t) => t.id === e.target.value)
                if (found) onSelectTemplate(found)
              }}
              className="w-full min-h-[40px] h-10 pl-3 pr-7 py-1 rounded-full bg-stone-900/95 border border-amber-500/40 text-amber-200 text-xs font-sans font-medium focus:outline-none focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer truncate appearance-none"
            >
              {storeConfig.templates.map((t) => (
                <option key={t.id} value={t.id} className="bg-stone-900 text-white">
                  {t.name} ({formatRupiah(t.price)})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-amber-400">
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </div>

          {hasCustomPreviewData && (
            <button
              type="button"
              onClick={onResetCustomData}
              aria-label="Kembalikan data ke contoh awal template"
              title="Kembalikan ke data contoh"
              className="min-h-[40px] min-w-[40px] h-10 w-10 inline-flex items-center justify-center rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 hover:bg-rose-500/30 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Right: Price & Order CTA Button */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden lg:flex flex-col items-end leading-tight text-right mr-1">
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
            className="min-h-[40px] h-10 inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-sans font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Pakai Template Ini</span>
            <span className="sm:hidden">Pakai Template</span>
          </button>
        </div>
      </div>
    </header>
  )
}
