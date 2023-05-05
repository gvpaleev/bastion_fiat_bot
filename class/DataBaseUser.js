
const dataReg = 'datereg';



module.exports = class DataBaseUser {
    constructor(ctx) {
        let {id} = ctx.from;
        this.ctx=ctx;
        this.ctx.db.get(id+dataReg)
        .catch(async err=>{
            if (err.notFound){
                this.ctx.db.put(id+dataReg,+new Date());
            }
            
        })
    }
    

 }