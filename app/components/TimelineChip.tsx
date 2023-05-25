import { useState } from 'react'
import { getColorsFromRating } from '~/colors'

interface Entry {
  id: number,
  day_rating: number,
  created_at: Date,
  body: Text,
}
interface TimelineChipProps {
  entry?: Entry
}

export default function TimelineChip({ entry }: TimelineChipProps) {
  const [isHovering, setIsHovering] = useState(false)

  const commonStyles = `h-10 border-solid border-2 w-2 rounded-md my-5`

  if (!entry) {
    return (
      <div className={`flex flex-col w-2 gap-0 animate-pulse`} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <div className={`${commonStyles} border-white`}></div>
        <div className={`${isHovering ? 'opacity-60' : 'opacity-0'} tracking-widest`}>{new Date().toLocaleDateString()}</div>
      </div>
    )
  }

  const { day_rating: dayRating, created_at: createdAt } = entry
  const { bg, border } = getColorsFromRating(dayRating)
  const injectedStyles = `${bg} ${border} ${commonStyles}`

  return (
    <div className={`flex flex-col w-2 gap-0`} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className={injectedStyles}></div>
      <div className={`${isHovering ? 'opacity-60' : 'opacity-0'} tracking-widest`}>{new Date(createdAt).toLocaleDateString()}</div>
    </div>
  )
}
