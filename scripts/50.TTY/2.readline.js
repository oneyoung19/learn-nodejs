const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.setPrompt('> ')
rl.prompt()

rl.on('line', (line) => {
  console.log(`Received: ${line}`)
  rl.prompt()
}).on('close', () => {
  console.log('Goodbye!')
  process.exit(0)
})
