//root/server/routes/user.route.js

const express = require('express');
const router = express.Router();
const connection = require('../db/database1.js'); // Opdater stien efter behov

// Importer function til at sende mail
const { sendWelcomeEmail } = require('../utility/mailUtility.js');
console.log('sendWelcomeEmail: ', sendWelcomeEmail);


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
    country,
    age,
    email,
    gender,
    street_name,
    street_number,
    postal_code,
    city
  } = req.body;
//   try {
//     const pool = await connection.poolPromise;

//     // Udfør SQL-forespørgslen her
//     const query = `
//       INSERT INTO customers (username, password, first_name, last_name, country, age, email, gender, street_name, street_number, postal_code, city)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const values = [username, password, firstname, lastname, country, age, email, gender, street_name, street_number, postal_code, city];

//     const [rows] = await pool.query(query, values);

//     res.send(rows);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// });
try {
  const pool = await connection.poolPromise;
  const query = `
    INSERT INTO customers (username, password, first_name, last_name, country, age, email, gender, street_name, street_number, postal_code, city)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [username, password, firstname, lastname, country, age, email, gender, street_name, street_number, postal_code, city];
  
  // Insert the user into the database
  const [rows] = await pool.query(query, values);

  // If the insert was successful and we have an inserted user's id
  if (rows.insertId) {
    // Call your sendWelcomeEmail function here
    // Assuming sendWelcomeEmail is an async function and takes the user's email and name as parameters
    await sendWelcomeEmail(email, firstname + ' ' + lastname);
  }
  
  // Send a response back to the client
  res.status(201).json({ message: 'User created and email sent' });
} catch (error) {
  // If sending the email throws an error, you would catch it here as well
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
        req.session.name = user.first_name;
  
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



// Log ud

router.get("/users/logout", async (req, res) => {
    req.session.destroy();
    res.json({ loggedOut: true });
  }
  );
 


  // vis logget ind bruger


  // vis bruger

  router.get("/users/show", async (req, res) => {
    const { userId, name } = req.session;
    if (userId && name) {
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
});
 




// BESTIL PRODUKTER OG SE KURV. ALTSÅ BESTIL.HTML/JS OG KURV.HTML/JS
// SKAL NOK OVER I EN ANDEN ROUTE, DA DET ER EN ANDEN SIDE.

// hent alle sandwich fra db
router.get('/orders/sandwich', async (req, res) => {
  try {
      const pool = await connection.poolPromise;

      // Udfør SQL-forespørgslen her
      const [rows] = await pool.query('SELECT * FROM products where category = "Sandwich"');

      res.send(rows);
  } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
  }
});

// hent alle juice fra db
router.get('/orders/juice', async (req, res) => {
  try {
      const pool = await connection.poolPromise;

      // Udfør SQL-forespørgslen her
      const [rows] = await pool.query('SELECT * FROM products where category = "Juice"');

      res.send(rows);
  } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
  }
});


// Gem id fra produktet i session, så det kan vises i kurv.html, når der klikkes på tilføj til kurv i bestil.js
router.post("/bestil/kurv", async (req, res) => {
  const { product_id } = req.body;

  // Hvis der ikke er nogen kurv i sessionen, opret et tomt array
  req.session.productIds = req.session.productIds || [];

  // Tilføj det nye produkt_id til arrayet
  req.session.productIds.push(product_id);

  res.json({ success: true });
});



// Se om produkterne er gemt på endpoint
router.get("/bestil/kurv", async (req, res) => {
  const { productIds } = req.session;

  if (productIds && productIds.length > 0) {
    res.json({ productIds });
  } else {
    res.status(404).json({ error: "Ingen produkter i kurven" });
  }
});



// Gem id fra produkterne i kurven når der klikkes på gennemfør order i kurv.js/html
router.post("/kurv/placedorders", async (req, res) => {
  const { placedorder } = req.body;

  // Hvis der ikke er nogen kurv i sessionen, opret et tomt array
  req.session.placedorders = req.session.placedorders || [];

  // Tilføj det nye produkt_id til arrayet
  req.session.placedorders.push(placedorder);

  res.json({ success: true });
});



// Se om de bestile varer er gemt på endpoint
router.get("/kurv/placedorders", async (req, res) => {
  const { placedorders } = req.session;

  if (placedorders && placedorders.length > 0) {
    res.json({ placedorders });
  } else {
    res.status(404).json({ error: "Ingen produkter er bestilt" });
  }
});


// Se om produkterne er gemt på endpoint
router.get("/kurv/placedorders", async (req, res) => {
  const { placedorders } = req.session;

  if (placedorders && placedorders.length > 0) {
    res.json({ placedorders });
  } else {
    res.status(404).json({ error: "Ingen produkter i kurven" });
  }
});









//TEST
router.post('/kurv/placerordrer', async (req, res) => {
  const { productIds, date } = req.body;
  const customer_id = 3;
  const status = "waiting";

  try {
    const pool = await connection.poolPromise;

    // Iterér gennem produkt-IDs og indsæt dem i databasen
    for (const placedorder of productIds) {
      const query = `
        INSERT INTO placedorders (customer_id, product_id, date, status)
        VALUES (?, ?, ?, ?)
      `;
  
      const values = [customer_id, placedorder, date, status];
  
      await pool.query(query, values);
    }

    res.json({ success: true, message: "Test udført med succes!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});











// test for at se alle placedorders
router.get('/getplacedorders', async (req, res) => {
  try {
      const pool = await connection.poolPromise;

      // Udfør SQL-forespørgslen her
      const [rows] = await pool.query('SELECT * FROM placedorders');

      res.send(rows);
  } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
  }
});








module.exports = router;
