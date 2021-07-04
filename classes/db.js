const mysql = require('mysql');

module.exports = class db {
    constructor(config) {
        this.config = config;
         this.con = mysql.createConnection({
            host: "localhost",
            user: this.config.db.user,
            password: this.config.db.pass,
             database: this.config.db.database
        });

        this.con.connect(function(err) {
            if (err) throw err;
        });
    }

    getdb() {
        return this.con;
    }
};