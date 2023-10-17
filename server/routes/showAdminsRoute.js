const express = require("express");
const adminRoute = express.Router();
const db = require('../db/database.js');

console.log(db);

adminRoute.get('/', async (req, res) => {
    try {
        const result = await db.execute('SELECT * FROM admins');
        console.log(result);
        const [rows, fields] = result;
        res.json(rows);
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
        res.status(500).send('Server error: ' + error.message);
    }
});



module.exports = adminRoute;
