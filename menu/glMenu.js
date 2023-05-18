const { Menu,MenuRange } =require("@grammyjs/menu");
const Messages = require('../class/Messages')
const contacts = require('./contacts')


const glMenu = new Menu("root-menu")
.text(
async ctx =>{
  return `Мои сервисы: ${ await ctx.session.conf.length}`
},
(ctx) => {
  if(ctx.session.conf.length){
    ctx.menu.nav('myServices')
  }else{
    ctx.reply("Hi!")
  }
}
).row()
.submenu("Купить новый", "newBuy").row()
.text('Контакты',
(ctx)=>{
  ctx.deleteMessage();
  ctx.reply("Messages.getGlMenu()",{
      reply_markup: contacts,
      parse_mode: "HTML" 
  })
});

const settings = new Menu("credits-menu")
.text("Show Credits", (ctx) => ctx.reply("Powered by grammY"))
.back("Go Back");

const myServices = new Menu("myServices")
.text(
  ctx =>`Мои Proxy: ${ctx.session.conf.filter(item=> item.service == 'proxy').length}`,
  async (ctx) => {
    let proxyAll = ctx.session.conf.filter(item=> item.service == 'proxy');
    let msg = '';
    proxyAll.map(item=>{
      msg+=JSON.stringify(item)

    })
    ctx.reply(msg)
  }
).row()
.text(
  ctx =>`Мои Vpn: ${ctx.session.conf.filter(item=> item.service == 'vpn').length}`,
  async (ctx) => {
    let proxyAll = ctx.session.conf.filter(item=> item.service == 'vpn');
    let msg = '';
    proxyAll.map(item=>{
      msg+=JSON.stringify(item)

    })
    ctx.reply(msg)
  }
).row()
.back("Go Back");
const newBuy = new Menu("newBuy")
.submenu("Proxy",'pricesProxy').row()
.submenu("Vpn",'pricesVpn').row()
.back("Go Back");

const pricesProxy = new Menu("pricesProxy")
.text(
  '3 дня - 60 рублей.',
  async (ctx)=>{}
).row()
.text(
  '7 денй - 110 рублей.',
  async (ctx)=>{}
).row()
.text(
  '30 дней - 320 рублей.',
  async (ctx)=>{}
).row()
.text(
  '90 дней - 880 рублей.',
  async (ctx)=>{}
).row()
.back("Go Back");

const pricesVpn = new Menu("pricesVpn")
.text(
  '3 дня - 80 рублей.',
  async (ctx)=>{}
).row()
.text(
  '7 денй - 140 рублей.',
  async (ctx)=>{}
).row()
.text(
  '30 дней - 420 рублей.',
  async (ctx)=>{}
).row()
.text(
  '90 дней - 1100 рублей.',
  async (ctx)=>{}
).row()
.back("Go Back");


glMenu.register(myServices);
glMenu.register(newBuy);
newBuy.register(pricesProxy);
newBuy.register(pricesVpn);


module.exports =  glMenu

