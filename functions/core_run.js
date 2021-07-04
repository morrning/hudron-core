const db = require("../classes/db.js");
const config = require('../config.json');

module.exports = function() {
    //this function show startup blockchain data in console
    this.startup = function() {
        //show blockchain info
        console.log('---------- Current Blockchain data ----------');
        let db_obj = new db(config);
        let dbs = db_obj.getdb();

        dbs.query('select * from blocks', function(err, rows, fields) {
            console.log('blockchain height:' + rows.length)
        });
    };
    //this function check for new events for each 1.5 s
    this.core_run = function() {

    };
    
}