const app = require('../utils/app')
const db = require('../utils/database')
const fileUpload = require('express-fileupload');
const path = require("path")

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

app.app.use(fileUpload());

const fs = require('fs')

const removeLastDirPart = dirname => path.parse(dirname).dir
var newpath = removeLastDirPart(__dirname)
newpath = removeLastDirPart(newpath)

app.app.post('/upload/video', (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    const file = req.files.file;
    const filename = file.name.replace(/\s/g, '_');

    file.mv(`${newpath}/videos/${filename}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        return res.send({name: filename, path: `/${filename}`});
    });
})

app.app.post('/upload/thumbnail', (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    
    const file = req.files.file;
    const filename = file.name.replace(/\s/g, '_');

    //  mv() method places the file inside public directory
    file.mv(`${newpath}/thumbnail/${filename}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: filename, path: `/${filename}`});
    });
})

app.app.post('/upload/data', (req, res) => {
    const videopath = req.body.video_path.replace(/\s/g, '_');
    const miniaturepath = req.body.miniature_path.replace(/\s/g, '_');
    db.db.query("INSERT INTO videos (publisher_id, title, description, tags, video_path, miniature_path) VALUES (?, ?, ?, ?, ?, ?)", 
    [req.body.publisher_id, req.body.title, req.body.description, req.body.tags, `/videos/${videopath}`, `/thumbnail/${miniaturepath}`],(error) => {
            if (error) {
                res.status(500).json({ message: "Failed to create", error: error })
            } 
            else {
                res.status(200).json({ message: "Video created" })
            }
       });
});


app.app.post('/thumbnail', (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }

    const file = req.files.file;
    
    const filename = file.name.replace(/\s/g, '_');

    //  mv() method places the file inside public directory
    file.mv(`${__dirname}/${filename}`, function (err) {
        if (err) {
            console.log(err)
        }
    });

    function base64_encode(file) {
        return "data:image/jpeg;base64,"+fs.readFileSync(file, 'base64');
    }
    
    var path_vid = `${__dirname}/${filename}`
    
    ffmpeg(path_vid)
    .screenshots({
        count: 1,
        timemarks: ['0.1'],
        filename: `${filename}.jpg`,
        folder: __dirname
    })
      // The callback that is run when FFmpeg is finished
      .on('end', () => {
        console.log('FFmpeg has finished.');
        var base64str = base64_encode(`${__dirname}/${filename}.jpg`)
        fs.unlinkSync(path_vid)
        fs.unlinkSync(`${__dirname}/${filename}.jpg`)
        return res.status(200).json({ image: base64str })
      })
    
      // The callback that is run when FFmpeg encountered an error
      .on('error', (error) => {
        console.error(error)
        return res.status(500).send({ error: error })
      })
});