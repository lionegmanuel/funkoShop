const express = require('express');
const { listadoAlumnos } = require('../data/alumnos');
const app = express();

const { segundo_ano } = require('../data/alumnos').listadoAlumnos;

const routerSegundoAño = express.Router();

routerSegundoAño.get('/', (req, res) => {
  res.send(segundo_ano);
})
routerSegundoAño.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let alumnoActual = "";
  const resultadoAlumno = segundo_ano.filter(alumno => alumno.id === id);
  //registro del alumno
  resultadoAlumno.forEach(alumno => {
    alumnoActual = alumno.nombre;
  });
  if (resultadoAlumno.length === 0 || alumnoActual == "") res.status(404).send('Alumno no encontrado');
  else res.send(`El alumno encontrado es ${alumnoActual}`);
})
routerSegundoAño.get('/:materiaFavorita', (req, res) => {
  const nombreMateria = req.params.materiaFavorita.toUpperCase();
  const resultadoAlumno = segundo_ano.filter(alumnoMateria => alumnoMateria.Materia_Favorita.toUpperCase() === nombreMateria);
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
module.exports = routerSegundoAño;