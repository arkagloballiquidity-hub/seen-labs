import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider } from './lib/auth'
import { LoadingScreen } from './components/LoadingScreen'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/crm/ProtectedRoute'
import { HomePage } from './pages/HomePage'
import { SolucionPage } from './pages/SolucionPage'
import { PreciosPage } from './pages/PreciosPage'
import { CasosPage } from './pages/CasosPage'
import { FAQPage } from './pages/FAQPage'
import { AgendarPage } from './pages/AgendarPage'
import { LoginPage } from './pages/crm/LoginPage'
import { CrmDashboard } from './pages/crm/CrmDashboard'
import { CrmClientes } from './pages/crm/CrmClientes'
import { CrmNuevo } from './pages/crm/CrmNuevo'
import { CrmBriefs } from './pages/crm/CrmBriefs'
import { ProjectDetail } from './pages/crm/ProjectDetail'
import { MiProyecto } from './pages/crm/MiProyecto'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
}

function AnimatedRoute({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  )
}

function PublicRoutes() {
  return (
    <Routes>
      {/* Public landing */}
      <Route path="/" element={<AnimatedRoute><Layout><HomePage /></Layout></AnimatedRoute>} />
      <Route path="/solucion" element={<AnimatedRoute><Layout><SolucionPage /></Layout></AnimatedRoute>} />
      <Route path="/precios"  element={<AnimatedRoute><Layout><PreciosPage /></Layout></AnimatedRoute>} />
      <Route path="/casos"    element={<AnimatedRoute><Layout><CasosPage /></Layout></AnimatedRoute>} />
      <Route path="/faq"      element={<AnimatedRoute><Layout><FAQPage /></Layout></AnimatedRoute>} />

      {/* Agendar */}
      <Route path="/agendar" element={<AnimatedRoute><Layout><AgendarPage /></Layout></AnimatedRoute>} />

      {/* Auth — /acceso es el alias público para clientes */}
      <Route path="/login"  element={<LoginPage />} />
      <Route path="/acceso" element={<LoginPage />} />

      {/* Admin CRM — solo equipo Seen Labs */}
      <Route path="/crm" element={
        <ProtectedRoute require="admin"><CrmDashboard /></ProtectedRoute>
      } />
      <Route path="/crm/clientes" element={
        <ProtectedRoute require="admin"><CrmClientes /></ProtectedRoute>
      } />
      <Route path="/crm/nuevo" element={
        <ProtectedRoute require="admin"><CrmNuevo /></ProtectedRoute>
      } />
      <Route path="/crm/briefs" element={
        <ProtectedRoute require="admin"><CrmBriefs /></ProtectedRoute>
      } />
      <Route path="/crm/proyecto/:id" element={
        <ProtectedRoute require="admin"><ProjectDetail /></ProtectedRoute>
      } />

      {/* Portal cliente — solo clientes */}
      <Route path="/mi-proyecto" element={
        <ProtectedRoute require="client"><MiProyecto /></ProtectedRoute>
      } />
    </Routes>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const handleLoadComplete = useCallback(() => setLoading(false), [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimatePresence mode="wait">
          {loading
            ? <LoadingScreen key="loading" onComplete={handleLoadComplete} />
            : <PublicRoutes key="app" />
          }
        </AnimatePresence>
      </AuthProvider>
    </BrowserRouter>
  )
}
