import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { FinalCTASection } from './sections/FinalCTASection'
import { VideoBackground } from './VideoBackground'

interface Props {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.classList.toggle('home-page', pathname === '/')
    return () => document.body.classList.remove('home-page')
  }, [pathname])

  // Only show full-page video on home
  const isHome = pathname === '/'

  return (
    <>
      {isHome && <VideoBackground />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>{children}</main>
        <FinalCTASection />
      </div>
    </>
  )
}
