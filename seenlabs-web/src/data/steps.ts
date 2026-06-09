export interface PathStep {
  num: string
  title: string
  description: string
  highlight?: boolean
}

export const STEPS: PathStep[] = [
  {
    num: '01',
    title: 'Elegir el programa',
    description: 'Selecciona el paquete que se adapta a tu negocio. Luego llenas el precontrato en minutos — sin burocracia.',
  },
  {
    num: '02',
    title: 'Pagar y firmar',
    description: 'Aceptamos crypto, tarjeta de crédito, MSI, débito o efectivo. Una vez confirmado el pago, ambas partes firman el contrato.',
  },
  {
    num: '03',
    title: 'Formulario A',
    description: 'Llenas el brief de tu negocio: mercado, producto, competencia, diferenciadores y objetivos de conversión.',
  },
  {
    num: '04',
    title: 'Formulario B',
    description: 'Accesos, activos digitales, identidad de marca, paleta de colores y referencias visuales que nos entregas.',
  },
  {
    num: '05',
    title: 'Llamada con tu equipo Elite',
    description: 'Sesión en vivo con tu equipo asignado de Seen Labs para resolver dudas y alinear expectativas antes de arrancar.',
  },
  {
    num: '06',
    title: 'Revisión 1',
    description: 'Primera entrega parcial: estructura, copy y diseño base. Tienes 24 horas para dar feedback y aprobación.',
  },
  {
    num: '07',
    title: 'Revisión 2',
    description: 'Sistema completo con todas las automatizaciones y flujos activos. Segunda ronda de ajustes antes del lanzamiento.',
  },
  {
    num: '08',
    title: 'Prelanzamiento',
    description: 'QA final, pruebas de flujos, verificación de integraciones y ensayo general con tráfico de prueba.',
  },
  {
    num: '09',
    title: 'Lanzamiento — Día 15',
    description: 'Tu sistema sale al mundo. Monitoreo activo las primeras 72 horas por parte de Seen Labs.',
    highlight: true,
  },
  {
    num: '10',
    title: 'Primer cliente facturado',
    description: 'Bienvenido a la luz. El sistema genera su primera venta — y esto es solo el principio.',
    highlight: true,
  },
]
