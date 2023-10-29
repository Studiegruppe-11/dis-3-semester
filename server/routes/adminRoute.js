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
        
        // Log entire admins table (not recommended)
        const [allAdmins] = await pool.query('SELECT * FROM admins');
        console.log('All admins:', allAdmins);
        
        // Adjusted query to match against plaintext password
        const [rows] = await pool.query('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password]);
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

// router.get('/admin', isAdmin, (req, res) => {
//     res.sendFile(path.join(__dirname, "../../client/pages/admin.html"));
//   });

module.exports = router;
