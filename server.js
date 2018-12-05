const Telegraf = require('telegraf');
var service = require("./api/services/botService")
console.log(process.env.BOT_TOKEN);
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.on('message', (ctx) => {
    switch (ctx.message) {
        case "low" :
            ctx.reply("low");
            break;
        case "medium" :
            ctx.reply("medium");
            break;
        case "high" :
            ctx.reply("high");
            break;
        case "highest" :
            ctx.reply("highest");
            break;
        case "blocker" :
            ctx.reply("blocker");
            break;
        case "is-main-function" :
            ctx.reply("Medium");
            break;
        case "main-function" :
            service.askForCoupling(ctx);
            break;
        case "has-coupling" :
            service.askForDeadline(ctx);
            break;
        case "affects-deadline" :
            service.askForSeverFault(ctx);
            break;
        default :
            service.begin(ctx);
    }
});
bot.startPolling();


