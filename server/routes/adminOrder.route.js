

const express = require('express');
const router = express.Router();
const connection = require('../db/database1.js'); // Opdater stien efter behov


router.get('/getplacedorders', async (req, res) => {
    try {
        const pool = await connection.poolPromise;

        // Udfør SQL-forespørgslen her
        const [rows] = await pool.query(`
            SELECT customers.first_name, products.name
            FROM placedorders
            INNER JOIN customers ON placedorders.customer_id = customers.customer_id
            INNER JOIN products ON placedorders.product_id = products.product_id
            WHERE status = "waiting"
        `);

        res.send(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }

});

  
  



// get total revenue
router.get('/totalRevenue', async (req, res) => {
    try {
        const pool = await connection.poolPromise;

        // Udfør SQL-forespørgslen her
        const [rows] = await pool.query(`
            SELECT SUM(products.price) AS total_price
            FROM placedorders
            INNER JOIN products ON placedorders.product_id = products.product_id
        `);

        const totalPrice = rows[0].total_price;
        res.send({ total_price: totalPrice });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }

});

  
  
  
  
  
  module.exports = router;