var express = require('express');
var router = express.Router();
const {Client} = require('pg');
const pgConnInfo = require('../lib/config').pgConnInfo;
const client = new Client(pgConnInfo);
client.connect();

router.get('/all', async function(req, res, next) {
    try{
        let arrayAll = [];
        let all = await client.query(`SELECT id, prod_title, prod_desc, price, email, city FROM products`,[]);
        if(all.rowCount > 0){
            for (let el of all.rows){
                arrayAll.push(el);
            }
            res.status(200).send(arrayAll);
        } else {
            res.status(200).send([]);
        }
    } catch (e) {
        res.status(500);
        console.error(e);
    }});

module.exports = router;