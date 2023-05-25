import { useState } from 'react'
import { getColorsFromRating } from '~/colors'

export default function TimelineChip({ entry }) {
  const [isHovering, setIsHovering] = useState(false)

  const { day_rating: dayRating, created_at: createdAt } = entry
  const { bg, border } = getColorsFromRating(dayRating)
  const injectedStyles = `${bg} ${border} h-10 border-solid border-2 w-2 rounded-md my-5`

  return (
    <div className={`flex flex-col w-2 gap-0`} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className={injectedStyles}></div>
      <div className={`${isHovering ? 'opacity-60' : 'opacity-0'}`}>{new Date(createdAt).toLocaleDateString()}</div>
    </div>
  )
}
