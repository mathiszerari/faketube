const fs = require("fs");
const path = require("path")

const db = require('../utils/database')
const app = require('../utils/app')

const removeLastDirPart = dirname => path.parse(dirname).dir
var newpath = removeLastDirPart(__dirname)
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
        } else if (video.length < 1) {
            return res.status(200).json({ message: "This video isn't available anymore" });
        } else {
            return res.sendFile(newpath + video[0].video_path), (error) => {
                if (error) {
                    res.status(200).json({ message: "This miniature does not exist" });
                }
            };
        }
    })
});

app.app.get("/miniature/:id", (req, res) => {
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

    app.app.patch("/flux/:id", (req, res) => {
    const videoId = req.params.id;
    const { publisher_id, title, tags, like_number, dislike_number, views, description, video_path, miniature_path, created_at } = req.body;
    const updateFields = [];
    
    if (publisher_id) {
      updateFields.push(`publisher_id = ${publisher_id}`);
    }
    
    if (title) {
      updateFields.push(`title = '${title}'`);
    }
    
    if (tags) {
      updateFields.push(`tags = '${tags}'`);
    }
    
    if (like_number !== undefined) {
      updateFields.push(`like_number = ${like_number}`);
    }
    
    if (dislike_number !== undefined) {
      updateFields.push(`dislike_number = ${dislike_number}`);
    }
    
    if (views !== undefined) {
      updateFields.push(`views = ${views}`);
    }
    
    if (description) {
      updateFields.push(`description = '${description}'`);
    }
    
    if (video_path) {
      updateFields.push(`video_path = '${video_path}'`);
    }
    
    if (miniature_path) {
      updateFields.push(`miniature_path = '${miniature_path}'`);
    }
    
    if (created_at) {
      updateFields.push(`created_at = '${created_at}'`);
    }
    
    const updateQuery = `UPDATE videos SET ${updateFields.join(", ")} WHERE id = ${videoId}`;
    
    db.db.query(updateQuery, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred while updating the video.");
      } else {
        res.status(200).send("Video updated successfully.");
      }
    });
  });