const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  formation: [String],
  xp: [String],
  github: {
    perfil: {
      type: String,
      required: true,
    },
    repos: [
      {
        size: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
})

module.exports = model('users', UserSchema)
