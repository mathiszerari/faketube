/* require('dotenv').config();
var mysql = require('mysql2');

module.exports = {
    db: mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE
    })
} */


require('dotenv').config();
var mysql = require('mysql2');

module.exports = {
    db: mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'faketube',
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    })
};