
const express = require('express');
const router = express.Router();
const connection = require('../db/database1.js'); // Opdater stien efter behov
const { http } = require('../server'); // Adjust the path as per your directory structure



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



  router.get('/bestil/kurvtest', async (req, res) => {
    const { productIds } = req.session;
    try {
      if (!productIds || productIds.length === 0) {
        // Hvis productIds mangler eller er tom, returner en passende fejlmeddelelse
        return res.status(400).send('Ingen produkter i kurven');
      }
  
      const pool = await connection.poolPromise;
  
      // Opdateret SQL-forespørgslen med IN-klausul
      const [rows] = await pool.query('SELECT name, price, imageUrl, product_id FROM products WHERE product_id IN (?)', [productIds]);
  
      res.send(rows);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
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
  
  
  
  
  // Server endpoint for at fjerne et produkt fra kurven
  router.post("/bestil/fjernfraKurv", (req, res) => {
    const { productId } = req.body;
  
    // Fjern produktet fra kurven i Express-session
    req.session.productIds = req.session.productIds.filter(id => id !== productId);
  
    res.json({ success: true });
  });
  
  
  
  // hent ordersocket funktionen. 
  const setupOrderSocket  = require('../utility/orderSocket.js');
  
  //gennemfør order
  router.post('/kurv/placerordrer', async (req, res) => {
    const { productIds, date } = req.body;
    const customer_id = req.session.userId;
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
      
      // Efter at have gennemført ordren, opret forbindelse til socket og send opdatering
      setupOrderSocket(http);  // 'httpServer' skal være det korrekte objektnavn i din app

      res.json({ success: true, message: "Udført med succes!" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  
  // Fjern produkt-ID'er fra Express-session når der bestilles
router.post("/bestil/fjernprodukter", async (req, res) => {
  try {
      const { productIds } = req.body;

      if (productIds && productIds.length > 0) {
          // Hvis der er produkt-ID'er, fjern dem fra sessionen
          productIds.forEach(productId => {
              const index = req.session.productIds.indexOf(productId);
              if (index !== -1) {
                  req.session.productIds.splice(index, 1);
              }
          });

          res.json({ success: true });
      } else {
          res.status(400).json({ error: "Ingen produkt-ID'er blev angivet" });
      }
  } catch (error) {
      console.error("Fejl under fjernelse af produkt-ID'er fra session:", error);
      res.status(500).json({ error: "Fejl under fjernelse af produkt-ID'er fra session" });
  }
}); 

 





  
  
  // test for at se alle placedorders
//   router.get('/getplacedorders', async (req, res) => {
//     try {
//         const pool = await connection.poolPromise;
  
//         // Udfør SQL-forespørgslen her
//         const [rows] = await pool.query('SELECT * FROM placedorders');
  
//         res.send(rows);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error.message);
//     }
//   });



  
  
  
  
  
  
  
  module.exports = router;
  