// root/server/routes/adminRoute.js
const express = require('express');
const router = express.Router();
const connection = require('../db/database1.js');

// Middleware til at tjekke om brugeren er logget ind som admin
// function isAdmin(req, res, next) {
//     if (req.session.isAdmin) {
//         next();
//     } else {
//         res.redirect('/admin/login');
//     }
// }

// Admin Login Route
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const pool = await connection.poolPromise;
    try {
      // Udfør SQL-forespørgslen
      const [rows] = await pool.query(
        'SELECT * FROM admins WHERE username = ? AND password = ?',
        [username, password]
      );
  
      if (rows.length > 0) {
        const user = rows[0];
  
        // Gem brugerens id og navn i express-session
        req.session.userId = user.id;
        req.session.name = user.username;
  
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



// router.get('/admin', isAdmin, (req, res) => {
//     res.sendFile(path.join(__dirname, "../../client/pages/admin.html"));
//   });




router.get('/admin/admins', async (req, res) => {
    try {
        const pool = await connection.poolPromise;

        // Udfør SQL-forespørgslen her
        const [rows] = await pool.query('SELECT * FROM admins');

        res.send(rows);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});



module.exports = router;
