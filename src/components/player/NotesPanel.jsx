import { useEffect, useState } from 'react'

export function NotesPanel({ lessonId }) {
  const storageKey = `ledger:notes:${lessonId}`
  const [note, setNote] = useState('')

  useEffect(() => {
    try {
      setNote(localStorage.getItem(storageKey) ?? '')
    } catch {
      setNote('')
    }
  }, [storageKey])

  function handleChange(e) {
    const value = e.target.value
    setNote(value)
    try {
      localStorage.setItem(storageKey, value)
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="lesson-notes" className="text-body-sm font-medium text-ink">
        Your notes
      </label>
      <textarea
        id="lesson-notes"
        value={note}
        onChange={handleChange}
        rows={6}
        placeholder="Jot down anything worth remembering from this lesson…"
        className="rounded-card border border-border bg-surface-0 px-3.5 py-2.5 text-body-sm text-ink placeholder:text-ink-soft/60 focus:border-accent transition-colors resize-none"
      />
      <p className="text-caption text-ink-soft">Saved automatically on this device.</p>
    </div>
  )
}
