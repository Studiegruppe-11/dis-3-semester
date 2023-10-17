// root/server/db/database.js

const dotenv = require('dotenv');
dotenv.config({path: '../../.env'});

const {createPool} = require('mysql2');

// Defining the database configuration using environment variables
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

// Creating a pool of database connections
const pool = createPool(dbConfig);

// Function to execute a query and log the results
const executeQuery = async (query) => {
    try {
        const [rows, fields] = await pool.execute(query);
        console.log(rows);
    } catch (error) {
        console.error('Database query error:', error.message);
    }
};

// Example usage: Executing a query to select all from the 'admins' table
executeQuery('SELECT * FROM admins');

// Exporting the pool promise for use in other modules
module.exports = {
    poolPromise: pool.promise(),
    executeQuery
};