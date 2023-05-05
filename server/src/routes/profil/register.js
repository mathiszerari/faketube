const app = require('../../utils/app')
const db = require('../../utils/database')
const bcrypt = require("bcrypt");

app.app.get("/register/:pseudo/:email/:password/:prefs", (req, res) => {
    const pseudo = req.params.pseudo;
    const email = req.params.email;
    const password = req.params.password;
    const prefs = req.params.prefs;

    db.db.query(
        'SELECT `email` FROM `users`',
        function (err, results) {

            let emailNotDupli = false
            results.forEach(reslut => {
                if (reslut["email"] === email) return emailNotDupli = true
            })

            if (emailNotDupli) {
                res.json({message: "l'email est déjà inscrit", valide: "false"});
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, function (err, hash) {
                        db.db.query(
                            'INSERT INTO `users`(`pseudo`, `email`, `password`, `created_at`, `prefs`, `profile_photo`, `description`) VALUES (?, ?, ?, ?, ?, ?, ?)',
                            [pseudo, email, hash, new Date(), prefs, null, null],

                            function (err, results, fields) {
                                console.log(err);
                                db.db.query(
                                    'SELECT `id` FROM `users` WHERE email=?',
                                    [email],
                                    function (err, results) {
                                        console.log(results);
                                        res.json({id: results[0]["id"], valide: "true"});
                                    }
                                )
                            }
                        );
                    });
                })
            }
        }
    )
});