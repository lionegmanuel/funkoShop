//creacion de servidor
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('===> Inicializando "REQUEST"....\nDominio solicitado: ' + req.url);
  console.log("El resultado de la respuesta es... " + res.statusCode)
  res.end('Respuesta');

});

const port = 3000;

server.listen(port, () => {
  console.log(`Servidor ejecutado con éxito en http://localhost:${port}...`);
})