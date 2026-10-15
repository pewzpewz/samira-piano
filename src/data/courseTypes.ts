export type Exercise = {
  id: string
  prompt: string
  choices: string[]
  answer: number
  explain: string
}

export type Lesson = {
  id: string
  title: string
  goal: string
  plain: string[]
  look: string
  exercises: Exercise[]
}

export type Module = {
  id: number
  slug: string
  title: string
  blurb: string
  locked?: boolean
  lessons: Lesson[]
}
