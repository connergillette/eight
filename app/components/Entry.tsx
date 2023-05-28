import { getColorsFromRating } from '~/colors'

type Props = {
  data: EntryData
}

export type EntryData = {
  id: number,
  created_at: Date,
  day_rating: number,
  body: string,
}

export default function Entry({ data }: Props) {
  const { day_rating: dayRating } = data

  const { bg, border } = getColorsFromRating(dayRating)

  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="self-center opacity-30 text-xs tracking-widest">{new Date(data.created_at).toLocaleDateString()}</span>
      </div>
      <div className={`flex rounded-lg min-h-16 px-5 py-3 gap-5 text-black grow border-solid border-2 ${bg} ${border}`}>
        <span className="self-center">{data.body}</span>
        <span className="self-center grow text-right font-bold">{data.day_rating}</span>
      </div>
    </div>
  )
}