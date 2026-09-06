import { useState } from 'react'
import { Icon } from '../ui/Icon.jsx'

const SPEEDS = [0.75, 1, 1.25, 1.5, 2]

export function VideoPlayer({ lessonTitle, onMarkComplete, completed }) {
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [captionsOn, setCaptionsOn] = useState(true)

  return (
    <div className="rounded-card overflow-hidden bg-ink text-paper">
      <div className="aspect-video flex flex-col items-center justify-center gap-4 relative">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="h-16 w-16 rounded-full bg-paper/10 hover:bg-paper/20 flex items-center justify-center transition-colors"
          aria-label={playing ? 'Pause video' : 'Play video'}
        >
          <Icon name={playing ? 'check' : 'play'} size={28} />
        </button>
        <p className="text-body-sm text-paper/70 px-6 text-center">{lessonTitle}</p>
        {captionsOn && (
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-ink/80 text-caption px-2 py-1 rounded">
            Captions on — this is a prototype player, no real video is loaded.
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-ink/95 border-t border-paper/10">
        <div className="flex items-center gap-3">
          <label className="text-caption text-paper/70 flex items-center gap-1.5">
            Speed
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="bg-transparent border border-paper/20 rounded px-1.5 py-0.5 text-caption"
            >
              {SPEEDS.map((s) => (
                <option key={s} value={s} className="text-ink">
                  {s}x
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={() => setCaptionsOn((c) => !c)}
            aria-pressed={captionsOn}
            className={`text-caption px-2 py-1 rounded border ${
              captionsOn ? 'border-accent text-accent' : 'border-paper/20 text-paper/70'
            }`}
          >
            CC
          </button>
        </div>
        <button
          onClick={onMarkComplete}
          disabled={completed}
          className="flex items-center gap-1.5 text-caption font-medium text-accent disabled:text-proof disabled:opacity-100"
        >
          <Icon name="check" size={14} />
          {completed ? 'Lesson complete' : 'Mark as complete'}
        </button>
      </div>
    </div>
  )
}
