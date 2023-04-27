require('dotenv').config();
var mysql = require('mysql2');

module.exports = {
    db: mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE
    })
}