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
app.get('/alumnos/segundo-ano/', (req, res) => {
  res.send('Alumnos de segundo año:\n' + JSON.stringify(listadoAlumnos.segundo_ano));
});
//trabajo con routers
const routerAlumnos = app._router;
app.use('/alumnos', routerAlumnos);
routerAlumnos.get('/primer-ano/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let alumnoActual = "";
  const resultadoAlumno = listadoAlumnos.primer_ano.filter(alumno => alumno.id === id);
  //registro del alumno
  resultadoAlumno.forEach(alumno => {
    alumnoActual = alumno.nombre;
  });
  if (resultadoAlumno.length === 0 || alumnoActual == "") res.status(404).send('Alumno no encontrado');
  else res.send(`El alumno encontrado es ${alumnoActual}`);
});
routerAlumnos.get('/alumnos/segundo-ano/:materiaFavorita', (req, res) => {
  const nombreMateria = req.params.materiaFavorita.toUpperCase();
  const resultadoAlumno = listadoAlumnos.segundo_ano.filter(alumnoMateria => alumnoMateria.Materia_Favorita.toUpperCase() === nombreMateria);
  if (resultadoAlumno.length === 0) res.status(404).send('Ningun alumno tiene la materia ' + nombreMateria.toLocaleLowerCase() + ' asignada como favorita');
  else {
    let alumnoActual = "";
    if (resultadoAlumno.length == 1) {
      resultadoAlumno.forEach(alumno => {
        alumnoActual = alumno.nombre;
      })
      res.send(`El alumno que tiene la materia ${nombreMateria.toLocaleLowerCase()} como favorita es: ${alumnoActual}`);
    }
    else {

      resultadoAlumno.forEach(alumno => {
        alumnoActual += "\n-" + alumno.nombre;
      })
      res.send('Los alumnos que tienen a la materia ' + nombreMateria.toLocaleLowerCase() + ' como favorita son:\n' + alumnoActual);

    }
  }

})










const port = process.env.port || 8080;
//escucha del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
})