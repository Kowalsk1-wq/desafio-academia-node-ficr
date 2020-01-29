const { getUser } = require('../services/github')

class UserController {
  async get(req, res) {
    const { name } = req.body

    const result = await getUser(name)

    if (!result) return res.json({ err: 'Não Achei!' })
    else return res.json(result)
  }
}

module.exports = new UserController()
