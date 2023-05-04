const fs = require("fs");
const path = require("path")

const db = require('../../utils/database')
const app = require('../../utils/app')

const removeLastDirPart = dirname => path.parse(dirname).dir
var newpath = removeLastDirPart(__dirname)
newpath = removeLastDirPart(newpath)
newpath = removeLastDirPart(newpath)


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

app.app.get("/video/:id", (req, res) => {
    db.db.query(`SELECT * FROM videos WHERE id=${req.params.id}`,
    function(err, video) {
        if (err) {
            return res.status(500).json({ message: "Failed to retrieve video" });
        } else {
            return res.status(200).json({ video: video });
        }
    })
});

app.app.get("/flux/:id", (req, res) => {
    db.db.query(`SELECT * FROM videos WHERE id=${req.params.id}`,
    function(err, video) {
        if (err) {
            return res.status(500).json({ message: "Failed to retrieve video" });
        } else if (video.length < 1) {
            return res.status(200).json({ message: "This video isn't available anymore" });
        } else {
            return res.sendFile(newpath + video[0].video_path), (error) => {
                if (error) {
                    res.status(200).json({ message: "This video does not exist" });
                }
            };
        }
    })
});

app.app.get("/thumbnail/:id", (req, res) => {
	db.db.query(`SELECT * FROM videos WHERE id=${req.params.id}`,
    function(err, miniature) {
        if (err) {
            return res.status(500).json({ message: "Failed to retrieve miniature" });
        } else if (miniature.length < 1) {
            return res.status(200).json({ message: "This miniature isn't available anymore" });
        } else {
            return res.sendFile(newpath + miniature[0].miniature_path), (error) => {
                if (error) {
                    res.status(200).json({ message: "This miniature does not exist" });
                }
            };
        }
    })
});