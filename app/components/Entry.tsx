export default function Entry({ data }) {
  const { day_rating: dayRating } = data

  const bg = `bg-yellow-${dayRating * 100 - 100}`
  const border = `border-solid border-2 border-orange-${dayRating * 100 - 100}`

  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="self-center opacity-30 text-xs tracking-widest">{new Date(data.created_at).toLocaleDateString()}</span>
      </div>
      <div className={`flex h-16 rounded-lg px-5 gap-5 text-black grow ${bg} ${border}`}>
        <span className="self-center">{data.body}</span>
        <span className="self-center grow text-right">{data.day_rating}</span>
      </div>
    </div>
  )
}