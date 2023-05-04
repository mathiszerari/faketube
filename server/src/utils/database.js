require('dotenv').config();
var mysql = require('mysql2');

module.exports = {
    db: mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD ,
        database: process.env.DATABASE
    })
}