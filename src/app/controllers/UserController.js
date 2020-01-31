const { getUserGb } = require('../services/github')
const { getUserFb } = require('../services/fb')
const pdf = require('../helpers/Pdf')

const { formation } = require('../db/formation')
const { xp: xps } = require('../db/xp')

const frm = []
const xpcs = []

for (let form of formation) {
  frm.push(form)
}

for (let xp of xps) {
  xpcs.push(xp)
}

class UserController {
  async get(req, res) {
    const format = req.query.format
    const { name } = req.body

    const gitRes = await getUserGb(name)
    const fbRes = await getUserFb()

    const nomeUser = gitRes.name

    const nameSplit = nomeUser.split(' ')

    const content = `
      <!DOCTYPE HTML>
      <html>
      <head>
        <title>Curriculo Vitae</title>
        <style>
          body {
            font: 14px "Arial", sans-serif;
            color: #3b3b3b;
          }

          h1,h2 {
            font-family: Georgia;
          }

          h1 {
            border-bottom: 3px solid #aaa;
            background-color: #3b3b3b;
            color: #ddd;
            padding: 5px;	
          }

          h2 {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            background-color: #DDD;
            padding-left: 5px;
            margin: 0 0 0 -15px;
            font-weight: normal;
          }

          .secao {
            background-color: #eee;
            padding-left: 15px;
          }

          label {
            font-weight: bold;
            margin-right: 10px;
          }

          label:after {
            content: ":";
          }

          .vcard {
            padding: 5px;
          }

          .url, .email {
            display: inline;
          }

          .photo {
            float: right;
            width: 100px;
            height: auto;
            margin-top: 13px;
            margin-right: 5%;
            margin-bottom: 30%;
          }
        </style>
      </head>

      <body>
        <h1>Curriculum Vitae</h1>

        <div class="secao">
          <h2>Dados Pessoais</h2>			
            <div id="hcard" class="vcard">
              <img 
                src="https://scontent.fudi1-1.fna.fbcdn.net/v/t1.0-9/p960x960/78419994_158835822020808_1410896589232275456_o.jpg?_nc_cat=104&_nc_ohc=0QxuAaq67xMAX-Hphhd&_nc_ht=scontent.fudi1-1.fna&_nc_tp=6&oh=2dbcaa860afe569bf1ff0b3a591f437b&oe=5ED63872" 
                class="photo" />
              <p><strong>NOME: </strong><span class="given-name">${fbRes.name}</span></p>
              <p><strong>EMAIL: </strong><span class="email">${fbRes.email}</span></p>
              <p><strong>GITHUB: </strong><span class="url">${gitRes.perfil}</span></p>
            
              <div class="adr">
                <p><strong>LOCATION: </strong><span class="locality">Recife, Pernambuco</span></p>
              </div>
            </div>
        </div>

        <div class="secao">
          <h2>Experiência Profissional</h2>
          <div id="hcard" class="vcard"></div>
        </div>

        <div class="secao">
          <h2>Repositórios Em Alta</h2>
          
          <p><label>name</label>url</p>
        </div>	
      </body>
      </html>
    `

    if (!gitRes) return res.json({ err: 'Não Achei!' })
    else {
      if (format === 'json') {
        return res.json({
          nome: gitRes.name,
          data_nascimento: fbRes.birthday,
          endereco: fbRes.local,
          email: fbRes.email,
          genero: fbRes.gender === 'male' ? 'Masculino' : 'Feminino',
          bio: gitRes.bio,
          foto: fbRes.url,
          formacao: [...frm],
          experiencia_profissional: [...xpcs],
          github: {
            perfil: gitRes.perfil,
            alguns_repositorios: gitRes.repos,
          },
        })
      } else if (format === 'pdf') {
        pdf
          .create(content, {})
          .toFile(
            `./src/cvs/${nameSplit[0].toLowerCase()}_cv.pdf`,
            (err, res) => {
              if (err) console.log('UM ERRO ACONTECEU!!', err)
            }
          )
        return res.send(
          `Arquivo ${nameSplit[0].toLowerCase()}_cv.pdf foi baixado com sucesso!`
        )
      } else {
        return res.status(401).json({ err: 'Formato Inválido' })
      }
    }
  }
}

module.exports = new UserController()
