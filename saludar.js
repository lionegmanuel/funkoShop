function saludar(nombre) {
  return `Hola ${nombre}`;
}
function saludarMundo() {
  return `Hola Hola Mundo`;
}
module.exports = {
  saludarUsuario: saludar,
  saludarMundo: saludarMundo
}