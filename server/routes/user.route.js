//root/server/routes/user.route.js

const express = require('express');
const router = express.Router();
const connection = require('../db/database1.js'); // Opdater stien efter behov

// Endpoint for getting all customers
router.get('/users/customers', async (req, res) => {
    try {
        const pool = await connection.poolPromise;

        // Udfør SQL-forespørgslen her
        const [rows] = await pool.query('SELECT * FROM customers');

        res.send(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});




 
// Undersøg om login er korrekt.
router.post("/users/login", async (req, res) => {
    const { username, password } = req.body;
    const pool = await connection.poolPromise;
    try {
      // Udfør SQL-forespørgslen
      const [rows] = await pool.query(
        'SELECT * FROM customers WHERE username = ? AND password = ?',
        [username, password]
      );
  
      if (rows.length > 0) {
        const user = rows[0];
  
        // Gem brugerens id og navn i express-session
        req.session.userId = user.customer_id;
        req.session.username = user.username;
  
        // Send svar tilbage til klienten
        res.json({ success: true });
      } else {
        res.json({ error: 'Forkert brugernavn eller adgangskode' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Der opstod en fejl under login.' });
    }
  });


  


  // vis logget ind bruger


  // vis bruger

  router.get("/users/show", async (req, res) => {
    const { userId, username } = req.session;
    if (userId && username) {
      res.json({ userId, username });
    } else {
      res.status(404).json({ error: "User not found" });
    }
});







module.exports = router;
