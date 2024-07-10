const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Asegúrate de que la contraseña sea correcta
    database: 'logistica'
});

connection.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

module.exports = connection;
