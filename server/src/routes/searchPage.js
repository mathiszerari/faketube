const app = require('../utils/app')
const db = require('../utils/database')

var result;

db.db.query(
    
    'SELECT videos.*, users.pseudo AS user_pseudo ' +
    'FROM videos ' +
    'INNER JOIN users ON videos.user_id = users.id',
    function(err, results, fields) {
        console.log(results); // results contains rows returned by server

        result = results
    }   
);

app.app.get("/searchPage", (req, res) => {
    res.json({ message: result });
});
