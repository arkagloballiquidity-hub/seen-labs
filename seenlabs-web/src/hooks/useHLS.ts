import { useEffect, type RefObject } from 'react'

export function useHLS(videoRef: RefObject<HTMLVideoElement | null>, src: string) {
  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    let hlsInstance: import('hls.js').default | null = null

    const setupHLS = async () => {
      const Hls = (await import('hls.js')).default
      if (Hls.isSupported()) {
        hlsInstance = new Hls({ enableWorker: false })
        hlsInstance.loadSource(src)
        hlsInstance.attachMedia(video)
        hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {})
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
        video.play().catch(() => {})
      }
    }

    setupHLS()
    return () => {
      hlsInstance?.destroy()
    }
  }, [videoRef, src])
}
