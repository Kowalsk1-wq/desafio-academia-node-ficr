require('dotenv').config()
const { json, urlencoded } = require('body-parser')
const cors = require('cors')
const express = require('express')
const path = require('path')
const limiter = require('./app/helpers/RateLimit')

class App {
  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.set('json spaces', 4)
    this.app.set('trust proxy', 1)
    this.app.set('views', path.join(__dirname, 'app', 'views'))
    this.app.set('view engine', 'ejs')

    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use(limiter)
  }
  routes() {
    this.app.use(require('./routes'))
  }
}

module.exports = new App().app
