import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'samira-piano-progress-v2'

type Store = {
  studied: Record<string, boolean>
  completed: Record<string, boolean>
}

type ProgressState = Store & {
  markStudied: (lessonId: string) => void
  markComplete: (lessonId: string) => void
  isStudied: (lessonId: string) => boolean
  isComplete: (lessonId: string) => boolean
}

const ProgressContext = createContext<ProgressState | null>(null)

function load(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { studied: {}, completed: {} }
    const parsed = JSON.parse(raw) as Partial<Store>
    return {
      studied: parsed.studied ?? {},
      completed: parsed.completed ?? {},
    }
  } catch {
    return { studied: {}, completed: {} }
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store>({ studied: {}, completed: {} })

  useEffect(() => {
    setStore(load())
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  }, [store])

  const value = useMemo<ProgressState>(
    () => ({
      ...store,
      markStudied: (lessonId: string) =>
        setStore((prev) => ({
          ...prev,
          studied: { ...prev.studied, [lessonId]: true },
        })),
      markComplete: (lessonId: string) =>
        setStore((prev) => ({
          ...prev,
          completed: { ...prev.completed, [lessonId]: true },
        })),
      isStudied: (lessonId: string) => Boolean(store.studied[lessonId]),
      isComplete: (lessonId: string) => Boolean(store.completed[lessonId]),
    }),
    [store],
  )

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
