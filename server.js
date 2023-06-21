const express = require('express'); //importacion de express
const app = express();

const { listadoAlumnos } = require('./alumnos');
app.get('/', (req, res) => {
  res.send('Primer servidor creado con express:\n');
});

app.get('/alumnos', (req, res) => {
  res.send('Primer servidor creado con express:\nListado de alumnos:\n' + JSON.stringify(listadoAlumnos));
});
app.get('/alumnos/primer-ano/', (req, res) => {
  res.send('Alumnos de primer año:\n' + JSON.stringify(listadoAlumnos.primer_ano));
});
app.get('/alumnos/primer-ano/:id', (req, res) => {
  const id = req.params.id;
  const alumno = listadoAlumnos.primer_ano.filter(alumnoActual => alumnoActual.id === id);
  if (alumno.length === 0 || alumno == "") res.send('Alumno no encontrado');
  else res.send('El alumno buscado es: ' + JSON.stringify(alumnoActual));
});










const port = process.env.port || 8080;
//escucha del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
})