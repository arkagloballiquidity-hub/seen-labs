import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { FinalCTASection } from './sections/FinalCTASection'

interface Props {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  const { pathname } = useLocation()

  /* Scroll to top on page change */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FinalCTASection />
    </>
  )
}
