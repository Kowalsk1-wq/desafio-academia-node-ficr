require('dotenv').config()
const { json, urlencoded } = require('body-parser')
const cors = require('cors')
const express = require('express')
const path = require('path')

class App {
  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.set('json spaces', 4)
    this.app.use(json())
    this.app.use(urlencoded({ extended: true }))
    this.app.use(cors())

    this.app.set('views', path.join(__dirname, 'app', 'views'))
    this.app.set('view engine', 'ejs')
  }
  routes() {
    this.app.use(require('./routes'))
  }
}

module.exports = new App().app
