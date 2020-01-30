const { getUserGb } = require('../services/github')
//const { getUserFb } = require('../services/fb')
const pdf = require('../helpers/Pdf')

class UserController {
  async get(req, res) {
    const { format } = req.params
    const { name } = req.body

    const gitRes = await getUserGb(name)
    //const fbRes = await getUserFb(token)

    const nomeUser = gitRes.name

    const nameSplit = nomeUser.split(' ')

    let repo = []

    gitRes.repositories.map(r => {
      repo.push({
        name: r.name,
        url: r.url,
      })
    })

    console.log(repo)

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
              <img src="{fbRes.url_do_profile_photo}" class="photo"/>
              <p><strong>NOME: </strong><span class="given-name">${gitRes.name}</span></p>
              <p><strong>EMAIL: </strong><span class="email">{email}</span></p>
              <p><strong>GITHUB: </strong><span class="url">${gitRes.perfil}</span></p>
            
              <div class="adr">
                <p><strong>LOCATION: </strong><span class="locality">Recife, Pernambuco</span></p>
              </div>
            </div>
        </div>

        <div class="secao">
          <h2>Dados Profissionais</h2>
          
          <p><label>Empresa</label>{company}</p>
        </div>

        <div class="secao">
          <h2>Repositórios Em Alta</h2>
          
          <p><label>name</label>url</p>
        </div>	
      </body>
      </html>
    `

    let pathPdf = ''

    if (!gitRes) return res.json({ err: 'Não Achei!' })
    else {
      if (format === 'json') {
        return res.json({
          nome: gitRes.name,
          //data_nascimento: fbRes.birthday,
          //endereco: fbRes.local,
          //email: fbRes.email,
          //genero: fbRes.gender,
          bio: gitRes.bio,
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
              else {
                pathPdf = res.filename
              }
            }
          )
        return res.send(
          `Arquivo ${nameSplit[0].toLowerCase()}_cv.pdf foi baixado com sucesso!\nEle se encontra em: ${pathPdf}`
        )
      } else {
        return res.status(500).json({ err: 'Formato Inválido' })
      }
    }
  }
}

module.exports = new UserController()
