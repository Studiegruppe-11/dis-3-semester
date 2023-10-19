// root/server/routes/itemOrderRoute.js

const express = require("express");
const adminRoute = express.Router();
const { executeQuery } = require('../db/database.js');  // Destructure to get the executeQuery function

adminRoute.get('/', async (req, res) => {
    try {
        const rows = await executeQuery('SELECT * FROM item_order');  // Use the executeQuery function
        res.json(rows);
        console.log('Item_order data has been fetched.')
    } catch (error) {
        // This catch block will handle any other errors that may occur in this route handler,
        // or if you decide to throw errors from executeQuery in the future.
        res.status(500).send('Server error: ' + error.message);
    }
});



module.exports = adminRoute;
