const express = require('express'); //importacion de express
const app = express();

const { listadoAlumnos } = require('./data/alumnos');

app.get('/', (req, res) => {
  res.send('Primer servidor creado con express:\n');
});
const routerAlumnos = require('./routers/alumnos');
app.use('/alumnos', routerAlumnos);
const routerPrimerAño = require('./routers/primeraño');
app.use('/alumnos/primer-ano', routerPrimerAño);
const routerSegundoAño = require('./routers/segundaoaño');
app.use('/alumnos/segundo-ano', routerSegundoAño);
















const port = process.env.port || 8080;
//escucha del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
})