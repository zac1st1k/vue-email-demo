const http = require('http')
var rp = require('request-promise')

const PORT = 8888
const MAIL_GUN_URL = 'https://api.mailgun.net/v3/sandbox73985d0f8b4044c987da4d3b27a5e0e0.mailgun.org/messages'
const MAIL_GUN_BASIC_TOKEN = 'Basic YXBpOmtleS0zZDNiMzE1MWNkNGJkNzAwZDE0N2IzZjlmMDQ4N2Q3OQ=='

const server = http.createServer((request, response) => {
  if (request.url === '/send') {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    if (request.method === 'OPTIONS') {
      response.writeHead(200)
      response.end()
    }

    if (request.method === 'POST') {
      let body = ''
      request.on('data', chunk => {
        body += chunk.toString()
      })
      request.on('end', () => {
        const bodyParsed = JSON.parse(body)

        rp({
          method: 'post',
          uri: MAIL_GUN_URL,
          auth: {
            username: 'api',
            password: 'key-3d3b3151cd4bd700d147b3f9f0487d79'
          },
          headers: {
            'Authorization': MAIL_GUN_BASIC_TOKEN
          },
          form: {
            from: bodyParsed.from,
            to: bodyParsed.to[0],
            subject: bodyParsed.subject,
            text: bodyParsed.body
          }
        })
          .then(() => {
            response.end(body)
          })
          .catch(error => {
            response.writeHead(500)
            response.end(error.response)
          })
      })
    }
  } else {
    response.writeHead(404)
    response.end('not found')
  }
})

server.listen(PORT, () =>
  console.log('Server is listening on port %s', PORT)
)
