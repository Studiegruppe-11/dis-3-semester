// Fil: server/routes/cartRoute.js

const express = require('express');
const router = express.Router();
const customers = require('../db/customers');

// Endpoint til at tilføje et element til brugerens indkøbskurv
router.post('/add', function(req, res) {
    console.log(req.body);  // logge innkommende forespørselslegeme
    const itemName = req.body.itemName;
    const username = req.body.username;
  
    const customer = customers.find(customer => customer.username === username);
    console.log(customer);  // logge funnet kundeobjekt
    if (customer) {
      customer.cart.push(itemName);
      res.json({ message: 'Item added to cart' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
  

module.exports = router;
