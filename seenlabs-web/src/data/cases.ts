export interface CaseStudy {
  id: string
  domain: string
  url: string
  label: string
  quote: string
  author: string
  authorRole: string
  result: string
}

export const CASES: CaseStudy[] = [
  {
    id: 'arka',
    domain: 'arkaglobalinvestments.com',
    url: 'https://arkaglobalinvestments.com',
    label: 'ARKA GLOBAL',
    quote: 'En 7 días pasamos de tener una presencia digital mediocre a un sistema que genera leads calificados de forma automática. El ROI en el primer mes fue de 4x. Seen Labs no es una agencia — es un socio estratégico.',
    author: 'CEO, Arka Global Investments',
    authorRole: 'Director Ejecutivo',
    result: '4x ROI en 30 días',
  },
  {
    id: 'alpha',
    domain: 'alphadrivers.mx',
    url: 'https://alphadrivers.mx',
    label: 'ALPHA DRIVERS',
    quote: 'El embudo de IA transformó completamente nuestro proceso de ventas. Ahora cerramos 3 veces más clientes con el mismo equipo. Lo que me sorprendió fue la velocidad — en una semana teníamos todo funcionando.',
    author: 'Fundador, Alpha Drivers',
    authorRole: 'Fundador & CEO',
    result: '3x más cierres de venta',
  },
  {
    id: 'arkaltd',
    domain: 'arkaltd.io',
    url: 'https://arkaltd.io',
    label: 'ARKA LTD',
    quote: 'Lo que más valoré fue la garantía real. Sabíamos que si algo no funcionaba, Seen Labs lo corregía. Esa confianza marcó toda la relación. Hoy el sistema trabaja solo mientras nosotros escalamos.',
    author: 'Director, Arka Ltd',
    authorRole: 'Director General',
    result: 'Sistema completo en 7 días',
  },
]
