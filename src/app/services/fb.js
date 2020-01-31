const axios = require('axios')
const URL = 'https://graph.facebook.com/v5.0'

async function getUserFb() {
  const urlReq = `${URL}/me?fields=name%2Cbirthday%2Caddress%2Cemail%2Cgender%2Cpicture%7Burl%7D&access_token=EAAHWISWZCNZC0BACHbVCvFvyLuvWvH7FDCrZASkBOU56QzMCXx6TvlA3pBUyvdBwiYybcalkc9ZBbvJPztCP8CwrKyioSyVmbp4OkLGZBnPGqQZCtPXqCMZCCB1CIgHkGlNYc7EnxyjJcgCdl7KjPng86qmq4ZADeVxnuQqXYgIfFiDZCbVPHzt2MtlhDjd1wFNsZD`

  const fbRes = await axios.get(urlReq)

  const { name, birthday, address, email, gender, picture: { data: { url } } } = fbRes.data

  return {
    name,
    birthday,
    local: address,
    email,
    gender,
    url,
  }
}

module.exports = {
  getUserFb,
}
