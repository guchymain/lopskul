import { Icon } from '../ui/Icon.jsx'

export function VideoPlayer({ lessonTitle, videoUrl, onMarkComplete, completed }) {
  return (
    <div className="rounded-card overflow-hidden bg-ink text-paper">
      {videoUrl ? (
        <video className="aspect-video w-full bg-black" controls preload="metadata">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="aspect-video flex flex-col items-center justify-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/10">
            <Icon name="layers" size={28} />
          </span>
          <p className="text-body-sm text-paper/70 px-6 text-center">{lessonTitle}</p>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-ink/95 border-t border-paper/10">
        <span className="text-caption text-paper/70">{lessonTitle}</span>
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
