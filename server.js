const EventEmitter = require('events');

const emisorCelulares = new EventEmitter();

emisorCelulares.on('compra', (usuario, localidadDeOrigen) => {
  console.log(`Compra realizada.Detalles de la compra: \n1 - Nombre: ${usuario}\n2-Origen de la compra: ${localidadDeOrigen}`);
})
console.log("Venta de producto N°1:\n")
emisorCelulares.emit('compra');



