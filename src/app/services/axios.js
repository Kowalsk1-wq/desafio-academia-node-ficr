const axios = require('axios').default
const fetch = require('node-fetch')
const { fbToken } = require('../../config/fbToken')
const { gbToken } = require('../../config/gbToken')

class AxiosService {
  async fb(credential) {
    return await axios.get(
      `https://graph.facebook.com/v5.0/${credential}&access_token=${fbToken}`
    )
  }

  async gitHub(query, method) {
    const gitData = []

    await fetch('https://api.github.com/graphql', {
      method,
      body: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer ${gbToken}`,
      },
    })
      .then(res => res.text())
      .then(body => {
        gitData.push(JSON.parse(body))
      })

    const gitArr = gitData[0].data.viewer

    return {
      photo: gitArr.avatarUrl,
      bio: gitArr.bio,
      perfil: gitArr.url,
      repos: gitArr.repositories.nodes,
      local: gitArr.location,
    }
  }
}

module.exports = new AxiosService()
