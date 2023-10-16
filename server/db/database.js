const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // Din MySQL-server host, brug 'localhost' hvis din MySQL server kører på samme maskine
  user: 'root', // Din MySQL-brugernavn
  password: 'your-password', // Din MySQL-adgangskode
  database: 'your-database' // Navnet på din database
});

connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the DB: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

module.exports = connection;
