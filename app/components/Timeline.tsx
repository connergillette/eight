import TimelineChip from './TimelineChip';

export default function Timeline({ entries, entrySubmittedToday }) {
  const entriesChronological = entries.slice().reverse()
  return (
    <div className="flex flex-col">
      <div className="opacity-30 text-xs tracking-widest">Timeline</div>
      {
        entries.length === 0 && (
          <span className="font-bold opacity-50 text-center">Your Timeline will populate after you've saved your first entry.</span>
        )
      }
      {
        entries.length > 0 && (
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
        )
      }
      
    </div>
  )
}