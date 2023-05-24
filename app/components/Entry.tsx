export default function Entry({ data }) {
  const dynamicColors = [
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
      border: 'border-yellow-500'
    },
  ]

  const {bg, border} = dynamicColors[data.day_rating - 1]

  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="self-center opacity-30 text-xs tracking-widest">{new Date(data.created_at).toLocaleDateString()}</span>
      </div>
      <div className={`flex h-16 rounded-lg border-solid border-2 px-5 gap-5 text-black grow ${bg} ${border}`}>
        <span className="self-center">{data.body}</span>
        <span className="self-center grow text-right">{data.day_rating}</span>
      </div>
    </div>
  )
}