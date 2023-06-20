
const http = require('http');
const app = require('./app');




const server = http.createServer(app);


server.on('listening', () => {

    console.log('Listening on' + ' 8080')
})

server.listen(8080)