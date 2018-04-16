const http = require('http')
const PORT = 8888

const server = http.createServer((request, response) => {
  if (request.url === '/send' && (request.method === 'POST' || request.method === 'OPTIONS')) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    response.writeHead(200)
    let body = ''

    request.on('data', chunk => {
      body += chunk.toString()
    })
    request.on('end', () => {
      console.log(body)
      response.end(body)
    })
  } else {
    response.writeHead(404)
    response.end('not found')
  }
})

server.listen(PORT, () =>
  console.log('Server is listening on port %s', PORT)
)
