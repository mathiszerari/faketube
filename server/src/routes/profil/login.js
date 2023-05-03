const app = require('../../utils/app')
const db = require('../../utils/database')
const bcrypt = require("bcrypt")

app.app.get("/login/:email/:password", (req, res) => {
    const email = req.params.email;
    const password = req.params.password;

    db.db.query(
        'SELECT `email` FROM `users`',
        function (err, results) {

            let emailNotExist = true
            results.forEach(reslut => {
                if (reslut["email"] === email) return emailNotExist = false
            })

            if (emailNotExist) {
                res.json({message: "l'email n'existe pas", valide: "false"});
            } else {
                db.db.query(
                    'SELECT * FROM `users` WHERE email=?',
                    [email],

                    function (err, result, fields) {
                        bcrypt.compare(password, result[0].password, function (err, resu) {
                            if (resu === true) {
                                res.json({id: result[0].id, valide: "true"})
                            } else {
                                res.json({message: "mauvais mot de passe ou email", valide: "false"})
                            }
                        })
                    }
                )
            }
        }
    )
});