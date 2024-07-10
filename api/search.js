const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.get('/search', (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return res.status(400).json({ error: 'No se proporcionó ningún NIT' });
    }

    const query = `
        SELECT 
            p.id, 
            p.date, 
            p.statusDate, 
            p.preparingDate, 
            p.shippedDate, 
            p.deliveredDate, 
            p.total 
        FROM pedidos p
        JOIN clientes c ON p.cliente_id = c.id
        WHERE c.nit = ?
    `;

    connection.query(query, [keyword], (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos:', err);
            return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        }

        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).json({ error: 'No se encontraron resultados para el NIT proporcionado' });
        }
    });
});

module.exports = router;
