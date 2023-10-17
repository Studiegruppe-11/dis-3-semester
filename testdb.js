const getDb = require('./database.js'); // Opdater stien til at pege på din database.js-fil

const db = getDb();

// Udfør SQL-forespørgslen
db.query('SELECT * FROM customers', (err, results) => {
    if (err) {
        console.error('Fejl ved udførelse af SQL-forespørgsel:', err);
        return;
    }
    console.log('Resultater:', results);
});
