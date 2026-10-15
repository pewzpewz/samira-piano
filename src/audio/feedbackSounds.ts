/** Short UI sounds for quiz feedback (Web Audio — no files needed). */

let sharedCtx: AudioContext | null = null

function ctx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext
  if (!AC) return null
  if (!sharedCtx || sharedCtx.state === 'closed') sharedCtx = new AC()
  return sharedCtx
}

function tone(
  audio: AudioContext,
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType,
  gain: number,
) {
  const osc = audio.createOscillator()
  const g = audio.createGain()
  osc.type = type
  osc.frequency.value = freq
  const t0 = audio.currentTime + start
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g)
  g.connect(audio.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.05)
}

export async function playCorrectSound() {
  const audio = ctx()
  if (!audio) return
  await audio.resume()
  // Bright major flourish: C–E–G–C
  tone(audio, 523.25, 0, 0.18, 'triangle', 0.12)
  tone(audio, 659.25, 0.08, 0.2, 'triangle', 0.11)
  tone(audio, 783.99, 0.16, 0.22, 'triangle', 0.1)
  tone(audio, 1046.5, 0.26, 0.35, 'sine', 0.09)
}

export async function playWrongSound() {
  const audio = ctx()
  if (!audio) return
  await audio.resume()
  // Soft descending “oops”
  tone(audio, 311.13, 0, 0.16, 'square', 0.045)
  tone(audio, 233.08, 0.12, 0.28, 'triangle', 0.06)
}
