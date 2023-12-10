

const express = require('express');
const router = express.Router();
const connection = require('../db/database1.js'); // Opdater stien efter behov

// hent alle 
// router.get('/getplacedorders', async (req, res) => {
//     try {
//         const pool = await connection.poolPromise;

//         // Udfør SQL-forespørgslen her
//         const [rows] = await pool.query(`
//             SELECT customers.first_name, products.name
//             FROM placedorders
//             INNER JOIN customers ON placedorders.customer_id = customers.customer_id
//             INNER JOIN products ON placedorders.product_id = products.product_id
//             WHERE status = "waiting"
//         `);

//         res.send(rows);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error.message);
//     }

// });

  
  



// hent total omtæning for i dag
router.get('/totalRevenuetoday', async (req, res) => {
    try {
        const pool = await connection.poolPromise;

        // Udfør SQL-forespørgslen her
        const [rows] = await pool.query(`
            SELECT SUM(products.price) AS total_price
            FROM placedorders
            INNER JOIN products ON placedorders.product_id = products.product_id
            where date = CURDATE()
            and status = "finished"
        `);

        const totalPrice = rows[0].total_price;
        res.send({ total_price: totalPrice });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }

});



// hent total omtæning
router.get('/totalRevenue', async (req, res) => {
    try {
        const pool = await connection.poolPromise;

        // Udfør SQL-forespørgslen her
        const [rows] = await pool.query(`
            SELECT SUM(products.price) AS total_price
            FROM placedorders
            INNER JOIN products ON placedorders.product_id = products.product_id
            where status = "finished"
        `);

        const totalPrice = rows[0].total_price;
        res.send({ total_price: totalPrice });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }

});
  
  
// hent antal færdige ordrer i dag
router.get('/finishedorders', async (req, res) => {
    try {
        const pool = await connection.poolPromise;

        // Udfør SQL-forespørgslen her
        const [rows] = await pool.query(`
            SELECT COUNT(*) AS finished_orders
            FROM placedorders
            WHERE status = "finished" AND date = CURDATE()
        `);

        const finishedOrders = rows[0].finished_orders;
        res.send({ finished_orders: finishedOrders });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});


router.post('/updatestatus', async (req, res) => {
    try {
      const pool = await connection.poolPromise;
  
      // Udfør SQL-forespørgslen her
      const [rows] = await pool.query(`
          UPDATE placedorders
          SET status = "finished"
          WHERE placedorders_id = ?
      `, [req.body.placeorders_id]);
  
      res.send({ status: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });
  




  
  
  module.exports = router;