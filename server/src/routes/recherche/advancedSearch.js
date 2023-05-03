const { request } = require('express');
const app = require('../../utils/app')
const db = require('../../utils/database')

var result;

app.app.get("/getUserById/:filters", (req, res) => {
    // req.params;
    // console.log(req.params)
    let filters = req.params.filters;
    let sql = 'SELECT * FROM `videos` WHERE';
    let allFilters = filters.split('+');
    allFilters.forEach(filter => {
        if(filter == 'last-hour'){
            sql+= ' TIMESTAMPDIFF(HOUR,created_at,NOW())<=1 AND'
        } else if(filter == 'last-day'){
            sql+= ' TIMESTAMPDIFF(DAY,created_at,NOW())<=1 AND'
        } else if(filter == 'this-week'){
            sql+= ' TIMESTAMPDIFF(WEEK,created_at,NOW())<=1 AND'
        } else if(filter == 'this-month'){
            sql+= ' TIMESTAMPDIFF(MONTH,created_at,NOW())<=1 AND'
        } else if(filter == 'this-year'){
            sql+= ' TIMESTAMPDIFF(YEAR,created_at,NOW())<=1 AND'
        }
        sql = sql.slice(0,-3);
    });

    if(allFilters.includes('views')){
        sql += ' ORDER BY views DESC'
    } else if(allFilters.includes('date')){
        sql += ' ORDER BY created_at DESC'
    }

    db.db.query(
        sql,
    
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
    
            result = results
        }   
    );
    res.json({ message: result });
});


