export const quizzes = [
  {
    id: 'q-1',
    courseId: 'c-1',
    title: 'SQL Fundamentals Check',
    passScore: 70,
    questions: [
      {
        id: 'q1-1',
        type: 'single',
        prompt: 'Which JOIN type returns all rows from the left table, matched rows from the right?',
        options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'FULL OUTER JOIN'],
        correctAnswer: 'LEFT JOIN',
      },
      {
        id: 'q1-2',
        type: 'single',
        prompt: 'A window function like RANK() OVER (...) operates on:',
        options: [
          'The entire table only',
          'A partition of rows, without collapsing them',
          'Only aggregated results',
          'A single row at a time with no context',
        ],
        correctAnswer: 'A partition of rows, without collapsing them',
      },
      {
        id: 'q1-3',
        type: 'multi',
        prompt: 'Which of the following are valid reasons a JOIN might silently duplicate rows? (select all)',
        options: [
          'A one-to-many relationship joined without aggregation',
          'Joining on a non-unique key',
          'Using SELECT *',
          'A missing WHERE clause after a fan-out join',
        ],
        correctAnswer: [
          'A one-to-many relationship joined without aggregation',
          'Joining on a non-unique key',
          'A missing WHERE clause after a fan-out join',
        ],
      },
    ],
  },
]

export function getQuizById(id) {
  return quizzes.find((q) => q.id === id)
}

export function getQuizzesForCourse(courseId) {
  return quizzes.filter((q) => q.courseId === courseId)
}

export function scoreQuiz(quiz, answers) {
  let correct = 0
  for (const question of quiz.questions) {
    const given = answers[question.id]
    if (question.type === 'single') {
      if (given === question.correctAnswer) correct += 1
    } else if (question.type === 'multi') {
      const givenSet = new Set(given ?? [])
      const correctSet = new Set(question.correctAnswer)
      const same =
        givenSet.size === correctSet.size && [...givenSet].every((v) => correctSet.has(v))
      if (same) correct += 1
    }
  }
  const percent = Math.round((correct / quiz.questions.length) * 100)
  return { correct, total: quiz.questions.length, percent, passed: percent >= quiz.passScore }
}
