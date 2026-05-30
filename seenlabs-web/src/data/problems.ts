export interface ProblemCard {
  id: string
  icon: string
  title: string
  description: string
}

export const problems: ProblemCard[] = [
  {
    id: 'p1',
    icon: '◎',
    title: "Your business doesn't communicate its real value.",
    description: "Your best customers don't know you exist because your messaging speaks to no one.",
  },
  {
    id: 'p2',
    icon: '⊟',
    title: "Your website doesn't convert.",
    description: "It looks decent but sends zero leads. It was built to exist, not to sell.",
  },
  {
    id: 'p3',
    icon: '◈',
    title: "Your social media generates no trust.",
    description: "Inconsistent presence signals instability to potential buyers.",
  },
  {
    id: 'p4',
    icon: '⊕',
    title: "Your ads have no structure.",
    description: "Boosting posts is not advertising. You're paying for impressions, not results.",
  },
  {
    id: 'p5',
    icon: '⊗',
    title: "Your leads disappear after contact.",
    description: "No follow-up system means 80% of potential sales die in silence.",
  },
  {
    id: 'p6',
    icon: '◉',
    title: "Nobody knows why they should choose you.",
    description: "Without a clear value proposition, price becomes the only differentiator.",
  },
]
