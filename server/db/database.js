const dotenv = require('dotenv');
dotenv.config({path: '../../.env'});

const {createPool} = require('mysql2');

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

});

pool.query('select * from admins', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

module.exports = pool.promise();

