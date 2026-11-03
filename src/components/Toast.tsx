import React, { createContext, useContext, useState, ReactNode } from 'react'
import { CheckCircle2, Info, X } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type?: 'success' | 'info'
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Container with polite screen-reader announcements */}
      <div
        role="region"
        aria-live="polite"
        aria-label="Pemberitahuan Sistem"
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none max-w-sm w-[90%] sm:w-auto"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-full bg-stone-900/95 text-white border border-amber-500/40 shadow-2xl backdrop-blur-md text-xs sm:text-sm font-sans animate-in fade-in slide-in-from-top-4 duration-300"
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
            ) : (
              <Info className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            )}
            <span className="font-medium text-stone-100">{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Tutup pemberitahuan"
              className="ml-1 min-w-[36px] min-h-[36px] -mr-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
