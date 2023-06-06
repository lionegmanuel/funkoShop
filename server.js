
function buyProduct(name) {
  return new Promise((resolve, reject) => {
    console.log(`Consultando por disponibilidad de: ${name}...`)
    setTimeout(() => {
      if (name === 'Computadora' || name === 'Tablet' || name === 'Celular') {
        resolve(`Producto adquirido con éxito`);

      } else reject('Producto NO disponible');
    }, 3000);
  });
}

function productProcess(result) {
  return new Promise((resolve) => {
    console.log('Procesando pedido...')
    setTimeout(() => {
      console.log(result);
      resolve('Muchas gracias por tu compra! Te esperamos proximamente...');
    }, 2000)
  });
}

async function pedido(productName) {
  try {
    const buy = await buyProduct(productName);
    console.log(buy);
    const process = await productProcess(buyProduct);
    console.log(process);
  } catch (error) {
    console.log(error);
  }
}

pedido('Celular');