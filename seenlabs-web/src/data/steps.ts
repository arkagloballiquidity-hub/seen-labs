export interface PathStep {
  num: string
  title: string
  description: string
  highlight?: boolean
}

export const STEPS: PathStep[] = [
  { num: '01', title: 'Discovery Call',          description: 'Sesión de 60 min para entender tu negocio, mercado objetivo y objetivos de conversión.' },
  { num: '02', title: 'Auditoría Digital',        description: 'Análisis completo de tu presencia digital actual, competencia y oportunidades.' },
  { num: '03', title: 'Estrategia de Sistema',    description: 'Diseñamos la arquitectura completa de tu sistema de ventas digital.' },
  { num: '04', title: 'Copy & Estructura',        description: 'Desarrollamos el copy de conversión y la estructura de información de tu web.' },
  { num: '05', title: 'Diseño UI/UX',             description: 'Diseño de alta conversión alineado con tu marca, enfocado en la acción del usuario.' },
  { num: '06', title: 'Desarrollo Web',           description: 'Construimos tu web optimizada para velocidad, SEO y conversión máxima.' },
  { num: '07', title: 'Embudo de IA',             description: 'Configuramos los flujos de calificación y nurturing con inteligencia artificial.' },
  { num: '08', title: 'Automatizaciones',         description: 'Integramos y activamos todos los flujos automáticos de seguimiento y ventas.' },
  { num: '09', title: 'Configuración de Anuncios',description: 'Estructuramos y lanzamos las campañas de pago con creativos optimizados.' },
  { num: '10', title: 'QA & Testing',             description: 'Pruebas exhaustivas de todos los flujos, formularios, integraciones y velocidad.' },
  { num: '11', title: 'Lanzamiento',              description: 'Tu sistema sale al mundo. Monitoreo activo las primeras 72 horas.', highlight: true },
  { num: '12', title: 'Optimización Continua',    description: 'Iteramos basado en datos reales para maximizar tu retorno mes a mes.', highlight: true },
]
