const express = require('express');
const { listadoAlumnos } = require('../data/alumnos');
const app = express();

const { segundo_ano } = require('../data/alumnos').listadoAlumnos;

const routerSegundoAño = express.Router();
//middleware
routerSegundoAño.use(express.json());

routerSegundoAño.get('/', (req, res) => {
  res.send(JSON.stringify(segundo_ano));
})
routerSegundoAño.get('/:param', (req, res) => {
  let parameter = req.params.param;
  const regex = /^\d+$/; //patron que permite identificar si el contenido es UNICAMENTE numerico
  if (regex.test(parameter)) { //ID
    parameter = parseInt(parameter);
    let alumnoActual = "";
    const resultadoAlumno = segundo_ano.filter(alumno => alumno.id === parameter);
    //registro del alumno
    resultadoAlumno.forEach(alumno => {
      alumnoActual = alumno.nombre;
    });
    if (resultadoAlumno.length === 0 || alumnoActual == "") res.status(404).send('Alumno no encontrado');
    else res.send(`El alumno encontrado es ${alumnoActual}`);
  } else { // MATERIA
    const resultadoAlumno = segundo_ano.filter(alumnoMateria => alumnoMateria.Materia_Favorita.toUpperCase() === parameter.toUpperCase());
    if (resultadoAlumno.length === 0) res.status(404).send('Ningun alumno tiene la materia ' + parameter.toLocaleLowerCase() + ' asignada como favorita');
    else {
      let alumnoActual = "";
      if (resultadoAlumno.length == 1) {
        resultadoAlumno.forEach(alumno => {
          alumnoActual = alumno.nombre;
        })
        res.send(`El alumno que tiene la materia ${parameter.toLocaleLowerCase()} como favorita es: ${alumnoActual}`);
      }
      else {

        resultadoAlumno.forEach(alumno => {
          alumnoActual += "\n-" + alumno.nombre;
        })
        res.send('Los alumnos que tienen a la materia ' + parameter.toLocaleLowerCase() + ' como favorita son:\n' + alumnoActual);
      }
    }
  }

})
routerSegundoAño.post('/', (req, res) => {
  let alumnoNuevo = req.body;
  listadoAlumnos.push(alumnoNuevo);
  res.send(JSON.stringify(listadoAlumnos));
})
module.exports = routerSegundoAño;