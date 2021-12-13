const mysql = require('mysql2');

// Connect to database

const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'pass',
        database: 'company'
    },
    console.log('Connected to company database.')
);

module.exports = db;