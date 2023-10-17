require('dotenv').config();

const config = {
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        name: process.env.DB_NAME
    }
}

console.log(config);

module.exports = config;
