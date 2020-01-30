const routes = require('express').Router()
const { errorHandle } = require('./app/helpers/Error')
const { version } = require('../package.json')

const UserController = require('./app/controllers/UserController')

routes
  .get('/api/hello', (_req, res) =>
    res.render('index', {
      welc: 'Bem-Vindo(a)',
      title: 'Curr1culum',
      version: `v${version}`,
    })
  )

  .get('/api/curriculo/:format', UserController.get)

  // Qualquer Outra Passada!!
  .get('/*', (_req, res) => res.status(404).render('404'))

  // Tratamento de Erros Internos de Server
  // eslint-disable-next-line no-unused-vars
  .use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500
    errorHandle(err, res)
  })

module.exports = routes
