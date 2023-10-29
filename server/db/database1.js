// root/server/db/database1.js
// dette er den der bruges

const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306
};

const pool = mysql.createPool(dbConfig);

// Til at køre sql queries med fejl logging
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


module.exports = {
    poolPromise: 
        pool, 
        executeQuery
};