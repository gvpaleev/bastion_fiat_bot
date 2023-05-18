const { Bot, session } =require ("grammy");
const { FileAdapter } =require("@grammyjs/storage-file");

const glMenu = require('./menu/glMenu')
const welcomMenu = require('./menu/welcom')
const contacts = require('./menu/contacts')

const ManagerServices = require('./class/ManagerServices')
const Messages = require('./class/Messages')
require('dotenv').config();


const bot = new Bot(process.env.BOT_TOKEN)
const managerServices = new ManagerServices();
// managerServices.addVpn(+ new Date() + 259200000);
//context
bot.use(async (ctx,next)=>{
  ctx.managerServices = managerServices;
  await next();
})
//session
bot.use(
  session({
    initial: (ctx) => {
      // let proxy = managerServices.addProxy(+ new Date() + 259200000);
      // let vpn = managerServices.addVpn(+ new Date() + 259200000);
      return { 
        dateRegistration:0,
        conf:[],
      }
    },
    storage: new FileAdapter({
      dirName: "sessions"
    })
  })
)

//menu

bot.use(glMenu)
bot.use(welcomMenu)
bot.use(contacts)


bot.command("start", async ctx =>{

    if (ctx.session.dateRegistration){
      ctx.reply(`<b>Hi!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.`,{
        reply_markup: glMenu,
        parse_mode: "HTML" 
      })
    }else{
      ctx.reply(Messages.getWellcomMenu(),{
        reply_markup: welcomMenu,
        parse_mode: "HTML" 
      })
    }
    
  }
)

bot.on(":text", ctx => ctx.session.counter++)

bot.start()


