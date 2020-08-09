var express = require('express');
var router = express.Router();
const {Client} = require('pg');
const pgConnInfo = require('../lib/config').pgConnInfo;
const client = new Client(pgConnInfo);
client.connect();

router.put('/edit', async function(req, res, next) {
    try {
        let id = req.query.id;
        let name = req.body.name;
        let surname = req.body.surname;
        let email = req.body.email;
        let city = req.body.city;
        let zip = req.body.zip;
        let prodTitle = req.body.prodTitle;
        let prodDesc = req.body.prodDesc;
        let price = req.body.price;
        let result = await client.query(`UPDATE products SET name = $1, surname = $2, email = $3, city = $4, zip = $5, prod_title = $6, prod_desc = $7, price = $8 WHERE id = $9`,[name, surname, email, city, zip, prodTitle, prodDesc, price, id]);
        if(result.rowCount > 0){
            res.send("Το προϊόν τροποποιήθηκε επιτυχώς.");
        } else {
            res.send("Η τροποποίηση απέτυχε.");
        }
    }catch (e) {console.log(e);}
});

module.exports = router;