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
        const [rows] = await pool.query('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password]);
        if (rows.length > 0) {
            req.session.isAdmin = true;
            req.session.username = username;
            res.cookie('username', username, { httpOnly: false }); // Bruges til at vise username i admin.html
            res.json({ username: username });  // Send the username back in the response
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Admin Log ud
router.get('/admin/logout', (req, res) => {
    req.session.destroy(err => {  // Destroy the session
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while logging out' });
        } else {
            res.clearCookie('username');  // Clear the username cookie
            res.redirect('/admin/login');  // Redirect to the login page
        }
    });
});

// Nedenstående skal ikke være udkommenteret, men kan ikke få den til at virke. Lige nu kører der en "app.get" i server.js, som virker.
// Problemet er at "isAdmin" funktionen gerne skulle køre som middleware herinde fra. Måske man bare kan bruge app eller router.get i stedet for app.get i server.js
// har også prøvet med ../../
// router.get('/admin', isAdmin, (req, res) => {
//     res.sendFile(path.join(__dirname, "client\pages\admin.html"));
// });

  

module.exports = router;