const app = require('../utils/app')
const db = require('../utils/database')

var result;
db.db.query(
    'SELECT * FROM `users`',

    function(err, results, fields) {
        console.log(results); // results contains rows returned by server

        result = results
    }
);

app.app.get("/uploadVideo", (req, res) => {
    res.json({ message: result });
});