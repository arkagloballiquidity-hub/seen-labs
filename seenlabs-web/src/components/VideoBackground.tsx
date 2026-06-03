import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_DURATION = 15

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduced  = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.load()

    if (reduced) {
      video.currentTime = 1
      return
    }

    // Wait for enough data to scrub
    const init = () => {
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
  }, [reduced])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <video
        ref={videoRef}
        src="/seen-labs-reel.mp4"
        muted
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {/* Base dark tint — keep light so video is visible */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.38)',
      }} />
    </div>
  )
}
