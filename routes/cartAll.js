var express = require('express');
var router = express.Router();
const {Client} = require('pg');
const pgConnInfo = require('../lib/config').pgConnInfo;
const client = new Client(pgConnInfo);
client.connect();

router.get('/cartAll', async function(req, res, next) {
    try{
        let arrayCartAll = [];
        let cartAll = await client.query(`SELECT prod_title, prod_desc, price FROM products WHERE id = any(SELECT id from cart)`,[]);
        if(cartAll.rowCount > 0){
            for (let el of cartAll.rows){
                arrayCartAll.push(el)
            }
            res.send(arrayCartAll);
        } else {
            res.send([]);
        }
    } catch (e) {
        console.log(e);
    }});

module.exports = router;