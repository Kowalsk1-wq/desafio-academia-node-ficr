const routes = require('express').Router()
const { errorMiddleware } = require('./app/helpers/Error')

const UserController = require('./app/controllers/UserController')

routes

  .get('/api/curriculo', UserController.get)

  // Qualquer Outra Passada!!
  .get('/*', (_req, res) => res.status(404).render('404'))

  // Tratamento de Erros Internos de Server
  .use(errorMiddleware)

module.exports = routes
