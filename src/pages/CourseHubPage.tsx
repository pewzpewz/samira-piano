import { Link } from 'react-router-dom'
import { COURSE_SUBTITLE, COURSE_TITLE, modules } from '../data/course'
import { useProgress } from '../progress'
import './course.css'

export function CourseHubPage() {
  const { isComplete } = useProgress()

  return (
    <div className="course-page">
      <header className="page-intro">
        <p className="eyebrow">{COURSE_TITLE}</p>
        <h1>Course path</h1>
        <p className="lede">{COURSE_SUBTITLE}</p>
      </header>

      <ol className="module-list">
        {modules.map((mod) => {
          const done = mod.lessons.filter((l) => isComplete(l.id)).length
          const total = mod.lessons.length
          const open = !mod.locked && total > 0

          return (
            <li key={mod.id} className={`module-row ${open ? '' : 'is-locked'}`}>
              <div className="module-index">{String(mod.id).padStart(2, '0')}</div>
              <div className="module-body">
                <h2>{mod.title}</h2>
                <p>{mod.blurb}</p>
                {open ? (
                  <p className="module-meta">
                    {done}/{total} tests complete
                  </p>
                ) : (
                  <p className="module-meta">Coming next</p>
                )}
              </div>
              {open ? (
                <Link className="btn btn-primary" to={`/course/m/${mod.slug}`}>
                  Open
                </Link>
              ) : (
                <span className="lock-label">Soon</span>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
