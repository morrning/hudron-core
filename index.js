require('./functions/core_run.js')();
const md5 = require('md5');
const express = require('express');
const config = require('./config.json');
const db = require('./classes/db.js');

const app = express();
const port = 3000;

app.get('/api/about', (req, res) => {
    res.send(config.db);
})

app.listen(port, () => {
    console.log(`Starting hudron network on : http://localhost:${port} \n`);
    console.log(`last XcaXI for economic ... \n`);
    let db_obj = new db(config);
    let dbs = db_obj.getdb();
    dbs.query('select * from wallets', function(err, rows, fields) {
        rows.forEach(function(row) {
            console.log(row.publicKey);
        });
    });
})

setInterval(core_run, 1500);

