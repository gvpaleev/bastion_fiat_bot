const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
let levelup = require('levelup');
let leveldown = require('leveldown');
require('dotenv').config();

let User = require('./class/User');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.context.db = levelup(leveldown(`./db`));



bot.start( async (ctx) => {
    new User (ctx);
    ctx.reply('Welcome')
});
bot.command('profile', async (ctx)=>{
    ctx.reply("👤 Мой профиль");

});
bot.help( async(ctx) => {
    // let user = new User (ctx);
    ctx.reply("await user.getData())");
    // user.getData()
});
bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));