const express = require('express')
const app = express();
const port = 8088;

const Telegraf = require('telegraf');
const { Markup } = Telegraf;
console.log(Markup);
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.action("low",(ctx, next) =>{
    ctx.reply("low");
    return next(ctx).then();
});
bot.action("medium",(ctx, next) =>{
    ctx.reply("medium");
    return next(ctx).then();
});
bot.action("high",(ctx, next) =>{
    ctx.reply("high");
    return next(ctx).then();
});

bot.action("highest",(ctx, next) =>{
    ctx.reply("highest");
    return next(ctx).then();
});
bot.action("blocker",(ctx, next) =>{
    ctx.reply("blocker");
    return next(ctx).then();
});
bot.action("is-main-function",(ctx, next) =>{
    ctx.reply("Medium");
    return next(ctx).then();
});
bot.action("main-function",(ctx, next) =>{
    askForCoupling(ctx);
    return next(ctx).then();
});
bot.action("has-coupling",(ctx, next) =>{
    askForDeadline(ctx);
    return next(ctx).then();
});
bot.action("affects-deadline",(ctx, next) =>{
    askForSeverFault(ctx);
    return next(ctx).then();
});

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
            askForCoupling(ctx);
            break;
        case "has-coupling" :
            askForDeadline(ctx);
            break;
        case "affects-deadline" :
            askForSeverFault(ctx);
            break;
        default :
            begin(ctx);
    }
});
bot.startPolling();

app.listen(port, () => console.log(`app listening on port ${port}!`))

function begin(ctx) {
    const inlineMessageKeyboard = Markup.inlineKeyboard([
        Markup.callbackButton('بله','main-function'),
        Markup.callbackButton('خیر','low')
        // {text: 'بله', callback_data: 'main-function'},
        // {text: , callback_data: 'low'}
    ]).extra();
    ctx.telegram.sendMessage(ctx.from.id, "آیا کار مورد نظر جزء عملکردهای اصلی شرکت است؟",inlineMessageKeyboard);
}
function askForCoupling(ctx) {
    const inlineMessageKeyboard = Markup.inlineKeyboard([
        {text: 'بله', callback_data: 'has-coupling'},
        {text: 'خیر', callback_data: 'medium'}
    ]).extra();
    ctx.telegram.sendMessage(ctx.from.id, "آیا برروی موارد دیگر تاثیر میگذارد؟", inlineMessageKeyboard);
}

function askForDeadline(ctx) {
    const inlineMessageKeyboard = Markup.inlineKeyboard([
        {text: 'بله', callback_data: 'affects-deadline'},
        {text: 'خیر', callback_data: 'high'}
    ]).extra();
    ctx.telegram.sendMessage(ctx.from.id, "آیا  باعث نرسیدن به مهلت سررسید می شود؟", inlineMessageKeyboard);
}

function askForSeverFault(ctx) {
    const inlineMessageKeyboard = Markup.inlineKeyboard([
        {text: 'بله', callback_data: 'blocker'},
        {text: 'خیر', callback_data: 'high'}
    ]).extra();
    ctx.telegram.sendMessage(ctx.from.id, "آیا باعث مختل شدن کار کاربر می‌ شود؟", inlineMessageKeyboard);
}
