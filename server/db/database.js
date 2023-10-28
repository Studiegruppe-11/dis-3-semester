// root/server/db/database.js

const path = require('path');  // Require the 'path' module at the top of your file
const dotenv = require('dotenv');

// Update this line to use an absolute path to your .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const mysql = require('mysql2/promise');  // Import promise version

// Defining the database configuration using environment variables
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306
};

// Creating a pool of database connections
const pool = mysql.createPool(dbConfig);  // Adjusted method name

// Function to execute a query and log the results
const executeQuery = async (query) => {
    try {
        const [rows, fields] = await pool.query(query);
        return rows;  // Returning the rows to the caller
    } catch (error) {
        console.error('Database query error:', error.message);
        console.error('Stack:', error.stack);
        throw error;  // Re-throw the error to be handled by the caller
    }
};

// Exporting the pool promise for use in other modules
module.exports = {
    poolPromise: pool, executeQuery
};
