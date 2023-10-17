// root/server/routes/showAdminsRoute.js

const express = require("express");
const adminRoute = express.Router();
const db = require('../db/database.js');

console.log(db)

adminRoute.get('/', async (req, res) => {
    try {
        const [rows, fields] = await db.poolPromise.query('SELECT * FROM admins');
        res.json(rows);
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
        res.status(500).send('Server error: ' + error.message);
    }
});



module.exports = adminRoute;
