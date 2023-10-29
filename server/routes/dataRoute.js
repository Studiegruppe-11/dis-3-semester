// root/server/routes/dataRoute.js
const express = require('express');
const router = express.Router();
const connection = require('../db/database1.js');

router.get('/admin/data', async (req, res) => {
    try {
        const pool = await connection.poolPromise;
        const [rows] = await pool.query('SELECT * FROM orders');  // Assuming your table name is 'orders'
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});


module.exports = router;
