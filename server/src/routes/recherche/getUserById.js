const { request } = require('express');
const app = require('../../utils/app')
const db = require('../../utils/database')

var result;

app.app.get("/getUserById", (req, res) => {
    let userId = request.query.userId;

    db.db.query(
        'SELECT * FROM `users` WHERE id=?',[userId],
    
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
    
            result = results
        }   
    );
    
    res.json({ message: result });
});


