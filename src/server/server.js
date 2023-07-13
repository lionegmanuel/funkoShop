const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webPackMiddleware = require('webpack-dev-middleware');
const webPackConfiguration = require('../../webpack.config');

const app = express();
app.set('port', (process.env.PORT || 8080));
/*
app.use('/static', express.static('multimedia'));
*/
app.use('/multimedia', express.static(path.join(__dirname, '../../multimedia')));
app.use(webPackMiddleware(webpack(webPackConfiguration)));

app.get('/', (req, res) => {
  res.send('Bienvenido a FUNKO SHOP');
})
app.get('/contact.html', (req, res) => {
  console.log("Inicia en el formulario de contacto.");
  res.sendFile(path.join(__dirname, '../client/contact.html'));

})
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/login.html'));
})
app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/register.html'));
})
app.get('/shop.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/shop.html'));
})

app.listen(app.get('port'), () => {
  console.log(`Servidor funcionando en puerto ${app.get('port')}`);
});