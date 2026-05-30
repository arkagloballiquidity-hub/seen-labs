import { useEffect, type RefObject } from 'react'

export function useHLS(videoRef: RefObject<HTMLVideoElement | null>, src: string) {
  useEffect(() => {
    if (!src || !videoRef.current) return
    const video = videoRef.current

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      return
    }

    let hls: InstanceType<typeof import('hls.js').default> | null = null

    import('hls.js').then(({ default: Hls }) => {
      if (!Hls.isSupported() || !videoRef.current) return
      hls = new Hls({ startLevel: -1, autoStartLoad: true })
      hls.loadSource(src)
      hls.attachMedia(videoRef.current)
    })

    return () => { hls?.destroy() }
  }, [src, videoRef])
}
