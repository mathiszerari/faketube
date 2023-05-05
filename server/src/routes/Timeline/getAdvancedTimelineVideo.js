const app = require('../../utils/app')
const db = require('../../utils/database')

app.app.get("/getAdvancedTimelineVideos/:userId", (req, res) => {
    // GET USER PREF
    const userId = req.params.userId
    let userPref = ['']
    console.log(userId);
    db.db.query(
        `SELECT DISTINCT prefs FROM users WHERE id = ${userId}`,
        function(err, results, fields){
            console.log(userId);
            if (err) {
                throw err;
            }
            if (results[0].prefs == null) {
                res.json({ message: null });
            }else{
                userPref = results[0].prefs.split(' ')
                // GET VIDEO
                let sqlReq = "SELECT * FROM videos WHERE "
                for (let i = 0; i < userPref.length; i++) {
                    sqlReq += `title LIKE '%${userPref[i]}%' OR tags LIKE '%${userPref[i]}%' OR description LIKE '%${userPref[i]}%'`;
                    if (i < userPref.length - 1) {
                        sqlReq += " AND ";
                    }
                }
                sqlReq += " LIMIT 15"
                db.db.query(
                    sqlReq,
                    function(err, results, fields) {
                        if (err) throw err;
                        res.json({ message: results });
                    }
                );
            }
            

            
        }
    )
});
