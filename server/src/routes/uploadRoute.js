const app = require('../utils/app')
const db = require('../utils/database')
const fileUpload = require('express-fileupload');
const path = require("path")

app.app.use(fileUpload());

const removeLastDirPart = dirname => path.parse(dirname).dir
var newpath = removeLastDirPart(__dirname)
newpath = removeLastDirPart(newpath)

app.app.post('/upload/video', (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    const file = req.files.file;

    file.mv(`${newpath}/videos/${file.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        return res.send({name: file.name, path: `/${file.name}`});
    });
})

app.app.post('/upload/miniature', (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    
    const file = req.files.file;

    //  mv() method places the file inside public directory
    file.mv(`${newpath}/miniature/${file.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: file.name, path: `/${file.name}`});
    });
})

app.app.post('/upload/data', (req, res) => {
    db.db.query("INSERT INTO videos (publisher_id, title, description, tags, video_path, miniature_path) VALUES (?, ?, ?, ?, ?, ?)", 
    [req.body.publisher_id, req.body.title, req.body.description, req.body.tags, "/videos/"+req.body.video_path, "/miniature/"+req.body.miniature_path],(error) => {
            if (error) {
                res.status(500).json({ message: "Failed to create" })
            }
            else {
                res.status(200).json({message: "Video created",})
            }
       });
});