var express = require('express');
var router = express.Router();
const {Client} = require('pg');
const pgConnInfo = require('../lib/config').pgConnInfo;
const client = new Client(pgConnInfo);
client.connect();

router.delete('/remove', async function(req, res, next) {
    try{
        let id = req.query.id;
        let remove = await client.query(`DELETE FROM cart WHERE id = $1`,[id]);
        if(remove.rowCount > 0){
            res.send("Το προϊόν αφαιρέθηκε από το καλάθι αγορών.");
        } else {
            res.send("Το προϊόν δε βρέθηκε στο καλάθι αγορών.");
        }
    } catch (e) {
        console.log(e);
    }
    
});

module.exports = router;