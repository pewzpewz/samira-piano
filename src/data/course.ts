export type { Exercise, Lesson, Module } from './courseTypes'
import type { Module } from './courseTypes'
import { moduleNotes } from './moduleNotes'
import { modules3to8 } from './modules3to8'

export const COURSE_TITLE = 'Foundations'
export const COURSE_SUBTITLE = 'Hear and understand how music is built'

const modules1and2: Module[] = [
  {
    id: 2,
    slug: '2',
    title: 'Sound and names',
    blurb:
      'After notes on the page: high and low sound, why we use letter names, C–B on the keyboard.',
    lessons: [
      {
        id: '2-1',
        title: 'High and low',
        goal: 'Hear and locate high vs low — and know where that lives on the piano.',
        plain: [
          'Module 1 taught the written symbol. Now we train the ear and the keyboard: some sounds sit higher, some lower. That difference is pitch height.',
          'What: “higher” means a brighter, thinner, bird-like quality; “lower” means deeper, heavier, drum-like. You do not need fancy words — compare two sounds and decide.',
          'Where on the piano: higher pitches sit to the right; lower pitches sit to the left. This is physical geography, not opinion. Walk your hand right → sound rises.',
          'How to practice: play the leftmost white key on the demo keyboard, then the rightmost. Say “lower… higher” out loud. Closing the loop with words locks the feel.',
          'Why it matters: staff reading assumes “higher on the page ≈ higher sound.” If your ear cannot tell high from low, the map has nothing to attach to.',
          'Bridge: next we give those heights shared names (C, D, E…) so two people can point at the same sound.',
        ],
        look: 'Bird = higher · deep drum = lower · piano right = higher · piano left = lower. Compare, don’t memorize jargon.',
        exercises: [
          {
            id: '2-1-a',
            prompt: 'On a piano keyboard, higher notes sit…',
            choices: ['To the left', 'To the right', 'In the middle only'],
            answer: 1,
            explain: 'Higher pitches are toward the right on a piano.',
          },
          {
            id: '2-1-b',
            prompt: 'A deep drum sound is usually…',
            choices: ['Higher', 'Lower', 'Neither'],
            answer: 1,
            explain: 'Deep sounds feel lower.',
          },
          {
            id: '2-1-c',
            prompt: 'Why must the ear learn high vs low before deep reading?',
            choices: [
              'Because the staff map links height on the page to height of sound',
              'Because pianos have no left side',
              'Because notes never change pitch',
            ],
            answer: 0,
            explain: 'Written height and sounding height must match in your mind.',
          },
        ],
      },
      {
        id: '2-2',
        title: 'Why we name notes',
        goal: 'Know that names are shared labels so we can teach, learn, and remember the same sound.',
        plain: [
          'You can hear high and low without names. But as soon as two people learn together, they need labels — otherwise “that one” is useless.',
          'What: a note name is a shared word for a pitch family. “C” means the same idea in books, apps, and lessons worldwide (in this letter system).',
          'Where names appear: on the keyboard (key stickers or teacher talk), on the staff (after the clef), in chords (C–E–G), and in functions (built on C as degree 1).',
          'How names help: they let you store a sound in memory (“practice the G”), ask a question (“is this C?”), and connect symbol ↔ key ↔ ear.',
          'Why not only point at keys: pointing dies when the lesson ends. Names travel home with you.',
          'What you will learn next: seven letter names in a fixed order. That order is the alphabet of Western pitch for this course.',
        ],
        look: 'Name = handle you can hold. “C” is one handle for one pitch family — later you will see it on staff and keys.',
        exercises: [
          {
            id: '2-2-a',
            prompt: 'Note names help us…',
            choices: [
              'Make the piano louder',
              'Talk about the same sound clearly',
              'Skip practice',
            ],
            answer: 1,
            explain: 'Names are shared labels so we can teach and learn together.',
          },
          {
            id: '2-2-b',
            prompt: 'Without shared names, a teacher saying “play that one” is weak because…',
            choices: [
              '“That one” is unclear once you leave the room',
              'Pianos refuse unnamed keys',
              'Music forbids speaking',
            ],
            answer: 0,
            explain: 'Labels travel; vague pointing does not.',
          },
        ],
      },
      {
        id: '2-3',
        title: 'The seven letter names',
        goal: 'Use C D E F G A B in order — and know what happens after B.',
        plain: [
          'English (and this course) uses seven letter names: C, D, E, F, G, A, B. They always appear in that cycle.',
          'Why start on C in piano teaching: on the keyboard, C sits just left of the two-black-key group — an easy landmark. The musical alphabet can also be listed A–G; we lead with C–B for piano clarity.',
          'What happens after B: the next letter is C again — but higher (or lower if you go the other way). The seven names recycle forever through different octaves.',
          'How to memorize: say C–D–E–F–G–A–B slowly while tapping each white key in order on the demo. Voice + finger beats silent staring.',
          'Where you will use this: every scale degree, every interval name, every chord spelling. If the order is shaky, later modules feel random.',
          'Check: after E comes F (not D). After B comes C (not H — some countries use H for B♮; we use B).',
        ],
        look: 'Order: C–D–E–F–G–A–B → next C (new height). Landmark: C is left of the two-black-key cluster.',
        exercises: [
          {
            id: '2-3-a',
            prompt: 'What comes right after E?',
            choices: ['D', 'F', 'G'],
            answer: 1,
            explain: 'The order is C D E F G A B.',
          },
          {
            id: '2-3-b',
            prompt: 'How many letter names are in this basic set?',
            choices: ['Five', 'Seven', 'Twelve'],
            answer: 1,
            explain: 'Seven letters: C D E F G A B. (Twelve includes sharps/flats as pitch classes later.)',
          },
          {
            id: '2-3-c',
            prompt: 'After B, the next letter name in the cycle is…',
            choices: ['A', 'C', 'H'],
            answer: 1,
            explain: 'The cycle returns to C (this course uses B, not H).',
          },
        ],
      },
      {
        id: '2-4',
        title: 'Singing helpers: do–si',
        goal: 'Know syllables support singing; letter names stay primary in this course.',
        plain: [
          'Singers often use soft syllables: do, re, mi, fa, sol, la, si (sometimes ti). They are easy to sing on any pitch.',
          'What relationship: when C is “home,” you can sing C as do, D as re, E as mi, and so on. The syllables ride on top of the letter ladder.',
          'Why letters stay primary here: books, chord symbols, and Roman numerals (I, IV, V) use letters and numbers. Syllables alone will not read a lead sheet.',
          'Where syllables help: matching ear to path — singing do–re–mi up a scale makes the ladder feel physical in the voice.',
          'How we use them: optional support. If singing feels awkward, keep speaking letter names. Both point at the same seven-note cycle.',
          'Later return: inside a key, “do” can mean degree 1 (movable do). Fixed letter C is still C. We will reopen that idea lightly with scales.',
        ],
        look: 'Letters = course primary. Syllables = singing helpers. Example when C is home: C=do, D=re, E=mi…',
        exercises: [
          {
            id: '2-4-a',
            prompt: 'In this course, which labels are primary?',
            choices: ['Only Italian words', 'Letter names C–B', 'Roman numerals only'],
            answer: 1,
            explain: 'We lead with C D E F G A B; syllables support singing.',
          },
          {
            id: '2-4-b',
            prompt: 'Do–re–mi syllables are mainly useful to…',
            choices: [
              'Replace the piano',
              'Help the voice feel the note path',
              'Erase letter names forever',
            ],
            answer: 1,
            explain: 'Syllables support singing; letters stay for reading and chords.',
          },
        ],
      },
      {
        id: '2-5',
        title: 'Same note, higher or lower (octaves)',
        goal: 'Hear that the same letter can return higher or lower — related, not identical keys.',
        plain: [
          'Low C and high C share a letter name but are different keys. Your ear often hears them as “the same note family” at different heights.',
          'What we call that distance later: an octave — same letter, eight scale notes apart (C up to the next C). For now, focus on sameness of letter + difference of height.',
          'Where on the piano: each C sits left of a two-black-key group. Find two Cs and play them. Feel the relatedness.',
          'Why it matters: the staff repeats letter names in higher and lower places too. Reading “another C” is normal, not a mistake.',
          'How this prepares Module 7: octave is an interval name. You already own the sound idea.',
          'Module 2 checkpoint: you can hear high/low, explain why names exist, recite C–B, and recognize same letter at two heights.',
        ],
        look: 'Two Cs: same letter, different height, related sound. Right = higher C. Left = lower C.',
        exercises: [
          {
            id: '2-5-a',
            prompt: 'Low C and high C share…',
            choices: ['The same letter name', 'Nothing at all', 'Only the same volume'],
            answer: 0,
            explain: 'Same letter, different height (register).',
          },
          {
            id: '2-5-b',
            prompt: 'Module 2 checkpoint: which list is correct?',
            choices: ['A B C D E', 'C D E F G A B', 'Do only'],
            answer: 1,
            explain: 'The seven letter names in order are C D E F G A B.',
          },
          {
            id: '2-5-c',
            prompt: 'Playing two Cs at different heights mainly shows…',
            choices: [
              'That letter names can repeat in new registers',
              'That C can only exist once on a piano',
              'That high and low are the same key',
            ],
            answer: 0,
            explain: 'The letter recycles through octaves.',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: '3',
    title: 'The staff',
    blurb:
      'Deepen the map: five lines, treble clef, ledger lines, and staff ↔ piano (builds on Module 1).',
    lessons: [
      {
        id: '3-1',
        title: 'Five lines',
        goal: 'Treat the staff as a full pitch map — why five lines, and how height works.',
        plain: [
          'In Module 1 you met notes on lines and spaces. Here we slow down: the staff is the official map for written pitch.',
          'What: five parallel lines + four spaces. Notes stack from low (near the bottom) to high (toward the top) once a clef is set.',
          'Why five: enough room for a useful range without covering the whole page. Notes outside use short ledger lines (lesson 3-4).',
          'How to read height: compare two note heads. The higher head usually means the higher sound. That is why ear training in Module 2 matters.',
          'Where beginners get lost: counting lines from the top by accident. Agree with yourself: bottom line = line 1 unless a teacher says otherwise.',
          'Practice cue: in the demo, watch notes climb the staff while pitch climbs. Map and ear should agree.',
        ],
        look: 'Staff = pitch map. Bottom → lower (usually). Top → higher (usually). Five lines, four spaces.',
        exercises: [
          {
            id: '3-1-a',
            prompt: 'How many lines does a standard staff have?',
            choices: ['Three', 'Four', 'Five'],
            answer: 2,
            explain: 'A standard staff has five lines.',
          },
          {
            id: '3-1-b',
            prompt: 'A note higher on the staff usually sounds…',
            choices: ['Lower', 'Higher', 'The same'],
            answer: 1,
            explain: 'Higher placement → higher pitch (with a clef in place).',
          },
          {
            id: '3-1-c',
            prompt: 'Why does the staff need a clef to become letter names?',
            choices: [
              'Because lines alone are only a grid until the clef assigns letters',
              'Because clefs change tempo',
              'Because five lines cannot hold notes',
            ],
            answer: 0,
            explain: 'Clef turns slots into named pitches.',
          },
        ],
      },
      {
        id: '3-2',
        title: 'Treble clef',
        goal: 'Know what the treble clef assigns — and why beginners start here.',
        plain: [
          'A clef is a key to the map. It tells you which letter sits on which line.',
          'What treble is: the G-clef. Its curl wraps the second line from the bottom — that line is G (above middle C). That G is your first strong anchor.',
          'Where you see it: higher melodies, right-hand piano writing, many beginner method books. Bass clef (F-clef) maps lower notes; we stay with treble for Foundations.',
          'Why start with treble: one map learned well beats two maps half-learned. Right-hand melodies give quick wins with the interactive keyboard.',
          'How to use the anchor: find the G line, then name neighbors (F below in the space, A above in the space, and so on). Expand from the known point.',
          'Mistake: decorating the clef in your mind as “just a fancy G.” It is a functional assignment of letters to lines.',
        ],
        look: 'Treble = G-clef. Second line = G. Neighbors grow from that anchor. Bass clef waits for later study.',
        exercises: [
          {
            id: '3-2-a',
            prompt: 'The treble clef is most often used for…',
            choices: [
              'Only drums',
              'Higher melodies / right-hand piano map',
              'Silence marks',
            ],
            answer: 1,
            explain: 'Treble maps higher pitches for beginners and right-hand writing.',
          },
          {
            id: '3-2-b',
            prompt: 'A useful treble anchor is…',
            choices: [
              'The second line = G',
              'The top line = always C',
              'The clef means “play rests”',
            ],
            answer: 0,
            explain: 'Treble curls around the G line.',
          },
        ],
      },
      {
        id: '3-3',
        title: 'Notes on lines and spaces',
        goal: 'Read a small treble set around the middle — letters with reasons.',
        plain: [
          'With treble set, every line and space has a letter. You still should not swallow the whole staff at once.',
          'What to learn first: a neighborhood around G (second line) and middle area — enough to play simple tunes and demos.',
          'How mnemonics help (optional): line letters E–G–B–D–F (“every good…”) and space letters F–A–C–E. Use them as a check, not a crutch that replaces thinking.',
          'Why slow naming: saying the letter while looking builds the same habit as Module 1. Speed comes after accuracy.',
          'Where this connects to piano: each named note has a key. If you can name it, you can find it (Module 1 loop).',
          'Practice: pick three notes, name them, play them, rename them. Repeat tomorrow without the mnemonic if you can.',
        ],
        look: 'Small set > whole staff. Anchor on G, grow neighbors. Optional: lines EGBDF, spaces FACE — verify, don’t only chant.',
        exercises: [
          {
            id: '3-3-a',
            prompt: 'Notes can sit…',
            choices: ['Only on lines', 'Only in spaces', 'On lines or in spaces'],
            answer: 2,
            explain: 'Both lines and spaces hold notes.',
          },
          {
            id: '3-3-b',
            prompt: 'The best early strategy for staff letters is…',
            choices: [
              'Learn a small clear set, then expand',
              'Memorize every ledger note before G',
              'Ignore the clef',
            ],
            answer: 0,
            explain: 'Anchors first keep reading honest.',
          },
        ],
      },
      {
        id: '3-4',
        title: 'Ledger lines (light)',
        goal: 'Meet short extra lines — especially middle C — without fear.',
        plain: [
          'Five lines are not the whole piano. When a note sits just above or below the staff, we draw a short extra line through (or for) the note head: a ledger line.',
          'What it is: a temporary extension, not a second full staff. Only as many short lines as needed for that note.',
          'Where beginners meet it: middle C in treble often sits on one ledger line below the staff. That C is a bridge between treble reading and the keyboard’s center area.',
          'How to read: treat the ledger like a normal line — same letter logic continues past the main five.',
          'Why not fear them: they look “extra,” but they follow the same high/low rules. Count carefully from the nearest staff line.',
          'Bridge: next lesson locks staff ↔ key using one clear note (often G or C) until the match feels automatic.',
        ],
        look: 'Ledger = short extra line for nearby notes. Middle C (treble) often uses one ledger below. Still the same map.',
        exercises: [
          {
            id: '3-4-a',
            prompt: 'A ledger line is…',
            choices: [
              'A whole extra staff',
              'A short extra line for notes just outside the staff',
              'A rest symbol',
            ],
            answer: 1,
            explain: 'Ledger lines extend the staff for nearby notes.',
          },
          {
            id: '3-4-b',
            prompt: 'Middle C in treble often appears…',
            choices: [
              'On a ledger line below the staff',
              'Only as a rest',
              'Above the top line always',
            ],
            answer: 0,
            explain: 'One ledger below is the classic beginner middle C.',
          },
        ],
      },
      {
        id: '3-5',
        title: 'Staff ↔ piano key',
        goal: 'Automate one clear match — and state the Module 3 idea in one line.',
        plain: [
          'This lesson is the handshake between Modules 1–3: written map ↔ instrument.',
          'What to do: choose one written note (G on the second line is ideal). Find its key. Play. Look back at the staff. Repeat until boring — boring means learned.',
          'Why one note first: transferring the whole staff at once creates panic. One solid match teaches the method you reuse for every new note.',
          'How errors teach: if the sound feels wrong, re-check clef, line/space, and octave. The map is consistent; the guess was not.',
          'Where this leads: Module 4 adds time (how long). Pitch reading stays underneath. Never drop the staff↔key habit when rhythm arrives.',
          'Module 3 in one line: staff is a pitch map; the clef sets letter names; letters point to keys.',
        ],
        look: 'Drill: one written note → one key → listen → eyes back to staff. Then add a neighbor.',
        exercises: [
          {
            id: '3-5-a',
            prompt: 'A written note on the staff should connect to…',
            choices: [
              'Any random key',
              'One matching piano key (for that pitch)',
              'Only black keys',
            ],
            answer: 1,
            explain: 'Reading links staff position to a specific pitch on the keyboard.',
          },
          {
            id: '3-5-b',
            prompt: 'Module 3 idea in one line:',
            choices: [
              'The staff is a pitch map; the clef sets the letter names',
              'The staff is only for rhythm',
              'Piano keys ignore the staff',
            ],
            answer: 0,
            explain: 'Staff + clef → letter names → keys.',
          },
          {
            id: '3-5-c',
            prompt: 'The smartest way to grow staff reading is…',
            choices: [
              'Lock one clear note↔key match, then add neighbors',
              'Skip matching and only clap rhythms',
              'Learn bass and treble on day one equally weakly',
            ],
            answer: 0,
            explain: 'Method first: one solid match teaches all the others.',
          },
        ],
      },
    ],
  },
]

export const modules: Module[] = [moduleNotes, ...modules1and2, ...modules3to8]

export function getModule(moduleId: string) {
  return modules.find((m) => m.slug === moduleId || String(m.id) === moduleId)
}

export function getLesson(moduleId: string, lessonId: string) {
  const mod = getModule(moduleId)
  if (!mod) return undefined
  const lesson = mod.lessons.find((l) => l.id === lessonId)
  if (!lesson) return undefined
  const index = mod.lessons.findIndex((l) => l.id === lessonId)
  return { module: mod, lesson, index }
}

export function adjacentLessons(moduleId: string, lessonId: string) {
  const found = getLesson(moduleId, lessonId)
  if (!found) return { prev: null, next: null }
  const { module, index } = found
  return {
    prev: index > 0 ? module.lessons[index - 1] : null,
    next: index < module.lessons.length - 1 ? module.lessons[index + 1] : null,
  }
}
