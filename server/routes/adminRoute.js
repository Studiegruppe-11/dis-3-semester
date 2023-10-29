const express = require('express');
const router = express.Router();
const connection = require('../db/database1.js');

// ADMIN LOGIN ROUTE
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const pool = await connection.poolPromise;
      // It's important to hash the password and compare it with the hashed password in the DB.
      const [rows] = await pool.query('SELECT * FROM admins WHERE username = ? AND password = SHA2(?, 256)', [username, password]);
      if (rows.length > 0) {
        req.session.isAdmin = true;
        req.session.username = username;
        res.redirect('/admin/data');
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
});

// Middleware for checking if the user is an admin
function isAdmin(req, res, next) {
    if (req.session.isAdmin) {
      next();
    } else {
        res.redirect('/admin/login');
    }
}

router.get('/admin/data', isAdmin, async (req, res) => {
    try {
      const pool = await connection.poolPromise;
      const [rows] = await pool.query('SELECT * FROM orders');
      res.json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
});

router.get('/admin/logout', (req, res) => {
  req.session.destroy();  // Destroy session
  res.redirect('/admin');  // Redirect
});

module.exports = router;
