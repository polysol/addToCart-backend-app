var express = require('express');
var router = express.Router();
const {Client} = require('pg');
const pgConnInfo = require('../lib/config').pgConnInfo;
const client = new Client(pgConnInfo);
client.connect();

router.post('/add', async function(req, res, next) {
    try {
        let id = req.query.id;
        let result = await client.query(`INSERT INTO cart (id) VALUES ($1)`,[id]);
        if(result.rowCount > 0){
            res.send("Το προϊόν προστέθηκε στο καλάθι επιτυχώς.");
        } else {
            res.send("Η προσθήκη στο καλάθι απέτυχε.");
        }
    }catch (e) {console.log(e);}
});
module.exports = router;
