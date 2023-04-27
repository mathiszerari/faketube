const app = require('../utils/app')
const db = require('../utils/database')

var result;
db.db.query(
    'SELECT * FROM `users` WHERE id=',

    function(err, results, fields) {
        console.log(results); // results contains rows returned by server

        result = results
    }   
);

app.app.get("/getUserById", (req, res) => {
    res.json({ message: result });
});