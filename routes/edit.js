var express = require('express');
var router = express.Router();
const {Client} = require('pg');
const pgConnInfo = require('../lib/config').pgConnInfo;
const client = new Client(pgConnInfo);
client.connect();

router.put('/edit', async function(req, res, next) {
    try {
        let id = req.query.id;
        let email = req.body.email;
        let city = req.body.city;
        let prodTitle = req.body.prodTitle;
        let prodDesc = req.body.prodDesc;
        let price = req.body.price;
        let result = await client.query(`UPDATE products SET email = $1, city = $2, prod_title = $3, prod_desc = $4, price = $5 WHERE id = $6`,[email, city, prodTitle, prodDesc, price, id]);
        if(result.rowCount > 0){
            res.send("Το προϊόν τροποποιήθηκε επιτυχώς.");
        } else {
            res.send("Η τροποποίηση απέτυχε.");
        }
    }catch (e) {console.log(e);}
});

module.exports = router;