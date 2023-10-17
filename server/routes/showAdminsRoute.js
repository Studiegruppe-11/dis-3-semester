const express = require("express");
const adminRoute = express.Router();
const db = require('../db/database.js');

adminRoute.get('/', async (req, res) => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM admins');
        res.json(rows);
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
        res.status(500).send('Server error: ' + error.message);
    }
});


module.exports = adminRoute;
