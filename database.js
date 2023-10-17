// root/server/db/database.js

// const mysql = require('mysql2');
// const config = require('./config.js'); // Opdater stien til at pege på den korrekte placering af config-filen

// const db = mysql.createPool({
//     host: config.database.host,
//     user: config.database.user,
//     password: config.database.password,
//     database: config.database.name
// });

// db.getConnection((err, connection) => {
//     if (err) {
//         console.error('Fejl ved forbindelse til MySQL:', err);
//         return;
//     }
//     console.log('Forbundet til MySQL-database.');
//     connection.release();
// });



// // db.query('SELECT * FROM customers', (err, results) => {
// //     if (err) {
// //         console.error(err);
// //         return;
// //     }
// //     console.log(results);
// // });

//module.exports = db;


const mysql = require('mysql2');
const config = require('./config.js'); // Opdater stien til at pege på den korrekte placering af config-filen

// Opret en poolforbindelse
const db = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name
});

// Eksporter poolforbindelsen som en funktion
module.exports = () => db;
