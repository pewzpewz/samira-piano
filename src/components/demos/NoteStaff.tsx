import { midiAccidental, midiNoteLabel, midiToStaffStep } from '../../audio/pianoAudio'

type Props = {
  activeMidi?: number | null
  highlight?: number[]
  caption?: string
}

/** Treble staff: E4 bottom line → … ; C4 on ledger below. */
const LINE_YS = [78, 66, 54, 42, 30] // E4, G4, B4, D5, F5
const STEP_E4 = 2
const Y_E4 = 78
const STEP_PX = 6

function stepToY(step: number) {
  return Y_E4 - (step - STEP_E4) * STEP_PX
}

function NoteHead({
  midi,
  x,
  lit,
}: {
  midi: number
  x: number
  lit: boolean
}) {
  const step = midiToStaffStep(midi)
  const y = stepToY(step)
  const acc = midiAccidental(midi)
  const fill = lit ? '#c49799' : '#1a1a1a'
  const stemUp = step < 6
  const stemX = stemUp ? x + 7 : x - 7
  const stemEnd = stemUp ? y - 28 : y + 28

  /** Ledger lines for C4 (step 0) and notes above top line (step > 10). */
  const ledgers: number[] = []
  if (step <= 0) {
    for (let s = 0; s >= step; s -= 2) ledgers.push(s)
  }
  if (step >= 12) {
    for (let s = 12; s <= step; s += 2) ledgers.push(s)
  }

  return (
    <g aria-label={midiNoteLabel(midi)}>
      {ledgers.map((s) => (
        <line
          key={s}
          x1={x - 10}
          x2={x + 12}
          y1={stepToY(s)}
          y2={stepToY(s)}
          stroke={fill}
          strokeWidth="1.5"
        />
      ))}
      {acc === 'flat' ? (
        <text
          x={x - 16}
          y={y + 5}
          fontSize="16"
          fill={fill}
          fontFamily="Georgia, serif"
        >
          ♭
        </text>
      ) : null}
      <ellipse
        cx={x}
        cy={y}
        rx="7"
        ry="5"
        fill={fill}
        transform={`rotate(-18 ${x} ${y})`}
        className={lit ? 'staff-note-lit' : undefined}
      />
      <line
        x1={stemX}
        x2={stemX}
        y1={y}
        y2={stemEnd}
        stroke={fill}
        strokeWidth="2"
      />
      {lit ? (
        <text
          x={x}
          y={112}
          textAnchor="middle"
          fontSize="12"
          fill="#c49799"
          fontFamily="Georgia, serif"
        >
          {midiNoteLabel(midi)}
        </text>
      ) : null}
    </g>
  )
}

export function NoteStaff({ activeMidi = null, highlight = [], caption }: Props) {
  const shown =
    activeMidi != null
      ? [activeMidi]
      : highlight.length > 0
        ? highlight
        : []

  return (
    <div className="staff-live">
      {caption ? <p className="demo-caption">{caption}</p> : null}
      <svg
        className="staff-svg staff-live-svg"
        viewBox="0 0 340 120"
        role="img"
        aria-label="Treble staff — note lights when you play a key"
      >
        {LINE_YS.map((y) => (
          <line
            key={y}
            x1="48"
            x2="320"
            y1={y}
            y2={y}
            stroke="#1a1a1a"
            strokeWidth="1.5"
          />
        ))}
        <text x="52" y="74" fontSize="42" fill="#1a1a1a" fontFamily="Georgia, serif">
          𝄞
        </text>
        {shown.length === 0 ? (
          <text x="150" y="62" fontSize="12" fill="#5e675e">
            Press a key — the matching note lights up
          </text>
        ) : (
          shown.map((midi, i) => (
            <NoteHead
              key={`${midi}-${i}`}
              midi={midi}
              x={140 + i * 36}
              lit={activeMidi === midi || (activeMidi == null && highlight.includes(midi))}
            />
          ))
        )}
      </svg>
    </div>
  )
}
