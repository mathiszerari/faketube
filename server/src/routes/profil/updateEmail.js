const app = require('../../utils/app')
const db = require('../../utils/database')

app.app.get("/updateEmail/:email/:id", (req, res) => {
    let email = req.params.email
    let id = req.params.id

    db.db.query(
        'UPDATE `users` SET email=? WHERE id=?',
        [email, id],

        function (err, result, fields) {
            res.json({newEmail: email})
        }
    )
})