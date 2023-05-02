const app = require('../../utils/app')
const db = require('../../utils/database')
const bcrypt = require("bcrypt")

app.app.get("/register/:pseudo/:email/:password", (req, res) => {
    const pseudo = req.params.pseudo;
    const email = req.params.email;
    const password = req.params.password;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
            db.db.query(
                'INSERT INTO `users`(`pseudo`, `email`, `password`, `created_at`, `profile_photo`) VALUES (?, ?, ?, ?, ?)',
                [pseudo, email, hash, new Date(), null],

                function (err, results, fields) {
                    console.log(err);
                }
            );
        });
    })
});