import app from './src/app'
import http from 'http'

const port = process.env.PORT || 3000
app.set('port', port)

const server = http.createServer(app)

server.listen(port)

console.log('O node esta rodando na porta  ' + port)