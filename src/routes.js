const routes = require('express').Router()
const { errorHandle } = require('./app/helpers/Error')

const UserController = require('./app/controllers/UserController')
//const qs = require('querystring')

routes

  .get('/api/curriculo', UserController.get)

  // Qualquer Outra Passada!!
  .get('/*', (_req, res) => res.status(404).render('404'))

  // Tratamento de Erros Internos de Server
  // eslint-disable-next-line no-unused-vars
  .use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500
    errorHandle(err, res)
  })

module.exports = routes
