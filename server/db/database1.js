// root/server/db/database1.js

// Ansvarlig for at oprette og eksportere en forbindelsespool til din MySQL-database ved hjælp af mysql2/promise biblioteket. Den bruger miljøvariabler til at konfigurere forbindelsen, som er defineret i .env filen i roden af dit projekt.
// require statements: Importerer nødvendige moduler. path og dotenv bruges til at håndtere miljøvariabler, og mysql2/promise bruges til at oprette en forbindelse til MySQL-databasen.
// dotenv.config: Indlæser miljøvariabler fra lokal .env fil.
// dbConfig: Definerer konfigurationen for databasen ved hjælp af miljøvariabler.
// pool: Opretter en forbindelsespool ved hjælp af dbconfig konfigurationen.
// module.exports: Eksporterer forbindelsespoolen, så den kan genbruges i andre dele af applikationen.
// Brugt i andre filer i server/ mappen, specifikt i filer, der har brug for at interagere med databasen. 
// For eksempel, i routes/ mappe, er der filer, der bruger denne forbindelsespool til at udføre SQL-forespørgsler.


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


module.exports = {
    poolPromise: 
        pool
};