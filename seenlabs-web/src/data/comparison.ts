export interface ComparisonRow {
  feature: string
  traditional: string
  seenLabs: string
}

export const COMPARISON: ComparisonRow[] = [
  { feature: 'Tiempo de entrega',       traditional: '2–4 meses',       seenLabs: '7 días hábiles' },
  { feature: 'Costo total',             traditional: '$8,000–$25,000',   seenLabs: 'Desde $983' },
  { feature: 'Embudo de ventas',        traditional: 'No incluido',       seenLabs: 'Incluido + IA' },
  { feature: 'Automatizaciones',        traditional: 'Extra / No incluye',seenLabs: 'Integradas' },
  { feature: 'Anuncios configurados',   traditional: 'Agencia aparte',    seenLabs: 'En el mismo paquete' },
  { feature: 'Garantía de resultados',  traditional: 'No existe',         seenLabs: 'Revisiones ilimitadas' },
  { feature: 'Escalabilidad',           traditional: 'Proyecto cerrado',  seenLabs: 'Sistema vivo' },
]
