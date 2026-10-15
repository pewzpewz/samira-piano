import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { playCorrectSound, playWrongSound } from '../audio/feedbackSounds'
import { getLesson, type Exercise } from '../data/course'
import { useProgress } from '../progress'
import './course.css'

function Burst() {
  return (
    <span className="answer-burst" aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className={`answer-burst-dot d${i}`} />
      ))}
    </span>
  )
}

function ExerciseItem({
  exercise,
  onSolved,
}: {
  exercise: Exercise
  onSolved: () => void
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const [flash, setFlash] = useState<'ok' | 'bad' | null>(null)
  const revealed = picked !== null
  const correct = picked === exercise.answer

  useEffect(() => {
    if (!flash) return
    const t = window.setTimeout(() => setFlash(null), 900)
    return () => window.clearTimeout(t)
  }, [flash])

  const choose = (i: number) => {
    if (revealed) return
    setPicked(i)
    const ok = i === exercise.answer
    setFlash(ok ? 'ok' : 'bad')
    if (ok) {
      void playCorrectSound()
      onSolved()
    } else {
      void playWrongSound()
    }
  }

  return (
    <div
      className={[
        'exercise',
        revealed && correct ? 'exercise-ok' : '',
        revealed && !correct ? 'exercise-bad' : '',
        flash === 'ok' ? 'is-flash-ok' : '',
        flash === 'bad' ? 'is-flash-bad' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {flash === 'ok' ? <Burst /> : null}
      <div className="exercise-head">
        <p className="exercise-prompt">{exercise.prompt}</p>
        {revealed ? (
          <span className={`answer-badge ${correct ? 'ok' : 'bad'}`}>
            {correct ? 'Correct' : 'Not quite'}
          </span>
        ) : (
          <span className="answer-badge wait">Your turn</span>
        )}
      </div>
      <div className="choices">
        {exercise.choices.map((choice, i) => {
          let cls = 'choice'
          if (revealed && i === exercise.answer) cls += ' is-correct'
          if (revealed && i === picked && !correct) cls += ' is-wrong'
          if (!revealed && i === picked) cls += ' is-selected'
          return (
            <button
              key={choice}
              type="button"
              className={cls}
              disabled={revealed}
              onClick={() => choose(i)}
            >
              <span className="choice-label">{choice}</span>
              {revealed && i === exercise.answer ? (
                <span className="choice-mark" aria-hidden="true">
                  ✓
                </span>
              ) : null}
              {revealed && i === picked && !correct ? (
                <span className="choice-mark wrong" aria-hidden="true">
                  ✕
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
      {revealed ? (
        <p className={`feedback ${correct ? 'feedback-ok' : 'feedback-bad'}`}>
          {correct ? 'Yes — well remembered. ' : 'Close — look again: '}
          {exercise.explain}
        </p>
      ) : null}
    </div>
  )
}

export function TestPage() {
  const { moduleId = '', lessonId = '' } = useParams()
  const found = getLesson(moduleId, lessonId)
  const { isStudied, isComplete, markComplete } = useProgress()
  const [solved, setSolved] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setSolved({})
  }, [lessonId])

  if (!found) return <Navigate to="/course" replace />
  const { module, lesson, index } = found

  const allSolved =
    lesson.exercises.length === 0 ||
    lesson.exercises.every((ex) => solved[ex.id])

  if (!isStudied(lesson.id)) {
    return (
      <div className="test-page">
        <p className="crumb">
          <Link to="/course">Course</Link> · Module {module.id} · Test locked
        </p>
        <h1>Study first</h1>
        <p className="lede">
          Open the lesson, learn the ideas, then return here to lock them in.
        </p>
        <Link
          className="btn btn-primary"
          to={`/course/m/${module.slug}/l/${lesson.id}`}
        >
          Go to the lesson
        </Link>
      </div>
    )
  }

  return (
    <div className="test-page">
      <p className="crumb">
        <Link to="/course">Course</Link> ·{' '}
        <Link to={`/course/m/${module.slug}`}>Module {module.id}</Link> ·{' '}
        <Link to={`/course/m/${module.slug}/l/${lesson.id}`}>Learn</Link> · Test
      </p>

      <header className="page-intro">
        <p className="eyebrow">
          Test · Module {module.id} · Lesson {index + 1}
        </p>
        <h1>{lesson.title}</h1>
        <p className="lede">
          No new teaching here — only recall. Answer every question, then mark
          complete.
        </p>
      </header>

      <section className="exercise-block test-block" aria-label="Test">
        {lesson.exercises.map((ex) => (
          <ExerciseItem
            key={`${lessonId}-${ex.id}`}
            exercise={ex}
            onSolved={() => setSolved((s) => ({ ...s, [ex.id]: true }))}
          />
        ))}

        <div className="complete-row">
          <button
            type="button"
            className={`btn btn-primary ${allSolved ? 'btn-celebrate' : ''}`}
            disabled={!allSolved}
            onClick={() => markComplete(lesson.id)}
          >
            {isComplete(lesson.id) ? 'Test complete' : 'Mark test complete'}
          </button>
          <Link className="btn btn-ghost" to={`/course/m/${module.slug}/l/${lesson.id}`}>
            Back to lesson
          </Link>
          <Link className="btn btn-ghost" to={`/course/m/${module.slug}`}>
            Module contents
          </Link>
        </div>
      </section>
    </div>
  )
}
