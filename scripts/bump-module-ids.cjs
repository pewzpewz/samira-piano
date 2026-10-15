const fs = require('fs')
const files = [
  'src/data/course.ts',
  'src/data/modules3to8.ts',
  'src/components/demos/LessonDemo.tsx',
]
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8')
  for (let m = 8; m >= 1; m--) {
    const n = m + 1
    c = c.replace(new RegExp("'" + m + "-(\\d+)'", 'g'), "'" + n + "-$1'")
    c = c.replace(new RegExp('Module ' + m + ' checkpoint', 'g'), 'Module ' + n + ' checkpoint')
    c = c.replace(new RegExp('Module ' + m + ' idea', 'g'), 'Module ' + n + ' idea')
  }
  for (let m = 8; m >= 1; m--) {
    const n = m + 1
    c = c.replace(new RegExp('^(\\s*id: )' + m + ',', 'gm'), '$1' + n + ',')
    c = c.replace(new RegExp("^(\\s*slug: ')" + m + "'", 'gm'), '$1' + n + "'")
  }
  fs.writeFileSync(f, c)
  console.log('updated', f)
}
