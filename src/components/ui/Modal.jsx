import { useEffect, useRef } from 'react'
import { Icon } from './Icon.jsx'

export function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    dialogRef.current?.focus()
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative z-10 w-full max-w-md rounded-card bg-surface-0 border border-border shadow-xl p-6 outline-none"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="text-heading-3 text-ink">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-ink-soft hover:text-ink rounded-full p-1 -m-1"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
