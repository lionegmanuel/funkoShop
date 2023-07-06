const express = require('express'); //importacion de express
const app = express();

const { listadoAlumnos } = require('./data/alumnos');

app.get('/', (req, res) => {
  res.send('<h1>Primer servidor</1>\n<h3>creado con express:</3>');
});
const routerAlumnos = require('./routers/alumnos');
app.use('/alumnos', routerAlumnos);
const routerPrimerAño = require('./routers/primeraño');
app.use('/alumnos/primer-ano', routerPrimerAño);
const routerSegundoAño = require('./routers/segundoaño');
app.use('/alumnos/segundo-ano', routerSegundoAño);
















const port = process.env.port || 8080;
//escucha del servidor
app.listen(port, () => {
  console.info(`Servidor corriendo en el puerto ${port}`);
})