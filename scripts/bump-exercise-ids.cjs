const fs = require('fs')
const files = ['src/data/course.ts', 'src/data/modules3to8.ts']
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8')
  for (let m = 8; m >= 1; m--) {
    const n = m + 1
    // exercise ids: '3-1-a' → '4-1-a'
    c = c.replace(
      new RegExp("'" + m + "-(\\d+)-([a-z])'", 'g'),
      "'" + n + "-$1-$2'",
    )
  }
  fs.writeFileSync(f, c)
  console.log('exercises bumped', f)
}
