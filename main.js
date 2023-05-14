const { Bot, session } =require ("grammy");
const { FileAdapter } =require("@grammyjs/storage-file");
const glMenu = require('./menu/glMenu')
const welcomMenu = require('./menu/welcom')
const ManagerServices = require('./class/ManagerServices')
require('dotenv').config();


const bot = new Bot(process.env.BOT_TOKEN)
const managerServices = new ManagerServices();
managerServices.addVpn(+ new Date() + 259200000);
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

bot.command("start", async ctx =>{

    if (ctx.session.dateRegistration){
      ctx.reply(`Welcom1`,{
        reply_markup: welcomMenu,
      })
    }else{
      ctx.session.dateRegistration=+new Date();
      let proxy = await managerServices.addProxy(+ new Date() + 259200000);
      let vpn = await managerServices.addVpn(+ new Date() + 259200000);
      ctx.session.conf.push(proxy);
      ctx.session.conf.push(vpn);
      ctx.reply(`Welcom2`,{
        reply_markup: welcomMenu,
      })
    }
    
  }
)

bot.on(":text", ctx => ctx.session.counter++)

bot.start()


