const app = require('./app')
const chalk = require('chalk')
const figlet = require('figlet')
const { version } = require('../package.json')

app.listen(4000, () => {
  console.log(
    chalk.green(
      `${figlet.textSync('API - Challenge', {
        font: 'Doom',
        horizontalLayout: 'full',
      })} v${version}\n       http://localhost:4000`
    )
  )
})
