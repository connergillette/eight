export const dynamicColors = [
  {
    bg: 'bg-yellow-900',
    border: 'border-yellow-950'
  },
  {
    bg: 'bg-yellow-800',
    border: 'border-yellow-900'
  },
  {
    bg: 'bg-yellow-700',
    border: 'border-yellow-800'
  },
  {
    bg: 'bg-yellow-600',
    border: 'border-yellow-700'
  },
  {
    bg: 'bg-yellow-500',
    border: 'border-yellow-600'
  },
  {
    bg: 'bg-yellow-400',
    border: 'border-yellow-500'
  },
  {
    bg: 'bg-yellow-300',
    border: 'border-yellow-400'
  },
  {
    bg: 'bg-yellow-200',
    border: 'border-yellow-300'
  },
  {
    bg: 'bg-yellow-100',
    border: 'border-yellow-200'
  },
  {
    bg: 'bg-yellow-100',
    border: 'border-yellow-400'
  },
]


export const getColorsFromRating = (dayRating: number | null) => {
  if (!dayRating || dayRating > 10 || dayRating < 1) return { bg: 'bg-transparent', border: 'border-transparent' }
  return dynamicColors[dayRating - 1]
}