const { getUser } = require('../services/github')

class UserController {
  async get(req, res) {
    const { name } = req.body

    const gitRes = await getUser(name)

    if (!gitRes) return res.json({ err: 'Não Achei!' })
    else return res.json(gitRes)
  }
}

module.exports = new UserController()
