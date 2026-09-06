import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { getThreadById } from '../../data/fixtures/threads.js'
import { getUserById } from '../../data/fixtures/users.js'
import { getInstructorById } from '../../data/fixtures/instructors.js'
import { useAuth } from '../../hooks/useAuth.js'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Badge } from '../../components/ui/Badge.jsx'

function authorName(authorId) {
  return getUserById(authorId)?.name ?? getInstructorById(authorId)?.name ?? 'Ledger member'
}

export function ThreadDetail() {
  const { threadId } = useParams()
  const { user } = useAuth()
  const thread = getThreadById(threadId)
  const [replies, setReplies] = useState(thread?.replies ?? [])
  const [draft, setDraft] = useState('')

  if (!thread) return <Navigate to="/community" replace />

  function handleReply(e) {
    e.preventDefault()
    if (!draft.trim()) return
    setReplies((r) => [...r, { id: `local-${r.length}`, authorId: user.id, body: draft, createdAt: new Date().toISOString() }])
    setDraft('')
  }

  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-12">
      <Link to="/community" className="text-body-sm text-ink-soft hover:text-ink mb-4 inline-block">← Back to community</Link>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {thread.tags.map((tag) => <Badge key={tag} tone="neutral">{tag}</Badge>)}
      </div>
      <h1 className="text-heading-1 font-display font-semibold text-ink mb-2">{thread.title}</h1>
      <p className="text-caption text-ink-soft mb-8">
        Started by {authorName(thread.authorId)} on {new Date(thread.createdAt).toLocaleDateString()}
      </p>

      <div className="flex flex-col gap-4 mb-8">
        {replies.map((reply) => (
          <Card key={reply.id} className="p-4">
            <p className="text-body-sm font-medium text-ink mb-1">{authorName(reply.authorId)}</p>
            <p className="text-body-sm text-ink-soft">{reply.body}</p>
          </Card>
        ))}
        {replies.length === 0 && <p className="text-body-sm text-ink-soft">No replies yet — be the first.</p>}
      </div>

      <form onSubmit={handleReply} className="flex flex-col gap-3">
        <label htmlFor="reply" className="text-body-sm font-medium text-ink">Add a reply</label>
        <textarea
          id="reply"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          placeholder="Share your thoughts…"
          className="rounded-card border border-border bg-surface-0 px-3.5 py-2.5 text-body-sm focus:border-accent resize-none"
        />
        <Button type="submit" variant="accent" size="md" className="self-start">Post reply</Button>
      </form>
    </div>
  )
}
