import { useEffect, useState } from 'react'
import {
  BLACK_KEYS,
  WHITE_KEYS,
  ensurePianoSamples,
  onPianoNote,
  playMidi,
} from '../../audio/pianoAudio'
import { NoteStaff } from './NoteStaff'
import './piano.css'

type Props = {
  highlight?: number[]
  labels?: boolean
  dimOthers?: boolean
  caption?: string
  showStaff?: boolean
  onPlay?: (midi: number) => void
}

export function PianoKeyboard({
  highlight = [],
  labels = true,
  dimOthers = false,
  caption,
  showStaff = true,
  onPlay,
}: Props) {
  const [active, setActive] = useState<number | null>(null)
  const [staffMidi, setStaffMidi] = useState<number | null>(null)
  const hi = new Set(highlight)

  useEffect(() => {
    void ensurePianoSamples()
  }, [])

  useEffect(() => {
    return onPianoNote((midi) => {
      setStaffMidi(midi)
      setActive(midi)
      window.setTimeout(() => {
        setActive((cur) => (cur === midi ? null : cur))
        setStaffMidi((cur) => (cur === midi ? null : cur))
      }, 420)
    })
  }, [])

  const press = async (midi: number) => {
    await playMidi(midi)
    onPlay?.(midi)
  }

  return (
    <div className="piano-wrap">
      {caption ? <p className="demo-caption">{caption}</p> : null}
      {showStaff ? (
        <NoteStaff
          activeMidi={staffMidi}
          highlight={staffMidi == null ? highlight : []}
        />
      ) : null}
      <div className="piano" role="group" aria-label="Piano keyboard">
        <div className="piano-whites">
          {WHITE_KEYS.map((k) => {
            const on = hi.has(k.midi) || active === k.midi
            const dim = dimOthers && highlight.length > 0 && !hi.has(k.midi)
            return (
              <button
                key={k.midi}
                type="button"
                className={`pkey white ${on ? 'is-on' : ''} ${dim ? 'is-dim' : ''}`}
                onClick={() => void press(k.midi)}
              >
                {labels ? <span>{k.name}</span> : null}
              </button>
            )
          })}
        </div>
        <div className="piano-blacks">
          {BLACK_KEYS.map((k) => {
            const on = hi.has(k.midi) || active === k.midi
            const dim = dimOthers && highlight.length > 0 && !hi.has(k.midi)
            return (
              <button
                key={k.midi}
                type="button"
                className={`pkey black b${k.after} ${on ? 'is-on' : ''} ${dim ? 'is-dim' : ''}`}
                onClick={() => void press(k.midi)}
                aria-label={k.name}
              />
            )
          })}
        </div>
      </div>
      <p className="demo-hint">Tap a key — real piano sound + note on the staff</p>
    </div>
  )
}
