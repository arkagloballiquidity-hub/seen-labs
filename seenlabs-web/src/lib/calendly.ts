// Calendly popup helper
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void
      initBadgeWidget: (opts: { url: string; text: string; color: string; textColor: string; branding?: boolean }) => void
    }
  }
}

export const CALENDLY_URL = 'https://calendly.com/seenlabs/30min'

export function openCalendly(e?: React.MouseEvent) {
  e?.preventDefault()
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
  } else {
    // Fallback: open directly if script hasn't loaded yet
    window.open(CALENDLY_URL, '_blank')
  }
}
