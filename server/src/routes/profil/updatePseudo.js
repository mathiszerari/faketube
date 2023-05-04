const app = require('../../utils/app')
const db = require('../../utils/database')

app.app.get("/updatePseudo/:pseudo/:id", (req, res) => {
    let pseudo = req.params.pseudo
    let id = req.params.id

    db.db.query(
        'UPDATE `users` SET pseudo=? WHERE id=?',
        [pseudo, id],

        function (err, result, fields) {
            res.json({newPseudo: pseudo})
        }
    )
})