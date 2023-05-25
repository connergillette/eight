import TimelineChip from './TimelineChip';

export default function Timeline({ entries, entrySubmittedToday }) {
  const entriesChronological = entries.slice().reverse()
  return (
    <div className="flex flex-col">
      <div className="opacity-30 text-xs tracking-widest">Timeline</div>
      <div className="flex gap-1 px-2 w-full">
        {
          entriesChronological.map((entry) => (
            <TimelineChip key={`chip-${entry.id}`} entry={entry} />
            ))
          }
        {
          !entrySubmittedToday && (<TimelineChip key='chip-empty' />)
        }
      </div>
    </div>
  )
}