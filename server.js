const Telegraf = require('telegraf');
const { Markup } = Telegraf;
console.log(Markup);
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

function begin(ctx) {
    const inlineMessageKeyboard = Markup.inlineKeyboard([
        {text: 'بله👍', callback_data: 'main-function'},
        {text: 'خیر👎', callback_data: 'low'}
    ]).extra();
    ctx.telegram.sendMessage(ctx.from.id, "آیا کار مورد نظر جزء عملکردهای اصلی شرکت است؟",inlineMessageKeyboard);
}
function askForCoupling(ctx) {
    const inlineMessageKeyboard = Markup.inlineKeyboard([
        {text: 'بله👍', callback_data: 'has-coupling'},
        {text: 'خیر👎', callback_data: 'medium'}
    ]).extra();
    ctx.telegram.sendMessage(ctx.from.id, "آیا برروی موارد دیگر تاثیر میگذارد؟", inlineMessageKeyboard);
}

function askForDeadline(ctx) {
    const inlineMessageKeyboard = Markup.inlineKeyboard([
        {text: 'بله👍', callback_data: 'affects-deadline'},
        {text: 'خیر👎', callback_data: 'high'}
    ]).extra();
    ctx.telegram.sendMessage(ctx.from.id, "آیا  باعث نرسیدن به مهلت سررسید می شود؟", inlineMessageKeyboard);
}

function askForSeverFault(ctx) {
    const inlineMessageKeyboard = Markup.inlineKeyboard([
        {text: 'بله👍', callback_data: 'blocker'},
        {text: 'خیر👎', callback_data: 'high'}
    ]).extra();
    ctx.telegram.sendMessage(ctx.from.id, "آیا باعث مختل شدن کار کاربر می‌ شود؟", inlineMessageKeyboard);
}
