import { useEffect, useRef, useState } from 'react'
import './introMusic.css'

const FLAG = 'samira-local-intro-v2'
const INTRO_SRC = '/audio/intro.mp3'
const INTRO_FALLBACK = '/audio/intro.ogg'

function playIntro(audio: HTMLAudioElement): Promise<void> {
  audio.currentTime = 0
  audio.volume = 0.85
  return audio.play().then(() => undefined)
}

export function IntroMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(FLAG) === '1') return

    const audio = new Audio(INTRO_SRC)
    audio.preload = 'auto'
    audioRef.current = audio

    // Prefer mp3; if it fails to load, try ogg
    const onError = () => {
      if (audio.src.endsWith('intro.mp3')) {
        audio.src = INTRO_FALLBACK
        audio.load()
      }
    }
    audio.addEventListener('error', onError)

    const markDone = () => {
      sessionStorage.setItem(FLAG, '1')
      setShowHint(false)
    }

    audio.addEventListener('ended', markDone)

    const tryPlay = () =>
      playIntro(audio)
        .then(() => {
          // playing — keep hint hidden
          setShowHint(false)
        })
        .catch(() => {
          setShowHint(true)
        })

    void tryPlay()

    const onGesture = () => {
      if (sessionStorage.getItem(FLAG) === '1') return
      void tryPlay()
    }
    window.addEventListener('pointerdown', onGesture, { once: true })
    window.addEventListener('keydown', onGesture, { once: true })

    const hintTimer = window.setTimeout(() => {
      if (sessionStorage.getItem(FLAG) !== '1' && audio.paused) {
        setShowHint(true)
      }
    }, 700)

    return () => {
      window.clearTimeout(hintTimer)
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('keydown', onGesture)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('ended', markDone)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  return showHint ? (
    <button
      type="button"
      className="intro-music-hint"
      onClick={() => {
        const audio = audioRef.current ?? new Audio(INTRO_SRC)
        audioRef.current = audio
        void playIntro(audio)
          .then(() => {
            sessionStorage.setItem(FLAG, '1')
            setShowHint(false)
            audio.onended = () => sessionStorage.setItem(FLAG, '1')
          })
          .catch(() => {
            // still blocked somehow
            setShowHint(true)
          })
      }}
    >
      Play opening · Mozart (8 sec)
    </button>
  ) : null
}
