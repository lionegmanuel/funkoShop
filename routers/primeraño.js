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
  let parametro = req.params.param;
  const regex = /^\d+$/; //patron que permite identificar si el contenido es UNICAMENTE numerico
  if (regex.test(parametro)) { //ID
    parametro = parseInt(parametro);
    let alumnoActual = "";
    const resultadoAlumno = primer_ano.filter(alumno => alumno.id === parametro);
    //registro del alumno
    resultadoAlumno.forEach(alumno => {
      alumnoActual = alumno.nombre;
    });
    if (resultadoAlumno.length === 0 || alumnoActual == "") res.status(404).send('Alumno no encontrado');
    else res.send(`El alumno encontrado es ${alumnoActual}`);
  }
  else { //MATERIA
    const resultadoAlumno = primer_ano.filter(alumnoMateria => alumnoMateria.Materia_Favorita.toUpperCase() === parametro.toUpperCase());
    if (resultadoAlumno.length === 0) res.status(404).send('Ningun alumno tiene la materia ' + parametro.toLocaleLowerCase() + ' asignada como favorita');
    else {
      let alumnoActual = "";
      if (resultadoAlumno.length == 1) {
        resultadoAlumno.forEach(alumno => {
          alumnoActual = alumno.nombre;
        })
        res.send(`El alumno que tiene la materia ${parametro.toLocaleLowerCase()} como favorita es: ${alumnoActual}`);
      }
      else {

        resultadoAlumno.forEach(alumno => {
          alumnoActual += "\n-" + alumno.nombre;
        })
        res.send('Los alumnos que tienen a la materia ' + parametro.toLocaleLowerCase() + ' como favorita son:\n' + alumnoActual);
      }
    }
  }
})
routerPrimerAño.post('/', (req, res) => {
  console.log('Solicitud de tipo "POST" recibida...');
  let alumnoNuevo = req.body;
  primer_ano.push(alumnoNuevo);
  res.send(primer_ano); //envia el listado de alumnos actualizado.

})
routerPrimerAño.put('/:parametro', (req, res) => {
  const alumnoActualizado = req.body;
  let parametro = req.params.parametro;
  const regex = /^\d+$/;
  let indice = 0;
  if (regex.test(parametro)) { //ID
    id = parseInt(parametro);
    indice = primer_ano.findIndex(alumno => alumno.id === id);
  } else indice = primer_ano.findIndex(alumno => alumno.nombre == parametro); //NOMBRE 

  if (indice >= 0) {
    primer_ano[indice] = alumnoActualizado;
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(primer_ano));
})
routerPrimerAño.patch('/:parametro', (req, res) => {
  let parametro = req.params.parametro;
  const regex = /^\d+$/;
  let indice = 0;
  const alumnoActualizado = req.body;
  if (regex.test(parametro)) {
    id = parseInt(parametro);
    indice = primer_ano.findIndex(alumno => alumno.id === id)
  } else indice = primer_ano.findIndex(alumno => alumno.nombre == parametro)
  if (indice >= 0) {
    const alumno = primer_ano[indice];
    Object.assign(alumno, alumnoActualizado);
  }
  res.send(JSON.stringify(primer_ano));
})
routerPrimerAño.delete('/:id', (req, res) => {
  const idAlumno = parseInt(req.params.id);
  const indiceAlumno = primer_ano.findIndex(alumno => alumno.id === idAlumno);
  if (indiceAlumno >= 0) primer_ano.splice(indiceAlumno, 1);
  res.send(JSON.stringify(primer_ano));
})
module.exports = routerPrimerAño;

