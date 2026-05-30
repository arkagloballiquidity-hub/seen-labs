import { useRef } from 'react'
import { useHLS } from '../../hooks/useHLS'

interface HLSVideoProps {
  src: string
  overlay?: 'light' | 'heavy'
  className?: string
  flipY?: boolean
}

export function HLSVideo({ src, overlay = 'light', className = '', flipY = false }: HLSVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useHLS(videoRef, src)

  const overlayOpacity = overlay === 'heavy' ? 'bg-black/60' : 'bg-black/20'

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover ${flipY ? 'scale-y-[-1]' : ''}`}
      />
      {/* Dark overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      {/* Gradient fallback background (shows if video fails) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(124,58,237,0.25) 0%, transparent 60%), #0A0A0F',
        }}
      />
    </div>
  )
}
