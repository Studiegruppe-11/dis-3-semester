//root/server/routes/user.route.js

const express = require('express');
const router = express.Router();
const connection = require('../db/database1.js'); // Opdater stien efter behov
const bcrypt = require('bcrypt');

const { sendMail } = require('../utility/mailUtility');

// Salt rounds
const saltRounds = 10;

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

// Opret bruger i DB
router.post('/users/create', async (req, res) => {
  const {
    username,
    password,
    firstname,
    lastname,
    email
  } = req.body;

try {
      // Hasher passwordet
      const hashedPassword = await bcrypt.hash(password, saltRounds);

  const pool = await connection.poolPromise;
  const query = `
    INSERT INTO customers (username, password, first_name, last_name, email)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [username, hashedPassword, firstname, lastname, email];
  
  // Udfør SQL-forespørgslen her
  const [rows] = await pool.query(query, values);

// Hvis der er et insertId, er brugeren oprettet 
  if (rows.insertId) {
    // Call the sendMail function from mailUtility
    await sendMail(email, "Velkommen til Joe", `Hej ${firstname}, Velkommen til Joe's app!`, `<b>Hi ${firstname}</b>,<br>Vi er glade for at have dig med ombord..`);
    res.status(201).json({ message: 'Bruger oprettet og velkomstmail afsendt' });
  } else {
    res.status(400).json({ error: 'Bruger registrering fejlede' });
  }
} catch ( error ) {
  console.error("Fejl under bruger registrering eller velkomstmail afsendelse:", error);
  res.status(500).json({ error: 'Fejl under bruger registrering eller velkomstmail afsendelse' });
}
});

 
// Undersøg om login er korrekt.
router.post("/users/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt for username:", username);

  try {
    const pool = await connection.poolPromise;
    const [rows] = await pool.query('SELECT * FROM customers WHERE username = ?', [username]);

    console.log("Number of users fetched:", rows.length);

    if (rows.length > 0) {
      const user = rows[0];
      console.log("Fetched user data for:", user.username);

      const match = await bcrypt.compare(password, user.password);
      console.log("Password match result:", match);

      if (match) {
        req.session.userId = user.customer_id;
        req.session.name = user.first_name;
        console.log("User logged in successfully:", user.username);
        res.json({ success: true });
      } else {
        console.log("Password mismatch for user:", username);
        res.json({ error: 'Forkert brugernavn eller adgangskode' });
      }
    } else {
      console.log("No user found with username:", username);
      res.json({ error: 'Forkert brugernavn eller adgangskode' });
    }
  } catch (error) {
    console.error("Error during login process for username:", username, error);
    res.status(500).json({ error: 'Der opstod en fejl under login.' });
  }
});


// Log ud

router.get("/users/logout", async (req, res) => {

    // Slet brugernavn og ID fra sessionen
    delete req.session.userId;
    delete req.session.name;
    res.json({ loggedOut: true });
  }
  );


  
  // vis logget ind bruger ved at hente brugerens ID og navn fra sessionen
  router.get("/users/show", async (req, res) => {
    const { userId, name } = req.session;
    if (userId && name) {
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
});
 



// eksporter så den kaldes i server.js
module.exports = router;
