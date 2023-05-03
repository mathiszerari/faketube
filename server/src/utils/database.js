require('dotenv').config();
var mysql = require('mysql2');

module.exports = {
    db: mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "faketube"
    })
}