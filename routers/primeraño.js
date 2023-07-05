const express = require('express');
const { listadoAlumnos } = require('../data/alumnos');
const app = express();

const { primer_ano } = require('../data/alumnos').listadoAlumnos;
const routerPrimerAño = express.Router();
//middleware
routerPrimerAño.use(express.json());
//homepage
routerPrimerAño.get('/', (req, res) => {
  res.send(JSON.stringify(primer_ano));
})
routerPrimerAño.get('/:param', (req, res) => {
  let parameter = req.params.param;
  const regex = /^\d+$/; //patron que permite identificar si el contenido es UNICAMENTE numerico
  if (regex.test(parameter)) { //ID
    parameter = parseInt(parameter);
    let alumnoActual = "";
    const resultadoAlumno = primer_ano.filter(alumno => alumno.id === parameter);
    //registro del alumno
    resultadoAlumno.forEach(alumno => {
      alumnoActual = alumno.nombre;
    });
    if (resultadoAlumno.length === 0 || alumnoActual == "") res.status(404).send('Alumno no encontrado');
    else res.send(`El alumno encontrado es ${alumnoActual}`);
  }
  else { //MATERIA
    const resultadoAlumno = primer_ano.filter(alumnoMateria => alumnoMateria.Materia_Favorita.toUpperCase() === parameter.toUpperCase());
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
routerPrimerAño.post('/', (req, res) => {
  console.log('Solicitud de tipo "POST" recibida.');
  let alumnoNuevo = req.body; //extrae el cuerpo de la solicitud
  listadoAlumnos.push(alumnoNuevo);
  res.send(JSON.stringify(listadoAlumnos));
})
module.exports = routerPrimerAño;

