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
  console.log("Login attempt for username:", username); // Logge brugernavn, der forsøger at logge ind

  const pool = await connection.poolPromise;
  try {
    // Hent brugeren fra databasen baseret på brugernavnet
    const [rows] = await pool.query('SELECT * FROM customers WHERE username = ?', [username]);

    console.log("Number of users fetched:", rows.length); // Logger antallet af brugere, der er hentet

    if (rows.length > 0) {
      const user = rows[0];

      console.log("Fetched user data for:", user.username); // Logger brugernavnet for den hentede bruger

      // Compare hashed password
      const match = await bcrypt.compare(password, user.password);
      console.log("Password match result:", match); // Logger resultatet af sammenligningen af adgangskoder

      if (match) {
        // Passwords match, set session details
        req.session.userId = user.customer_id;
        req.session.name = user.first_name;

        // Send success response
        res.json({ success: true });
      } else {
        // Passwords don't match
        res.json({ error: 'Forkert brugernavn eller adgangskode' });
      }
    } else {
      // User not found
      res.json({ error: 'Forkert brugernavn eller adgangskode' });
    }
  } catch (error) {
    console.log("Error during login process:", error); // Log any error during the login process
    res.status(500).json({ error: 'Der opstod en fejl under login.' });
  }
});


// Log ud

router.get("/users/logout", async (req, res) => {

    // Destroy the session
    req.session.destroy(function(err) {
      if(err) {
          console.error("Error destroying session:", err);
          return res.status(500).send("Could not log out.");
      }

      // Optionally, you can also clear the client-side cookie
      res.clearCookie('connect.sid'); // 'connect.sid' is the default session cookie name

      // Redirect to login page or send a success response
      res.redirect('/');
  });


  // Slet brugernavn og ID fra sessionen
    // delete req.session.userId;
    // delete req.session.name;
    // res.json({ loggedOut: true });
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
