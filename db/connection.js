const mysql = require('mysql2');
const util = require('util');
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

db.query = util.promisify(db.query);

module.exports = db;