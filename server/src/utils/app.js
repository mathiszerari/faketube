const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
<<<<<<< HEAD
    origin: "http://localhost:5174"
=======
    origin: "http://localhost:5173"
>>>>>>> 7c5ed54 (i have to ameliore it)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
    app
}