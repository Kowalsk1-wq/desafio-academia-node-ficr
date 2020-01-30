const axios = require('axios')
const URL = 'https://graph.facebook.com/v5.0'

async function getUserFb(token) {
  const urlReq = `${URL}/me?fields=name%2Cbirthday%2Caddress%2Cemail%2Cgender&access_token=${token}`

  const fbRes = await axios.get(urlReq)

  const { name, birthday, address, email, gender } = fbRes.data

  return {
    name,
    birthday,
    local: address,
    email,
    gender,
  }
}

module.exports = {
  getUserFb,
}
