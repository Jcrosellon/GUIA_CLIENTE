const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Importar el middleware CORS
const searchRouter = require('./api/search');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Habilitar CORS para todas las solicitudes
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api', searchRouter);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
