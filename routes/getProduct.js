var express = require('express');
var router = express.Router();
const {Client} = require('pg');
const pgConnInfo = require('../lib/config').pgConnInfo;
const client = new Client(pgConnInfo);
client.connect();

router.get('/getProduct', async function(req, res, next) {
    try{
        let id = req.query.id;
        let product = await client.query(`SELECT * FROM products where id = $1`,[id]);
        res.status(200).send(product.rows[0]);
    } catch (e) {
        res.status(500);
        console.error(e);
    }});

module.exports = router;