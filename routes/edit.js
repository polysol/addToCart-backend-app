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
        let zip = req.body.zip;
        let name = req.body.name;
        let surname = req.body.surname;
        let result = await client.query(`UPDATE products SET email = $1, city = $2, prod_title = $3, prod_desc = $4, price = $5, zip = $6, name = $7, surname = $8 WHERE id = $9`,[email, city, prodTitle, prodDesc, price, zip, name, surname, id]);
        if(result.rowCount > 0){
            res.status(200).send(result);
        } else {
            res.status(200).send("Η τροποποίηση απέτυχε.");
        }
    } catch (e) {
        res.status(500);
        console.error(e);
    }
});

module.exports = router;