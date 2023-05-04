const app = require('../../utils/app')
const db = require('../../utils/database')

var result;


app.app.get("/getVideoByPublisherId/:publisherId", (req, res) => {
    const publisherId = req.params.publisherId
    db.db.query(
        // WHERE publisher_id  
        `SELECT * FROM videos WHERE publisher_id =?`,[publisherId],
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            res.json({ message: results });
        }
    );
});

// app.app.get("/channel/:id", (req, res) => {
//     db.db.query(`SELECT * FROM users WHERE id=${req.params.id}`,
//     function(err, chaine) {
//         if (err) {
//             return res.status(500).json({ message: "channel do not exist" });
//         } else if (chaine.length == 1) {
//             return res.status(200).json(chaine);
//         }  else {
//             return res.sendFile(newpath + chaine[0].pseudo), (error) => {
//                 if (error) {
//                     res.status(200).json({ message: "channel error" });
//                 }
//             };
//         } 
//     })
// });