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
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, function (err, hash) {
                        console.log(hash);
                        db.db.query(
                            'SELECT `id` FROM `users` WHERE email=? and password=?',
                            [email, hash],
                        
                            function(err, results, fields) {
                                res.json({id: results, valide: "true"})
                            }
                        );
                    })
                })
            }
        }
    )
});