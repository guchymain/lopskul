import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCourseById } from '../../data/fixtures/courses.js'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

const initialQuestions = [
  { id: 1, author: 'Femi A.', question: 'Do I need to know Python before starting?', answered: true },
  { id: 2, author: 'Ivy T.', question: 'Is the capstone dataset the same for everyone?', answered: true },
  { id: 3, author: 'Noah B.', question: 'Can I use R instead of Python for the exercises?', answered: false },
]

export function QnAModeration() {
  const { id } = useParams()
  const course = getCourseById(id)
  const [questions, setQuestions] = useState(initialQuestions)
  const [drafts, setDrafts] = useState({})

  function handleAnswer(qId) {
    if (!drafts[qId]?.trim()) return
    setQuestions((qs) => qs.map((q) => (q.id === qId ? { ...q, answered: true } : q)))
  }

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[800px] mx-auto">
      <Link to="/instructor/courses" className="text-body-sm text-ink-soft hover:text-ink mb-4 inline-block">← Back to courses</Link>
      <h1 className="text-heading-1 font-display font-semibold text-ink mb-1">Q&A moderation</h1>
      <p className="text-body-sm text-ink-soft mb-6">{course?.title}</p>

      <div className="flex flex-col gap-4">
        {questions.map((q) => (
          <Card key={q.id} className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-body-sm font-medium text-ink">{q.author} asked</p>
              {q.answered ? (
                <span className="flex items-center gap-1 text-caption text-proof"><Icon name="check" size={13} /> Answered</span>
              ) : (
                <span className="text-caption text-warning">Needs response</span>
              )}
            </div>
            <p className="text-body-sm text-ink">{q.question}</p>
            {!q.answered && (
              <div className="flex gap-2">
                <input
                  value={drafts[q.id] ?? ''}
                  onChange={(e) => setDrafts((d) => ({ ...d, [q.id]: e.target.value }))}
                  placeholder="Write a reply…"
                  className="flex-1 rounded-card border border-border bg-surface-0 px-3 py-2 text-body-sm focus:border-accent"
                />
                <Button variant="accent" size="sm" onClick={() => handleAnswer(q.id)}>Reply</Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
