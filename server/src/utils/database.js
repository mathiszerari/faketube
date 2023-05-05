require('dotenv').config();
var mysql = require('mysql2');

module.exports = {
    db: mysql.createConnection({
        host: 'localhost',//process.env.DB_HOST,
        user: 'root',//process.env.DB_USER,
        //port: 'localhost',//process.env.DB_PORT,
        //password: 'localhost',//process.env.DB_PASSWORD ,
        database: 'faketube'
    })
}