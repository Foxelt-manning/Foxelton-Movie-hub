import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Download, Smartphone, XCircle } from 'lucide-react'

const DISMISS_KEY = 'foxelton:pwa-install-popup-dismissed'

const getStandaloneStatus = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return (
    window.matchMedia?.('(display-mode: standalone)')?.matches ||
    window.navigator?.standalone === true
  )
}

const PwaInstallPopup = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isStandalone, setIsStandalone] = useState(getStandaloneStatus())
  const [isClosed, setIsClosed] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.sessionStorage.getItem(DISMISS_KEY) === 'true'
  })
  const [installability, setInstallability] = useState('checking')

  useEffect(() => {
    const updateStandalone = () => {
      const standalone = getStandaloneStatus()
      setIsStandalone(standalone)

      if (standalone) {
        setInstallability('installed')
        window.sessionStorage.removeItem(DISMISS_KEY)
      }
    }

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
      setInstallability('installable')
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setInstallability('installed')
      window.sessionStorage.removeItem(DISMISS_KEY)
    }

    const standaloneQuery = window.matchMedia('(display-mode: standalone)')
    updateStandalone()

    standaloneQuery.addEventListener('change', updateStandalone)
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    const settleTimer = window.setTimeout(() => {
      setInstallability((current) => {
        if (current === 'checking' && !getStandaloneStatus()) {
          return 'not-installable'
        }

        return current
      })
    }, 1500)

    return () => {
      standaloneQuery.removeEventListener('change', updateStandalone)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.clearTimeout(settleTimer)
    }
  }, [])

  const statusCopy = useMemo(() => {
    if (isStandalone) {
      return {
        label: 'Installed',
        tone: 'text-emerald-300',
        icon: CheckCircle2,
        message: 'This app is already running as an installed PWA.',
      }
    }

    if (installability === 'installable' && deferredPrompt) {
      return {
        label: 'Installable',
        tone: 'text-cyan-300',
        icon: Download,
        message: 'Your browser says this app can be installed right now.',
      }
    }

    if (installability === 'not-installable') {
      return {
        label: 'Not installable',
        tone: 'text-amber-300',
        icon: XCircle,
        message: 'The browser has not exposed an install prompt for this session yet.',
      }
    }

    return {
      label: 'Checking',
      tone: 'text-slate-300',
      icon: Smartphone,
      message: 'Waiting for the browser to decide whether install is available.',
    }
  }, [deferredPrompt, installability, isStandalone])
  const StatusIcon = statusCopy.icon

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return
    }

    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setInstallability(getStandaloneStatus() ? 'installed' : 'not-installable')
  }

  if (isClosed) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] w-[min(92vw,22rem)] rounded-2xl border border-white/10 bg-[#0f0d23]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white/10 p-2 text-white">
            <StatusIcon className="h-5 w-5" />
          </div>
          <div>
            <p className={`text-sm font-semibold ${statusCopy.tone}`}>{statusCopy.label}</p>
            <p className="mt-1 text-sm text-gray-300">{statusCopy.message}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsClosed(true)
            window.sessionStorage.setItem(DISMISS_KEY, 'true')
          }}
          className="rounded-full p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Dismiss PWA status popup"
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>

      {installability === 'installable' && deferredPrompt && (
        <button
          type="button"
          onClick={handleInstall}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
        >
          <Download className="h-4 w-4" />
          Install app
        </button>
      )}
    </div>
  )
}

export default PwaInstallPopup
