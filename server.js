const http = require("http");

const alumnos = require("./alumnos.js");

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
  //if (path === '/') { req.statusCode = 200; res.end('Ejecución del homepage exitosa') } //cuando se este en la pagina principal
  switch (path) {
    case '/':
      req.statusCode = 200;
      res.end('Ejecución del homepage exitosa');
      break;
    case '/alumnos':
      req.statusCode = 200;
      res.end('Listado de alumnos:\n' + JSON.stringify(alumnos.listadoAlumnos));
      break;
    case '/alumnos/primer-año':
      req.statusCode = 200;
      res.end('Listado de alumnos de 1er año: \n' + JSON.stringify(alumnos.listadoAlumnos["primer año"]));
      break;
    case '/alumnos/segundo-año':
      req.statusCode = 200;
      res.end('Listado de alumnos de 1er año: \n' + JSON.stringify(alumnos.listadoAlumnos["segundo año"]));
      break;
    case '/alumnos/tercer-año':
      req.statusCode = 200;
      res.end('Listado de alumnos de 1er año: \n' + JSON.stringify(alumnos.listadoAlumnos["tercer año"]));
      break;
  }
}
