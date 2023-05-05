let DataBaseUser = require('./DataBaseUser');

module.exports = class User {
    constructor(ctx) {
        this.ctx=ctx;
        this.db = new DataBaseUser(ctx)
    }
 

   
 }