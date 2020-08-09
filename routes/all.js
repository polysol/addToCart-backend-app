var express = require('express');
var router = express.Router();
const {Client} = require('pg');
const pgConnInfo = require('../lib/config').pgConnInfo;
const client = new Client(pgConnInfo);
client.connect();

/* GET home page. */
router.get('/all', async function(req, res, next) {
    try{
        let arrayAll = [];
        let all = await client.query(`SELECT id, email, city, price, prod_title, prod_desc FROM products`,[]);
        if(all.rowCount > 0){
            for (let el of all.rows){
                arrayAll.push(el)
            }
            res.send(arrayAll);
        } else {
            res.send([]);
        }
    } catch (e) {
        console.log(e);
    }});

module.exports = router;