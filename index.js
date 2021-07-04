require('./functions/core_run.js')();
const md5 = require('md5');
const express = require('express');
const config = require('./config.json');
const db = require('./classes/db.js');
const wallet = require('./classes/wallet.js');
const util= require('util');
const app = express();
const port = 3001;

app.get('/api/about', (req, res) => {
    res.send(config.db);
})
app.get('/api/wallet/new', (req, res) => {
    wlt = new wallet(config);
    res.send(wlt.newWallet())
})

app.listen(port, () => {
    console.log(`Starting hudron network on : http://localhost:${port} \n`);
    console.log(`last XcaXI for economic ... \n`);

    //show startup data
    startup();
})

setInterval(core_run, 1500);

