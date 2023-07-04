const express = require('express');
const app = express();

const { primer_ano } = require('../data/alumnos').listadoAlumnos;
const routerPrimerAño = express.Router();

routerPrimerAño.get('/', (req, res) => {
  res.send(primer_ano);
})
routerPrimerAño.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let alumnoActual = "";
  const resultadoAlumno = primer_ano.filter(alumno => alumno.id === id);
  //registro del alumno
  resultadoAlumno.forEach(alumno => {
    alumnoActual = alumno.nombre;
  });
  if (resultadoAlumno.length === 0 || alumnoActual == "") res.status(404).send('Alumno no encontrado');
  else res.send(`El alumno encontrado es ${alumnoActual}`);
})
routerPrimerAño.get('/:materiaFavorita', (req, res) => {
  const nombreMateria = req.params.materiaFavorita.toUpperCase();
  const resultadoAlumno = primer_ano.filter(alumnoMateria => alumnoMateria.Materia_Favorita.toUpperCase() === nombreMateria);
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
module.exports = routerPrimerAño;

