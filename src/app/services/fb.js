const axios = require('axios').default

const fb_api = axios.create({
  baseURL: 'https://graph.facebook.com/v5.0/',
})

module.exports = fb_api
