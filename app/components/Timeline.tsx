import TimelineChip from './TimelineChip';

export default function Timeline({ entries }) {
  const entriesChronological = entries.slice().reverse()
  return (
    <div className="flex gap-1 px-2">
      {
        entriesChronological.map((entry) => (
          <TimelineChip key={`chip-${entry.id}`} entry={entry} />
        ))
      }
    </div>
  )
}