    // root/server/routes/adminRoute.js
    const express = require('express');
    const router = express.Router();
    const connection = require('../db/database1.js');

// Undersøg om login er korrekt.
router.post("/admin/login", async (req, res) => {
    const { username, password } = req.body;
    const pool = await connection.poolPromise;
    try {
      // Udfør SQL-forespørgslen
      const [rows] = await pool.query(
        'SELECT * FROM admins WHERE username = ? AND password = ?',
        [username, password]
      );
  
      if (rows.length > 0) {
        const adminUser = rows[0];
  
        // Gem brugerens id og navn i express-session
        req.session.adminUserId = adminUser.id;
        req.session.adminName = adminUser.username;
  
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


  // vis navn
  router.get("/admins/show", async (req, res) => {
    const { adminUserId, adminName } = req.session;
    if (adminUserId && adminName) {
      res.json({ adminUserId, adminName });
    } else {
      res.status(404).json({ error: "User not found" });
    }
});

// logud 
router.get("/admin/logout", async (req, res) => {
  req.session.destroy(function(err) {
    if (err) {
        console.error("Error destroying session:", err);
    }
  });
    res.json({ loggedOut: true });
});



    module.exports = router;