// Helpers && Services
const getGb = require('../helpers/getGb')
const { fb } = require('../services/axios')
const {
  models: { formacao, experiencia },
} = require('../helpers/getModelArr')

class UserController {
  async get(req, res, next) {
    //const { format } = req.query.format

    try {
      const [gbData, fbData, formationData, expData] = await Promise.all([
        getGb(),
        fb(
          'me?fields=name%2Cbirthday%2Caddress%2Cemail%2Cgender%2Cpicture%7Burl%7D'
        ),
        [...formacao],
        [...experiencia],
      ])

      const { bio, avatarUrl, url, repositories, location } = gbData
      const { name, birthday, email, gender } = fbData.data

      return res.json({
        nome: name,
        data_nascimento: birthday,
        endereco: location,
        email,
        genero: gender === 'male' ? 'Masculino' : 'Feminino',
        bio,
        foto: avatarUrl,
        formacao: formationData,
        experiencia_profissional: expData,
        github: {
          perfil: url,
          alguns_repositorios: repositories,
        },
      })
    } catch (error) {
      console.log(error)
      return next(error)
    }
  }
}

module.exports = new UserController()
