const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Konfigurer dotenv til at indlæse miljøvariabler fra .env-filen
require('dotenv').config();

// Middleware til at parse JSON-anmodninger
app.use(bodyParser.json());

// Opret forbindelse til MySQL-databasen ved hjælp af miljøvariabler
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


// Åbn forbindelsen til databasen
db.connect((err) => {
  if (err) {
    console.error('Fejl ved forbindelse til MySQL:', err);
    return;
  }
  console.log('Forbundet til MySQL-database.');
});

// Opret et endpoint /testdb
app.get('/testdb', (req, res) => {
  // Udfør en forespørgsel for at hente data fra tabellen 'test'
  db.query('SELECT * FROM test', (err, results) => {
    if (err) {
      console.error('Fejl ved forespørgsel:', err);
      res.status(500).json({ error: 'Fejl ved forespørgsel.' });
      return;
    }

    // Send resultatet som JSON
    res.json(results);
  });
});

// Start serveren på port 3000
app.listen(8000, () => {
  console.log('Serveren kører på port 3000.');
});
