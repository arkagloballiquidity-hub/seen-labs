export interface ProblemCard {
  id: string
  icon: string
  title: string
  description: string
}

export const PROBLEMS: ProblemCard[] = [
  {
    id: 'p1',
    icon: '◎',
    title: 'Invisible en el mercado',
    description: 'Tu negocio existe pero nadie lo encuentra. Sin presencia digital estructurada, estás perdiendo clientes frente a competidores menos capaces que tú.',
  },
  {
    id: 'p2',
    icon: '⊟',
    title: 'Web que no convierte',
    description: 'Tienes una web, pero no genera leads ni ventas. Es un folleto digital sin estrategia, sin embudo, sin llamados a la acción que funcionen.',
  },
  {
    id: 'p3',
    icon: '◈',
    title: 'Procesos manuales que te agotan',
    description: 'Respondes mensajes uno a uno, haces seguimiento manual, pierdes ventas por falta de velocidad de respuesta. Tu tiempo vale más que eso.',
  },
  {
    id: 'p4',
    icon: '⊕',
    title: 'Anuncios sin retorno',
    description: 'Inviertes en publicidad y no ves resultados claros. Sin la estructura correcta, tu dinero se evapora en clics que nunca convierten.',
  },
  {
    id: 'p5',
    icon: '⊗',
    title: 'Dependencia de plataformas',
    description: 'Todo tu negocio depende de redes sociales que pueden cambiar sus algoritmos mañana. Necesitas activos digitales propios que trabajen para ti.',
  },
  {
    id: 'p6',
    icon: '◉',
    title: 'Sin sistema, sin escala',
    description: 'Trabajas más horas para ganar lo mismo. Sin un sistema de ventas automatizado, tu techo de ingresos está limitado por tu tiempo disponible.',
  },
]
