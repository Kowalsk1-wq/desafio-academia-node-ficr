const { gitHub } = require('../services/axios')
const _ = require('lodash')

module.exports = async () => {
  const query = `
  query { 
    viewer {
      login
      avatarUrl
      email
      bio
      company
      url
      location
      repositories(privacy: PUBLIC, first: 100, orderBy: {field: NAME, direction: ASC}) {
        nodes {
          diskUsage
          name
          url
        }
      }
    }
  }
  `

  const dataGithub = await gitHub(query, 'POST')

  const repositories = dataGithub.repos
  let repos = []

  await repositories.map(i => {
    repos.push({
      size: parseInt(i.diskUsage),
      name: i.name,
      url: i.url,
    })
  })

  repos.sort((a, b) => {
    return b.size - a.size
  })

  const readyRepo = _.chunk(repos, 3)

  return {
    bio: dataGithub.bio,
    avatarUrl: dataGithub.photo,
    url: dataGithub.perfil,
    repositories: [...readyRepo[0]],
    location: dataGithub.local,
  }
}
