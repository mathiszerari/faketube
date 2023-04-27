const fileUpload = require('express-fileupload');
const fs = require("fs");

const db = require('../utils/database')
const conn = require('./conn')

const path = require("path")

const app = require('../utils/app')
/*
app.use(express.static('videos')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());
*/

app.app.get("/videos", (req, res) => {
    db.db.query("SELECT * FROM videos",
    function(err, videos) {
    if (err) {
        return res.status(500).json({ message: "Failed to retrieve videos" });
    } else {
        return res.status(200).json({ videos });
    }
})
});

app.app.get("/video/:id", async (req, res) => {
    db.db.query(`SELECT * FROM videos WHERE id=${req.params.id}`,
    function(err, video) {
        if (err) {
            return res.status(500).json({ message: "Failed to retrieve video" });
        } else if (video.length < 1) {
            return res.status(200).json({ message: "This video isn't available anymore" });
        } else {
            const removeLastDirPart = dirname => path.parse(dirname).dir
            var newpath = removeLastDirPart(__dirname)
            newpath = removeLastDirPart(newpath)
            return res.sendFile(newpath+"/"+video[0].video_path), (error) => {
                if (error) {
                    res.status(200).json({ message: "This miniature does not exist" });
                }
            };
        }
    })
});

app.app.get("/miniature/:id", async (req, res) => {
	db.db.query(`SELECT * FROM videos WHERE id=${req.params.id}`,
    function(err, miniature) {
        if (err) {
            return res.status(500).json({ message: "Failed to retrieve miniature" });
        } else if (miniature.length < 1) {
            return res.status(200).json({ message: "This miniature isn't available anymore" });
        } else {
            const removeLastDirPart = dirname => path.parse(dirname).dir
            var newpath = removeLastDirPart(__dirname)
            newpath = removeLastDirPart(newpath)
            return res.sendFile(newpath+"/"+miniature[0].miniature_path), (error) => {
                if (error) {
                    res.status(200).json({ message: "This miniature does not exist" });
                }
            };
        }
    })
});