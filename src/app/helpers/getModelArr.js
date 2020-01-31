const { experiencia } = require('../models/experiencia')
const { formacao: formacoes } = require('../models/formacao')

let formacaoArr = []
let experiencias = []

for (let form of formacoes) {
  formacaoArr.push(form)
}

for (let exp of experiencia) {
  experiencias.push(exp)
}

exports.models = {
  formacao: [...formacaoArr],
  experiencia: [...experiencias],
}
