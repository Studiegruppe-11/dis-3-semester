const fs = require('fs');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Load and parse the config.json file
const configJSON = fs.readFileSync('config.json', 'utf8');
const config = JSON.parse(
  configJSON.replace(/\$\{(\w+)\}/g, (_, variable) => process.env[variable])
);

// Create the database connection
const connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the DB: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

module.exports = connection;
