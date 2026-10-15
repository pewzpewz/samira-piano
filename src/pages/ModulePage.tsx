import { Link, Navigate, useParams } from 'react-router-dom'
import { getModule } from '../data/course'
import { useProgress } from '../progress'
import './course.css'

export function ModulePage() {
  const { moduleId = '' } = useParams()
  const mod = getModule(moduleId)
  const { isComplete, isStudied } = useProgress()

  if (!mod) return <Navigate to="/course" replace />
  if (mod.locked || mod.lessons.length === 0) {
    return (
      <div className="module-page">
        <p className="crumb">
          <Link to="/course">Course</Link> · Module {mod.id}
        </p>
        <h1>{mod.title}</h1>
        <p className="lede">This module is not available. Return to the course path.</p>
        <div className="complete-row">
          <Link className="btn btn-primary" to="/course">
            Course path
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="module-page">
      <p className="crumb">
        <Link to="/course">Course</Link> · Module {mod.id}
      </p>
      <header className="page-intro">
        <p className="eyebrow">Module {mod.id}</p>
        <h1>{mod.title}</h1>
        <p className="lede">
          {mod.blurb} Each lesson: learn on one page, then lock it in with a
          separate test.
        </p>
      </header>
      <ol className="lesson-list">
        {mod.lessons.map((lesson, i) => (
          <li key={lesson.id} className="lesson-row">
            <div className="lesson-row-main">
              <span className="lesson-title">
                {i + 1}. {lesson.title}
              </span>
              <span className="lesson-status">
                {isComplete(lesson.id)
                  ? 'Test done'
                  : isStudied(lesson.id)
                    ? 'Studied'
                    : 'New'}
              </span>
            </div>
            <div className="lesson-actions">
              <Link className="btn btn-ghost" to={`/course/m/${mod.slug}/l/${lesson.id}`}>
                Learn
              </Link>
              <Link
                className="btn btn-primary"
                to={`/course/m/${mod.slug}/l/${lesson.id}/test`}
              >
                Test
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
