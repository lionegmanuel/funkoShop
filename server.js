const http = require("http");

const { listadoAlumnos } = require("./alumnos.js");

const server = http.createServer((req, res) => {
  //extraccion del metodo de la solicitud mediante desestructuracion de javascript
  const { method } = req;

  switch (method) {
    case 'GET':
      return getControl(req, res);
    case 'POST':
      return postControl(req, res);
    default:
      console.log(`El servidor NO admite el método ${method}`);
  }
})
const port = 8080;
server.listen(port, () => {
  console.log(`SERVIDOR EN PUERTO: ${port}`);
})

function getControl(req, res) {
  const path = req.url;

  switch (path) {
    case '/':
      res.end('Ejecución del homepage exitosa');
      break;
    case '/alumnos':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('Listado de alumnos:\n' + JSON.stringify(listadoAlumnos));
      break;
    case '/alumnos/primer-ano':
      res.end("Alumnos de primer año:\n" + JSON.stringify(listadoAlumnos["primer año"]));
      break;
    case '/alumnos/segundo-ano':
      res.end('Listado de alumnos de 1er año: \n' + JSON.stringify(listadoAlumnos["segundo año"]));
      break;

    default:
      req.statusCode = 400;
      res.end('¡ERROR!\nParece que la pagina a la que desea ingresar NO existe o está rota.');
      break;
  }
}
function postControl(req, res) {
  const path = req.url;

  if (path === '/alumnos') {
    let body = 'DATOS DEL CUERPO';

    req.on('data', content => {
      body += content.toString();
    });
    req.on('end', () => {
      console.log(body);
      console.log(typeof body);
      //conversion a un objeto javascript para poder manipularlo y acceder a cada una de sus propiedades
      body = JSON.parse(body);
      console.log('Despues de convertir a JSON:\n' + body.titulo);
      res.end('Metodo POST en homepage');

    })




  }
  if (path === '/alumnos/tercer-ano') res.end('METODO POST aplicado en el listado de alumnos de 1er año: \n' + JSON.stringify(listadoAlumnos["tercer año"]));

}
