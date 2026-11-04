import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactLenis } from 'lenis/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import App from './App'
import { ToastProvider } from './components/Toast'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'

function resolvePathTemplateSlug(): string | undefined {
  if (typeof window === 'undefined') return undefined
  const match = window.location.pathname.match(/^\/(?:demo|u)\/([a-z0-9-]+)\/?$/i)
  return match ? match[1].toLowerCase() : undefined
}

const initialTemplateSlug = resolvePathTemplateSlug()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
          {/* Global Fine-Art Cotton Paper Grain Overlay */}
          <div
            className="fixed inset-0 pointer-events-none z-[999] opacity-[0.045] mix-blend-overlay luxury-paper-grain"
            aria-hidden="true"
          />
          <App initialTemplateSlug={initialTemplateSlug} />
          <Analytics />
          <SpeedInsights />
        </ReactLenis>
      </ToastProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
