// root/server/routes/adminRoute.js
const express = require('express');
const router = express.Router();
const connection = require('../db/database1.js');

// Middleware til at tjekke om brugeren er logget ind som admin
function isAdmin(req, res, next) {
    if (req.session.isAdmin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}

// Admin Login Route
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const pool = await connection.poolPromise;
        const [rows] = await pool.query('SELECT * FROM admins WHERE username = ? AND password = SHA2(?, 256)', [username, password]);
        if (rows.length > 0) {
            req.session.isAdmin = true;
            req.session.username = username;
            res.redirect('/admin');
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
