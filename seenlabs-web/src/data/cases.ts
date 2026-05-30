export interface CaseStudy {
  id: string
  domain: string
  label: string
  quote: string
  author: string
  result: string
}

export const CASES: CaseStudy[] = [
  {
    id: 'arka',
    domain: 'arkaglobalinvestments.com',
    label: 'ARKA GLOBAL',
    quote: 'En 7 días pasamos de tener una presencia digital mediocre a un sistema que genera leads calificados de forma automática. El ROI en el primer mes fue de 4x.',
    author: 'CEO, Arka Global Investments',
    result: '4x ROI en 30 días',
  },
  {
    id: 'alpha',
    domain: 'alphadrivers.mx',
    label: 'ALPHA DRIVERS',
    quote: 'El embudo de IA transformó completamente nuestro proceso de ventas. Ahora cerramos 3 veces más clientes con el mismo equipo, sin trabajar más horas.',
    author: 'Fundador, Alpha Drivers',
    result: '3x más cierres de venta',
  },
  {
    id: 'arkaltd',
    domain: 'arkaltd.io',
    label: 'ARKA LTD',
    quote: 'Lo que más me sorprendió fue la velocidad. En menos de una semana teníamos un sistema completo funcionando. Nuestros competidores tardaron meses en hacer lo mismo.',
    author: 'Director, Arka Ltd',
    result: 'Sistema completo en 7 días',
  },
]
