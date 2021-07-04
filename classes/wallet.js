var EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const crypto = require('crypto')
const secp = require('noble-secp256k1')
const db = require('./db.js');
module.exports = class wallet {
    constructor(config) {
        this.config = config;
    }

    newWallet(){
        var exist = false;
        do{
            var wallet = new function (){
                this.privateKey = crypto.randomBytes(32).toString('hex');
                this.publicKey = secp.getPublicKey(this.privateKey);
            }
            exist = this.existInBlockchain(wallet.publicKey);
        } while (exist)

        return wallet;
    }

    existInBlockchain(publicKey){
        let db_obj = new db(this.config);
        let dbs = db_obj.getdb();

        dbs.query('select * from wallets where publicKey = ?',[publicKey], function(err, rows, fields) {
            rows.forEach(function(row) {
                return true;
            });
        });

        return false;

    }
    getNewWallet(){
        (async () => {
            // You pass either a hex string, or Uint8Array
            const privateKey = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
            var msg = "salam";
            var hash =  crypto.createHash("sha256").update(msg, "utf8").digest("hex");
            console.log(hash)
            const messageHash = hash;
            const publicKey = secp.getPublicKey(privateKey);
            const signature = await secp.sign(messageHash, privateKey);
            console.log(signature)
            const isSigned = secp.verify(signature, messageHash, publicKey);
            //console.log(privateKey)
            // Supports Schnorr signatures
            const rpub = secp.schnorr.getPublicKey(privateKey);
            const rsignature = await secp.schnorr.sign(messageHash, privateKey);
            const risSigned = await secp.schnorr.verify(rsignature, messageHash, rpub);
        })();
    }

};