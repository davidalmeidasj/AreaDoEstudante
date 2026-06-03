export const theme = {
  colors: {
    turquesa: '#66bdb5',
    label: '#93bed4',
    valor: '#6a8b9e',
    fundo: '#0c5c97',
    branco: '#ffffff',
  },
  radius: {
    card: '25px',
  },
  card: {
    width: '340px',
    height: '540px',
    perspective: '1600px',
  },
} as const

export type Theme = typeof theme
