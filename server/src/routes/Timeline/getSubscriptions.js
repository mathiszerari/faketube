const app = require('../../utils/app')
const db = require('../../utils/database')
var result;

app.app.get("/getUserSubscriptions/:userId", (req, res) => {
    let userId = req.params.userId
    db.db.query(
        'SELECT publisher_id FROM `subscription` WHERE subscriber_id=?',[userId],
    
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
    
            result = results
            res.json({ message: result });
        }   
    );
    
});