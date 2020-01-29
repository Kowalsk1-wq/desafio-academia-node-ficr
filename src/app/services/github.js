const axios = require('axios')
const _ = require('lodash')
const User_URL = 'https://api.github.com/users'

async function getUser(name) {
  const user_url = `${User_URL}/${name}`
  const repo_url = `${user_url}/repos`

  const repositories = []

  const gitRes = await axios.get(user_url)
  const repos_response = await axios.get(repo_url)

  const user = gitRes.data
  const repos = repos_response.data

  await repos.map(i => {
    repositories.push({
      size: parseInt(i.size),
      name: i.name,
      url: i.url,
    })
  })

  repositories.sort((a, b) => {
    return b.size - a.size
  })

  const readyRepo = _.chunk(repositories, 3)

  return {
    name: user.name,
    avatar: user.avatar_url,
    url: user.html_url,
    bio: user.bio,
    email: user.email,
    company: user.company,
    repositories: [...readyRepo[0]],
  }
}

module.exports = {
  getUser,
}
