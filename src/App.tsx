import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { CourseHubPage } from './pages/CourseHubPage'
import { HomePage } from './pages/HomePage'
import { LessonPage } from './pages/LessonPage'
import { ModulePage } from './pages/ModulePage'
import { TestPage } from './pages/TestPage'
import { ProgressProvider } from './progress'

export default function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="course" element={<CourseHubPage />} />
          <Route path="course/m/:moduleId" element={<ModulePage />} />
          <Route path="course/m/:moduleId/l/:lessonId" element={<LessonPage />} />
          <Route
            path="course/m/:moduleId/l/:lessonId/test"
            element={<TestPage />}
          />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </ProgressProvider>
  )
}
