const axios = require('axios')
const URL = 'https://api.github.com/users'

async function getUser(name) {
  const url = `${URL}/${name}`

  const response = await axios.get(url)

  return response.data
}

module.exports = {
  getUser,
}
