import { useEffect, useState } from 'react'
import {
  playChord,
  playMidi,
  playMidiSequence,
} from '../../audio/pianoAudio'
import { NoteStaff } from './NoteStaff'
import { PianoKeyboard } from './PianoKeyboard'
import './piano.css'

function NotePartsDemo() {
  return (
    <div className="demo-panel">
      <p className="demo-caption">Note head (oval) + stem (line) — tap Play to hear the pitch</p>
      <svg className="staff-svg" viewBox="0 0 280 110" aria-hidden="true">
        {[30, 42, 54, 66, 78].map((y) => (
          <line
            key={y}
            x1="40"
            x2="260"
            y1={y}
            y2={y}
            stroke="#1a1a1a"
            strokeWidth="1.5"
          />
        ))}
        <text x="48" y="72" fontSize="36" fill="#1a1a1a" fontFamily="Georgia, serif">
          𝄞
        </text>
        <ellipse
          cx="150"
          cy="66"
          rx="8"
          ry="6"
          fill="#c49799"
          transform="rotate(-18 150 66)"
        />
        <line x1="157" x2="157" y1="66" y2="28" stroke="#c49799" strokeWidth="2.5" />
        <text x="168" y="70" fontSize="11" fill="#5e675e">
          head
        </text>
        <text x="168" y="40" fontSize="11" fill="#5e675e">
          stem
        </text>
      </svg>
      <div className="demo-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => void playMidi(67, 0.7)}
        >
          Play this G
        </button>
      </div>
    </div>
  )
}

function StaffBasic() {
  return (
    <div className="demo-panel">
      <p className="demo-caption">Five lines — higher on the staff usually means higher sound</p>
      <svg className="staff-svg" viewBox="0 0 320 120" aria-hidden="true">
        {[30, 42, 54, 66, 78].map((y) => (
          <line
            key={y}
            x1="20"
            x2="300"
            y1={y}
            y2={y}
            stroke="#1a1a1a"
            strokeWidth="1.5"
          />
        ))}
        <text x="28" y="72" fontSize="36" fill="#1a1a1a" fontFamily="Georgia, serif">
          𝄞
        </text>
        <circle cx="150" cy="66" r="6" fill="#c49799" />
        <line x1="156" x2="156" y1="30" y2="66" stroke="#c49799" strokeWidth="2" />
        <circle cx="210" cy="42" r="6" fill="#c9a96e" />
        <line x1="216" x2="216" y1="18" y2="42" stroke="#c9a96e" strokeWidth="2" />
        <text x="145" y="100" fontSize="11" fill="#5e675e">
          lower
        </text>
        <text x="200" y="100" fontSize="11" fill="#5e675e">
          higher
        </text>
      </svg>
    </div>
  )
}

function PulseDemo() {
  const [on, setOn] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setOn((n) => {
        const next = (n + 1) % 4
        void playMidi(60 + next * 2, 0.12, 0, 0.08)
        return next
      })
    }, 480)
    return () => window.clearInterval(id)
  }, [running])

  return (
    <div className="demo-panel">
      <p className="demo-caption">Steady pulse — watch the lights, keep an even tap</p>
      <div className="beat-row">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`beat-dot ${on === i && running ? 'is-on' : ''}`} />
        ))}
      </div>
      <div className="demo-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? 'Stop pulse' : 'Start pulse'}
        </button>
      </div>
    </div>
  )
}

function NoteValuesDemo() {
  const [active, setActive] = useState<'whole' | 'half' | 'quarter' | null>(null)

  const play = async (kind: 'whole' | 'half' | 'quarter') => {
    setActive(kind)
    if (kind === 'whole') await playMidi(64, 1.6, 0, 0.12)
    if (kind === 'half') await playMidi(64, 0.8, 0, 0.12)
    if (kind === 'quarter') await playMidi(64, 0.35, 0, 0.12)
    window.setTimeout(() => setActive(null), kind === 'whole' ? 1700 : kind === 'half' ? 900 : 400)
  }

  return (
    <div className="demo-panel">
      <p className="demo-caption">Tap a value — longer chip = longer sound</p>
      <div className="value-row">
        <button
          type="button"
          className={`value-chip ${active === 'whole' ? 'is-on' : ''}`}
          onClick={() => void play('whole')}
        >
          <strong>𝅝</strong>
          <span>Whole · 4</span>
        </button>
        <button
          type="button"
          className={`value-chip ${active === 'half' ? 'is-on' : ''}`}
          onClick={() => void play('half')}
        >
          <strong>𝅗</strong>
          <span>Half · 2</span>
        </button>
        <button
          type="button"
          className={`value-chip ${active === 'quarter' ? 'is-on' : ''}`}
          onClick={() => void play('quarter')}
        >
          <strong>♩</strong>
          <span>Quarter · 1</span>
        </button>
      </div>
    </div>
  )
}

function MeterDemo({ beats }: { beats: 2 | 3 | 4 }) {
  const [on, setOn] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setOn((n) => {
        const next = (n + 1) % beats
        void playMidi(next === 0 ? 67 : 60, 0.14, 0, next === 0 ? 0.12 : 0.07)
        return next
      })
    }, 420)
    return () => window.clearInterval(id)
  }, [running, beats])

  return (
    <div className="demo-panel">
      <p className="demo-caption">
        Meter {beats}/4 — beat 1 is stronger (gold when lit)
      </p>
      <div className="beat-row">
        {Array.from({ length: beats }, (_, i) => (
          <span
            key={i}
            className={`beat-dot ${i === 0 ? 'is-strong' : ''} ${on === i && running ? 'is-on' : ''}`}
          />
        ))}
      </div>
      <div className="bar-group" style={{ marginTop: '0.75rem' }}>
        {Array.from({ length: beats }, (_, i) => (
          <span key={i} style={{ fontSize: '0.85rem', opacity: 0.7 }}>
            {i + 1}
          </span>
        ))}
        <span style={{ marginLeft: '0.35rem', opacity: 0.5 }}>|</span>
      </div>
      <div className="demo-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? 'Stop' : `Feel ${beats}/4`}
        </button>
      </div>
    </div>
  )
}

function IntervalDemo({ a, b, label }: { a: number; b: number; label: string }) {
  return (
    <div className="demo-panel">
      <PianoKeyboard
        highlight={[a, b]}
        dimOthers
        caption={`${label} — highlighted keys. Tap them, or play both.`}
      />
      <div className="demo-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => void playMidiSequence([{ midi: a }, { midi: b, dur: 0.55 }])}
        >
          Play interval
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => void playChord([a, b], 0.8)}
        >
          Play together
        </button>
      </div>
    </div>
  )
}

function ScaleDemo() {
  const scale = [60, 62, 64, 65, 67, 69, 71, 72]
  return (
    <div className="demo-panel">
      <PianoKeyboard
        highlight={scale.slice(0, 7)}
        caption="C major ladder — tap keys or play the scale"
      />
      <div className="demo-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            void playMidiSequence(scale.map((midi) => ({ midi, dur: 0.28 })))
          }
        >
          Play C major scale
        </button>
      </div>
    </div>
  )
}

function TriadDemo() {
  const triad = [60, 64, 67]
  return (
    <div className="demo-panel">
      <PianoKeyboard
        highlight={triad}
        dimOthers
        caption="Triad 1–3–5 on C → C–E–G"
      />
      <div className="demo-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => void playChord(triad, 1)}
        >
          Play major triad
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => void playChord([60, 63, 67], 1)}
        >
          Compare minor (C–E♭–G)
        </button>
      </div>
    </div>
  )
}

function FunctionsDemo() {
  return (
    <div className="demo-panel">
      <p className="demo-caption">I home · IV away · V pull — tap to hear in C major</p>
      <div className="demo-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => void playChord([60, 64, 67], 0.95)}
        >
          I · home (C)
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => void playChord([65, 69, 72], 0.95)}
        >
          IV · away (F)
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => void playChord([67, 71, 74], 0.95)}
        >
          V · pull (G)
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            void (async () => {
              await playChord([60, 64, 67], 0.55)
              await new Promise((r) => setTimeout(r, 580))
              await playChord([65, 69, 72], 0.55)
              await new Promise((r) => setTimeout(r, 580))
              await playChord([67, 71, 74], 0.55)
              await new Promise((r) => setTimeout(r, 580))
              await playChord([60, 64, 67], 0.9)
            })()
          }
        >
          Play I–IV–V–I story
        </button>
      </div>
      <PianoKeyboard highlight={[60, 64, 67, 65, 69, 72, 71, 74]} labels />
    </div>
  )
}

function HalfWholeDemo() {
  return (
    <div className="demo-panel">
      <PianoKeyboard
        highlight={[64, 65]}
        dimOthers
        caption="Half step example: E → F (no black key between)"
      />
      <div className="demo-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => void playMidiSequence([{ midi: 64 }, { midi: 65 }])}
        >
          Play half step E–F
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => void playMidiSequence([{ midi: 60 }, { midi: 62 }])}
        >
          Play whole step C–D
        </button>
      </div>
    </div>
  )
}

export function LessonDemo({ lessonId }: { lessonId: string }) {
  switch (lessonId) {
    case '1-1':
      return (
        <div className="demo-panel">
          <NoteStaff highlight={[64]} caption="A note on the staff — this one is E" />
          <PianoKeyboard
            highlight={[64]}
            dimOthers
            showStaff={false}
            caption="Same E on the keyboard — tap it"
          />
        </div>
      )
    case '1-2':
      return <NotePartsDemo />
    case '1-3':
      return (
        <div className="demo-panel">
          <StaffBasic />
          <p className="demo-caption" style={{ marginTop: '0.75rem' }}>
            Line note vs space note — tap keys and watch the staff light up
          </p>
          <PianoKeyboard highlight={[64, 65]} caption="E (line) and F (space)" />
        </div>
      )
    case '1-4':
      return (
        <div className="demo-panel">
          <PianoKeyboard
            labels
            highlight={[60, 62, 64, 65, 67]}
            caption="Letter names — tap each highlighted key and read the staff"
          />
        </div>
      )
    case '1-5':
    case '1-6':
      return (
        <div className="demo-panel">
          <PianoKeyboard
            labels
            caption="Look at the staff, press the matching key — note and sound together"
          />
          <div className="demo-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                void playMidiSequence(
                  [60, 62, 64, 65, 67].map((midi) => ({ midi, dur: 0.35 })),
                )
              }
            >
              Play C–D–E–F–G
            </button>
          </div>
        </div>
      )
    case '2-1':
      return (
        <div className="demo-panel">
          <PianoKeyboard
            highlight={[60, 71]}
            caption="Low vs high — left keys feel lower, right keys higher. Tap both ends."
          />
          <div className="demo-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => void playMidi(60, 0.5)}
            >
              Play lower (C)
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => void playMidi(71, 0.5)}
            >
              Play higher (B)
            </button>
          </div>
        </div>
      )
    case '2-2':
    case '2-3':
      return (
        <div className="demo-panel">
          <PianoKeyboard labels caption="Letter names on the white keys — tap each one" />
        </div>
      )
    case '2-4':
      return (
        <div className="demo-panel">
          <PianoKeyboard
            labels
            caption="Letters first; syllables help singing (do–re–mi on C–D–E…)"
          />
          <div className="demo-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                void playMidiSequence(
                  [60, 62, 64, 65, 67, 69, 71].map((midi) => ({ midi, dur: 0.3 })),
                )
              }
            >
              Play do–si path
            </button>
          </div>
        </div>
      )
    case '2-5':
      return (
        <div className="demo-panel">
          <p className="demo-caption">
            Same letter, different height — hear C, then a higher C (octave)
          </p>
          <div className="demo-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => void playMidi(60, 0.55)}
            >
              Low C
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => void playMidi(72, 0.55)}
            >
              High C
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                void playMidiSequence([
                  { midi: 60, dur: 0.45 },
                  { midi: 72, dur: 0.55 },
                ])
              }
            >
              Low then high
            </button>
          </div>
          <PianoKeyboard highlight={[60]} caption="This keyboard shows mid C — tap around it" />
        </div>
      )
    case '3-1':
    case '3-2':
    case '3-3':
    case '3-4':
      return <StaffBasic />
    case '3-5':
      return (
        <div className="demo-panel">
          <StaffBasic />
          <PianoKeyboard
            highlight={[67]}
            dimOthers
            caption="Staff ↔ key — try G (highlighted). Match eye to ear."
          />
        </div>
      )
    case '4-1':
    case '4-3':
      return <PulseDemo />
    case '4-2':
    case '4-5':
      return <NoteValuesDemo />
    case '4-4':
      return (
        <div className="demo-panel">
          <p className="demo-caption">Sound then silence — pulse continues during rests</p>
          <div className="demo-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                void playMidiSequence([
                  { midi: 64, dur: 0.3 },
                  { midi: 64, dur: 0.3 },
                  { midi: 64, dur: 0.05, gap: 0.55 },
                  { midi: 64, dur: 0.05, gap: 0.55 },
                ])
              }
            >
              Play · play · rest · rest
            </button>
          </div>
        </div>
      )
    case '5-1':
    case '5-2':
    case '5-4':
    case '5-5':
      return <MeterDemo beats={4} />
    case '5-3':
      return (
        <>
          <MeterDemo beats={3} />
          <MeterDemo beats={2} />
        </>
      )
    case '6-1':
    case '6-2':
      return <HalfWholeDemo />
    case '6-3':
      return (
        <div className="demo-panel">
          <PianoKeyboard
            highlight={[60, 61]}
            dimOthers
            caption="Sharp raises: C → C♯"
          />
          <div className="demo-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => void playMidiSequence([{ midi: 60 }, { midi: 61 }])}
            >
              Play C then C♯
            </button>
          </div>
        </div>
      )
    case '6-4':
      return (
        <div className="demo-panel">
          <PianoKeyboard
            highlight={[71, 70]}
            dimOthers
            caption="Flat lowers: B → B♭"
          />
          <div className="demo-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => void playMidiSequence([{ midi: 71 }, { midi: 70 }])}
            >
              Play B then B♭
            </button>
          </div>
        </div>
      )
    case '6-5':
      return (
        <div className="demo-panel">
          <PianoKeyboard highlight={[66, 65]} dimOthers caption="Natural returns to plain: F♯ → F♮" />
          <div className="demo-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => void playMidiSequence([{ midi: 66 }, { midi: 65 }])}
            >
              Play F♯ then F
            </button>
          </div>
        </div>
      )
    case '7-1':
    case '7-2':
      return <IntervalDemo a={60} b={62} label="2nd (C–D)" />
    case '7-3':
    case '7-6':
      return <IntervalDemo a={60} b={64} label="3rd (C–E)" />
    case '7-4':
      return <IntervalDemo a={60} b={67} label="5th (C–G)" />
    case '7-5':
      return (
        <div className="demo-panel">
          <div className="demo-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                void playMidiSequence([
                  { midi: 60, dur: 0.45 },
                  { midi: 72, dur: 0.55 },
                ])
              }
            >
              Play octave C–C
            </button>
          </div>
          <PianoKeyboard highlight={[60]} caption="Octave uses the same letter name higher" />
        </div>
      )
    case '7-7':
      return (
        <>
          <IntervalDemo a={60} b={62} label="2nd" />
          <IntervalDemo a={60} b={64} label="3rd" />
          <IntervalDemo a={60} b={67} label="5th" />
        </>
      )
    case '8-1':
    case '8-2':
    case '8-3':
    case '8-6':
    case '8-7':
      return <ScaleDemo />
    case '8-4':
    case '8-5':
      return <TriadDemo />
    case '9-1':
    case '9-2':
    case '9-3':
    case '9-4':
    case '9-5':
    case '9-6':
    case '9-7':
    case '9-8':
      return <FunctionsDemo />
    default:
      return (
        <div className="demo-panel">
          <PianoKeyboard caption="Explore — tap any key to hear a pitch" />
        </div>
      )
  }
}
