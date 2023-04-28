const app = require('../../utils/app')
const db = require('../../utils/database')

const userPref = ['humour']
let sqlReq = "SELECT * FROM videos WHERE "

for (let i = 0; i < userPref.length; i++) {
    sqlReq += `title LIKE '%${userPref[i]}%' OR tags LIKE '%${userPref[i]}%' OR description LIKE '%${userPref[i]}%'`;
    if (i < userPref.length - 1) {
        sqlReq += " AND ";
    }
}
var result;
db.db.query(
    sqlReq,
    function(err, results, fields) {
        console.log(results); // results contains rows returned by server

        result = results
    }
);

app.app.get("/getAdvancedTimelineVideos", (req, res) => {
    res.json({ message: result });
});