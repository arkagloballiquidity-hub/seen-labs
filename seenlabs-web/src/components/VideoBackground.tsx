import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_DURATION = 15

function useMobileVideo() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(max-width: 768px)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isMobile
}

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduced  = useReducedMotion()
  const isMobile = useMobileVideo()

  const src = isMobile ? '/hero-mobile.mp4' : '/hero-desktop.mp4'

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.load()

    if (reduced) {
      video.currentTime = 1
      return
    }

    const init = () => {
      ScrollTrigger.getAll()
        .filter(st => st.vars?.trigger === document.documentElement)
        .forEach(st => st.kill())

      gsap.to(video, {
        currentTime: VIDEO_DURATION,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      })
    }

    if (video.readyState >= 2) {
      init()
    } else {
      video.addEventListener('loadeddata', init, { once: true })
    }

    return () => {
      ScrollTrigger.getAll()
        .filter(st => st.vars?.trigger === document.documentElement)
        .forEach(st => st.kill())
    }
  }, [reduced, src])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <video
        key={src}
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.30) 60%, rgba(0,0,0,0.15) 100%)',
      }} />
    </div>
  )
}
