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

  const commonStyles = `h-10 border-solid border-2 rounded-md my-5`

  if (!entry) {
    return (
      <div className={`flex flex-col gap-0 animate-pulse w-3`} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <div className={`${commonStyles} border-white`}></div>
        <div className={`tracking-widest absolute mt-16`}>{new Date().toLocaleDateString()}</div>
      </div>
    )
  }

  const { day_rating: dayRating, created_at: createdAt } = entry
  const { bg, border } = getColorsFromRating(dayRating)
  const injectedStyles = `${bg} ${border} ${commonStyles}`

  return (
    <div className={`flex flex-col gap-0 w-3`} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className={injectedStyles}></div>
      <div className={`${isHovering ? 'opacity-100' : 'opacity-0'} transition tracking-widest text-black px-2 z-10 absolute mt-16 bg-white border-solid border-2 border-gray-400 rounded-md`}>{new Date(createdAt).toLocaleDateString()}</div>
    </div>
  )
}
