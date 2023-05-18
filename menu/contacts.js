const { Menu,MenuRange } =require("@grammyjs/menu");
const glMenu = require('./glMenu')
const Messages = require('../class/Messages')



const contacts = new Menu("contacts")
.text(
    "Окей",
    (ctx)=>{
        // ctx.editMessageText("It is " + new Date().toLocaleString());
        // ctx.menu.close();
        ctx.deleteMessage();
        ctx.reply(Messages.getGlMenu(),{
            reply_markup: glMenu,
            parse_mode: "HTML" 
        })
        
    }
)
module.exports =  contacts;