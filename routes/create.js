var express = require('express');
var router = express.Router();
const {Client} = require('pg');
const pgConnInfo = require('../lib/config').pgConnInfo;
const client = new Client(pgConnInfo);
client.connect();

router.post('/create', async function(req, res, next) {
    try {
        let name = req.body.name;
        let surname = req.body.surname;
        let email = req.body.email;
        let city = req.body.city;
        let zip = req.body.zip;
        let prodTitle = req.body.prodTitle;
        let prodDesc = req.body.prodDesc;
        let price = req.body.price;
        let result = await client.query(`INSERT INTO products (name, surname, email, city, zip, prod_title, prod_desc, price)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,[name, surname, email, city, zip, prodTitle, prodDesc, price]);
        if(result.rowCount > 0){
            res.send("Το προϊόν καταχωρήθηκε επιτυχώς.");
        } else {
            res.send("Η εγγραφή απέτυχε.");
        }
    }catch (e) {console.log(e);}
});

module.exports = router;
