import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, raf = 0

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      x = 0; y = 0; size = 0; speedX = 0; speedY = 0; opacity = 0; pulse = 0
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * W
        this.y = Math.random() * H
        this.size = Math.random() * 1.5 + 0.3
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.5 + 0.1
        this.pulse = Math.random() * Math.PI * 2
      }
      update() {
        this.x += this.speedX; this.y += this.speedY; this.pulse += 0.02
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset()
      }
      draw() {
        const o = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse))
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(155,92,246,${o})`
        ctx!.fill()
      }
    }

    const particles = Array.from({ length: 80 }, () => new Particle())

    const animate = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(155,92,246,${0.08 * (1 - d / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      particles.forEach(p => { p.update(); p.draw() })
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
