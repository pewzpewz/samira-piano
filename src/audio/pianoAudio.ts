/** Real piano samples (FluidR3 acoustic grand) + Web Audio playback. */

let shared: AudioContext | null = null
const buffers = new Map<number, AudioBuffer>()
let loadPromise: Promise<void> | null = null

/** Flat-named files from midi-js-soundfonts FluidR3_GM (CC-BY 3.0). */
export const MIDI_SAMPLE_FILES: Record<number, string> = {
  60: 'C4',
  61: 'Db4',
  62: 'D4',
  63: 'Eb4',
  64: 'E4',
  65: 'F4',
  66: 'Gb4',
  67: 'G4',
  68: 'Ab4',
  69: 'A4',
  70: 'Bb4',
  71: 'B4',
  72: 'C5',
  74: 'D5',
  76: 'E5',
  77: 'F5',
  79: 'G5',
}

type NoteListener = (midi: number) => void
const noteListeners = new Set<NoteListener>()

export function onPianoNote(listener: NoteListener) {
  noteListeners.add(listener)
  return () => {
    noteListeners.delete(listener)
  }
}

function emitNote(midi: number) {
  noteListeners.forEach((fn) => fn(midi))
}

function getCtx() {
  if (typeof window === 'undefined') return null
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext
  if (!AC) return null
  if (!shared || shared.state === 'closed') shared = new AC()
  return shared
}

export function midiToFreq(midi: number) {
  return 440 * 2 ** ((midi - 69) / 12)
}

export async function ensurePianoSamples() {
  if (buffers.size >= Object.keys(MIDI_SAMPLE_FILES).length) return
  if (loadPromise) return loadPromise
  const ctx = getCtx()
  if (!ctx) return

  loadPromise = (async () => {
    await Promise.all(
      Object.entries(MIDI_SAMPLE_FILES).map(async ([midiStr, name]) => {
        const midi = Number(midiStr)
        if (buffers.has(midi)) return
        try {
          const res = await fetch(
            `${import.meta.env.BASE_URL}audio/piano/${name}.mp3`,
          )
          if (!res.ok) return
          const raw = await res.arrayBuffer()
          const buf = await ctx.decodeAudioData(raw.slice(0))
          buffers.set(midi, buf)
        } catch {
          /* fall back to oscillator for this note */
        }
      }),
    )
  })()

  return loadPromise
}

function playOscillator(
  ctx: AudioContext,
  midi: number,
  duration: number,
  when: number,
  gain: number,
) {
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.value = midiToFreq(midi)
  const t0 = ctx.currentTime + when
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(g)
  g.connect(ctx.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.05)
}

function playSample(
  ctx: AudioContext,
  buffer: AudioBuffer,
  duration: number,
  when: number,
  gain: number,
) {
  const src = ctx.createBufferSource()
  const g = ctx.createGain()
  src.buffer = buffer
  const t0 = ctx.currentTime + when
  const end = Math.min(duration, buffer.duration)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.01)
  const fadeStart = Math.max(t0 + 0.05, t0 + end - 0.12)
  g.gain.setValueAtTime(gain, fadeStart)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + end)
  src.connect(g)
  g.connect(ctx.destination)
  src.start(t0)
  src.stop(t0 + end + 0.02)
}

export async function playMidi(
  midi: number,
  duration = 0.85,
  when = 0,
  gain = 0.55,
) {
  const ctx = getCtx()
  if (!ctx) return
  await ctx.resume()
  await ensurePianoSamples()
  if (when <= 0) emitNote(midi)
  else window.setTimeout(() => emitNote(midi), when * 1000)

  const buf = buffers.get(midi)
  if (buf) {
    playSample(ctx, buf, duration, when, gain)
  } else {
    playOscillator(ctx, midi, Math.min(duration, 0.6), when, Math.min(gain, 0.14))
  }
}

export async function playMidiSequence(
  notes: { midi: number; dur?: number; gap?: number }[],
  gain = 0.5,
) {
  const ctx = getCtx()
  if (!ctx) return
  await ctx.resume()
  await ensurePianoSamples()
  let t = 0
  for (const n of notes) {
    const dur = n.dur ?? 0.45
    void playMidi(n.midi, dur, t, gain)
    t += dur + (n.gap ?? 0.05)
  }
}

export async function playChord(midis: number[], duration = 1.1, gain = 0.38) {
  await Promise.all(midis.map((m) => playMidi(m, duration, 0, gain)))
}

/** White keys C4–C5 (one octave + top C) */
export const WHITE_KEYS = [
  { name: 'C', midi: 60 },
  { name: 'D', midi: 62 },
  { name: 'E', midi: 64 },
  { name: 'F', midi: 65 },
  { name: 'G', midi: 67 },
  { name: 'A', midi: 69 },
  { name: 'B', midi: 71 },
  { name: 'C', midi: 72 },
] as const

export const BLACK_KEYS = [
  { name: 'C♯ / D♭', midi: 61, after: 0 },
  { name: 'D♯ / E♭', midi: 63, after: 1 },
  { name: 'F♯ / G♭', midi: 66, after: 3 },
  { name: 'G♯ / A♭', midi: 68, after: 4 },
  { name: 'A♯ / B♭', midi: 70, after: 5 },
] as const

/** Treble-staff layout helpers for C4–G5 (flat enharmonics). */
export function midiToStaffStep(midi: number): number {
  /** Letter step from C4=0; flats sit on the raised letter (Db→D). */
  const pc = ((midi % 12) + 12) % 12
  const octave = Math.floor(midi / 12) - 5 // C4 midi 60 → 0
  const letterFromPc: Record<number, number> = {
    0: 0, // C
    1: 1, // D♭
    2: 1, // D
    3: 2, // E♭
    4: 2, // E
    5: 3, // F
    6: 4, // G♭
    7: 4, // G
    8: 5, // A♭
    9: 5, // A
    10: 6, // B♭
    11: 6, // B
  }
  return letterFromPc[pc]! + octave * 7
}

export function midiAccidental(midi: number): 'sharp' | 'flat' | null {
  const pc = ((midi % 12) + 12) % 12
  if ([1, 3, 6, 8, 10].includes(pc)) return 'flat'
  return null
}

export function midiNoteLabel(midi: number): string {
  const names: Record<number, string> = {
    60: 'C',
    61: 'D♭',
    62: 'D',
    63: 'E♭',
    64: 'E',
    65: 'F',
    66: 'G♭',
    67: 'G',
    68: 'A♭',
    69: 'A',
    70: 'B♭',
    71: 'B',
    72: 'C',
    74: 'D',
    76: 'E',
    77: 'F',
    79: 'G',
  }
  return names[midi] ?? String(midi)
}
