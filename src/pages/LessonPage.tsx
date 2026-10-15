import { Link, Navigate, useParams } from 'react-router-dom'
import { LessonDemo } from '../components/demos/LessonDemo'
import { adjacentLessons, getLesson } from '../data/course'
import { useProgress } from '../progress'
import './course.css'

export function LessonPage() {
  const { moduleId = '', lessonId = '' } = useParams()
  const found = getLesson(moduleId, lessonId)
  const { prev, next } = adjacentLessons(moduleId, lessonId)
  const { isComplete, isStudied, markStudied } = useProgress()

  if (!found) return <Navigate to="/course" replace />
  const { module, lesson, index } = found

  return (
    <div className="lesson-page">
      <p className="crumb">
        <Link to="/course">Course</Link> ·{' '}
        <Link to={`/course/m/${module.slug}`}>Module {module.id}</Link> · Learn
      </p>

      <nav className="lesson-chrome" aria-label="Lesson">
        {prev ? (
          <Link to={`/course/m/${module.slug}/l/${prev.id}`}>← Previous lesson</Link>
        ) : (
          <Link to={`/course/m/${module.slug}`}>← Module contents</Link>
        )}
        <Link to={`/course/m/${module.slug}`}>Contents</Link>
        {next ? (
          <Link to={`/course/m/${module.slug}/l/${next.id}`}>Next lesson →</Link>
        ) : (
          <Link to="/course">Course hub →</Link>
        )}
      </nav>

      <div className="lesson-layout">
        <article className="lesson-content">
          <p className="eyebrow">
            Module {module.id} · Lesson {index + 1} · Study
          </p>
          <h1>{lesson.title}</h1>

          <div className="goal-box">
            <strong>Goal</strong>
            {lesson.goal}
          </div>

          <h2 className="sr-only">In plain words</h2>
          {lesson.plain.map((para) => (
            <p key={para}>{para}</p>
          ))}

          <section className="learn-demo" aria-label="Interactive demo">
            <h2 className="demo-section-title">Try it</h2>
            <LessonDemo lessonId={lesson.id} />
          </section>

          <div className="look-box">
            <strong className="eyebrow">Look / remember</strong>
            <p style={{ marginBottom: 0 }}>{lesson.look}</p>
          </div>

          <div className="study-cta">
            <p>
              Read this page carefully. When you feel ready, take the test on a
              separate page — no quiz here.
            </p>
            <Link
              className="btn btn-primary"
              to={`/course/m/${module.slug}/l/${lesson.id}/test`}
              onClick={() => markStudied(lesson.id)}
            >
              I’m ready — take the test
            </Link>
            {isStudied(lesson.id) && !isComplete(lesson.id) ? (
              <p className="meta-line">Studied · test not finished yet</p>
            ) : null}
            {isComplete(lesson.id) ? (
              <p className="meta-line done-line">Lesson test completed</p>
            ) : null}
          </div>
        </article>

        <aside className="side-nav" aria-label="Module lessons">
          <h2>In this module</h2>
          <ol>
            {module.lessons.map((item, i) => (
              <li key={item.id}>
                <Link
                  to={`/course/m/${module.slug}/l/${item.id}`}
                  className={[
                    item.id === lesson.id ? 'is-current' : '',
                    isComplete(item.id) ? 'is-done' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {i + 1}. {item.title}
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  )
}
