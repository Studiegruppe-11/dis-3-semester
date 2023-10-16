const mysql = require('mysql');
const config = require('./config.json');

const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name
});

connection.connect(error => {
    if (error) throw error;
    console.log('Database connected successfully.');
});

module.exports = connection;
