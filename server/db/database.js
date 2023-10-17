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
	return console.log(results);
});

module.exports = pool.promise();
