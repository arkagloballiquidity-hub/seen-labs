import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LoadingScreen } from './components/LoadingScreen'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { SolucionPage } from './pages/SolucionPage'
import { PreciosPage } from './pages/PreciosPage'
import { CasosPage } from './pages/CasosPage'
import { FAQPage } from './pages/FAQPage'
import { AgendarPage } from './pages/AgendarPage'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
}

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
          <Layout><HomePage /></Layout>
        </motion.div>
      } />
      <Route path="/solucion" element={
        <motion.div key="solucion" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
          <Layout><SolucionPage /></Layout>
        </motion.div>
      } />
      <Route path="/precios" element={
        <motion.div key="precios" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
          <Layout><PreciosPage /></Layout>
        </motion.div>
      } />
      <Route path="/casos" element={
        <motion.div key="casos" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
          <Layout><CasosPage /></Layout>
        </motion.div>
      } />
      <Route path="/faq" element={
        <motion.div key="faq" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
          <Layout><FAQPage /></Layout>
        </motion.div>
      } />
      <Route path="/agendar" element={
        <motion.div key="agendar" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
          <Layout><AgendarPage /></Layout>
        </motion.div>
      } />
    </Routes>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading
          ? <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
          : <AnimatedRoutes key="app" />
        }
      </AnimatePresence>
    </BrowserRouter>
  )
}
