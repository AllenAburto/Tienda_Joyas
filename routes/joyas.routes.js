const express = require('express');
const router = express.Router();
const pool = require('../config/database');

const logRequest = (req, res, next) => {
    console.log(`Consulta a la ruta: ${req.originalUrl}`);
    next();
};

router.use(logRequest);

router.get('/', async (req, res) => {
    try {
        let { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
        let [orderColumn, orderDirection] = order_by.split('_');
        
        const offset = (page - 1) * limits;

        const result = await pool.query(
            `SELECT * FROM inventario ORDER BY ${orderColumn} ${orderDirection} LIMIT $1 OFFSET $2`,
            [limits, offset]
        );

        const joyas = result.rows.map(joya => ({
            ...joya,
            links: [
                { rel: "self", href: `/joyas/${joya.id}` },
                { rel: "all", href: "/joyas" }
            ]
        }));

        res.json(joyas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
});

router.get('/filtros', async (req, res) => {
    try {
        let { precio_min, precio_max, categoria, metal } = req.query;
        let query = 'SELECT * FROM inventario WHERE 1=1';
        let values = [];
        
        if (precio_min) {
            values.push(precio_min);
            query += ` AND precio >= $${values.length}`;
        }
        if (precio_max) {
            values.push(precio_max);
            query += ` AND precio <= $${values.length}`;
        }
        if (categoria) {
            values.push(categoria);
            query += ` AND categoria = $${values.length}`;
        }
        if (metal) {
            values.push(metal);
            query += ` AND metal = $${values.length}`;
        }

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (error) {
        next (error);
    }
});

module.exports = router;