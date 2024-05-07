const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

// Middleware para registrar las solicitudes HTTP
app.use(morgan('dev'));

// Sirve los archivos estáticos generados por CRA
app.use(express.static(path.join(__dirname, 'build')));

// Ruta de manejo para todas las solicitudes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Escucha en el puerto 3000
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
