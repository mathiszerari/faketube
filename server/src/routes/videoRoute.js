const fileUpload = require('express-fileupload');
const fs = require("fs");

const db = require('../utils/database')
const conn = require('./conn')

const app = require('../utils/app')


app.app.get("/videos", async (req, res) => {
    db.db.query("SELECT * FROM videos",
    function(err, videos) {
    if (err) {
        return res.status(500).json({ message: "Failed to retrieve all users" });
    } else {
        console.log(videos)
        return res.status(200).json({ videos });
    }
})
});
