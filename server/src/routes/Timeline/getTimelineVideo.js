const app = require('../../utils/app')
const db = require('../../utils/database')

var result;


app.app.get("/getTimelineVideos", (req, res) => {
    const randomNumber = Math.floor( Math.random() * 10000000)
    db.db.query(
        `SELECT * FROM videos ORDER BY RAND(${randomNumber}) LIMIT 30`,
    
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            res.json({ message: results });
        }
    );
});