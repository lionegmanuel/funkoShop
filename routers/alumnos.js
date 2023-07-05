const express = require('express');
const app = express();

const { listadoAlumnos } = require('../data/alumnos');
const routerAlumnos = express.Router();

routerAlumnos.get('/', (req, res) => {
  res.send('Listado de alumnos registrados:\n' + JSON.stringify(listadoAlumnos));
})

module.exports = routerAlumnos;
