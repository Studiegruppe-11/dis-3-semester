const express = require("express");
const adminRoute = express.Router();
const db = require('../db/database.js');

adminRoute.get('/show-table', async (req, res) => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM admins');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = adminRoute;
