const fs = require('fs');
fs.readFile('inde.html', 'utf-8', (err, content) => {
  if (err) throw Error('¡Ocurrió un error inesperado');
  else console.log(content);

});


