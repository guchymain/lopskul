import { useState } from 'react'
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom'
import { getCourseById } from '../../data/fixtures/courses.js'
import { getQuizById, scoreQuiz } from '../../data/fixtures/quizzes.js'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Icon } from '../../components/ui/Icon.jsx'

export function QuizRunner() {
  const { courseId, quizId } = useParams()
  const navigate = useNavigate()
  const course = getCourseById(courseId)
  const quiz = getQuizById(quizId)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  if (!course || !quiz) return <Navigate to="/dashboard/my-learning" replace />

  const question = quiz.questions[index]
  const isLast = index === quiz.questions.length - 1

  function selectSingle(option) {
    setAnswers((a) => ({ ...a, [question.id]: option }))
  }

  function toggleMulti(option) {
    setAnswers((a) => {
      const current = new Set(a[question.id] ?? [])
      current.has(option) ? current.delete(option) : current.add(option)
      return { ...a, [question.id]: [...current] }
    })
  }

  function handleNext() {
    if (isLast) {
      setResult(scoreQuiz(quiz, answers))
    } else {
      setIndex((i) => i + 1)
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <Card className="p-8 flex flex-col items-center gap-4 text-center">
          <span className={`h-16 w-16 rounded-full flex items-center justify-center ${result.passed ? 'bg-proof-soft text-proof' : 'bg-accent-soft text-accent-strong'}`}>
            <Icon name={result.passed ? 'check' : 'spark'} size={28} />
          </span>
          <h1 className="text-heading-1 font-display font-semibold text-ink">
            {result.passed ? 'Nice work — you passed' : 'Almost there'}
          </h1>
          <p className="text-body text-ink-soft">
            You scored {result.correct}/{result.total} ({result.percent}%). {result.passed ? '' : `A ${quiz.passScore}% score is needed to pass.`}
          </p>
          <div className="flex gap-3 pt-2">
            {!result.passed && (
              <Button variant="ghost" size="md" onClick={() => { setResult(null); setIndex(0); setAnswers({}) }}>
                Retake quiz
              </Button>
            )}
            <Button variant="accent" size="md" onClick={() => navigate(`/learn/${course.id}/complete`)}>
              Continue
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const given = answers[question.id]
  const canContinue = question.type === 'single' ? Boolean(given) : (given ?? []).length > 0

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <Link to={`/learn/${course.id}/${course.curriculum[0].lessons[0].id}`} className="text-body-sm text-ink-soft hover:text-ink mb-4 inline-block">
        ← Back to course
      </Link>
      <Card className="p-8 flex flex-col gap-6">
        <div>
          <p className="text-caption text-ink-soft mb-2">Question {index + 1} of {quiz.questions.length}</p>
          <h1 className="text-heading-2 font-display font-semibold text-ink">{question.prompt}</h1>
        </div>
        <div className="flex flex-col gap-2.5">
          {question.options.map((option) => {
            const selected = question.type === 'single' ? given === option : (given ?? []).includes(option)
            return (
              <button
                key={option}
                onClick={() => (question.type === 'single' ? selectSingle(option) : toggleMulti(option))}
                aria-pressed={selected}
                className={`text-left rounded-card border p-4 text-body-sm transition-colors ${
                  selected ? 'border-accent bg-accent-soft text-ink' : 'border-border hover:bg-surface-1 text-ink'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
        <Button variant="accent" size="lg" onClick={handleNext} disabled={!canContinue}>
          {isLast ? 'Submit quiz' : 'Next question'}
        </Button>
      </Card>
    </div>
  )
}
