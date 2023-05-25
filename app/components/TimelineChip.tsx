import { useState } from 'react'

export default function TimelineChip({ entry }) {
  const [isHovering, setIsHovering] = useState(false)

  const { day_rating, created_at } = entry
  const backgroundColor = `bg-yellow-${day_rating * 100 - 100}`
  const borderColor = `border-orange-${day_rating * 100 - 100}`
  const injectedStyles = `${backgroundColor} ${borderColor} border-solid border-2 w-2 h-10 rounded-md my-5`

  return (
    <div className={`flex flex-col w-2 gap-0`} onMouseOver={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className={injectedStyles}></div>
      <div className={`${isHovering ? 'opacity-100' : 'opacity-0'}`}>{new Date(created_at).toLocaleDateString()}</div>
    </div>
  )
}
