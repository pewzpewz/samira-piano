import { Link } from 'react-router-dom'
import './course.css'

export function AboutPage() {
  return (
    <div className="about-page">
      <header className="page-intro">
        <p className="eyebrow">About</p>
        <h1>Samira Piano</h1>
        <p className="lede">
          A calm beginner path for hearing and understanding how music is built —
          in plain English.
        </p>
      </header>
      <p>
        This first version opens with Module 1: written notes on the staff and
        how they match the piano. Then sound and letter names, a deeper staff
        map, rhythm, intervals, scale structure, and tonic / subdominant /
        dominant.
      </p>
      <p>
        Built for students and for teaching — one clear step at a time, without
        jargon walls.
      </p>
      <Link className="btn btn-primary" to="/course">
        Open the course
      </Link>
    </div>
  )
}
