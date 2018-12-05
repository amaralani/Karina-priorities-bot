const express = require('express')
const app = express();
const port = process.env.PORT;

const Telegraf = require('telegraf');
const { Markup } = Telegraf;
console.log(Markup);
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply("لطفا جهت شروع مجدد عبارت \"new\" یا \"جدید\" را وارد کنید."));
bot.on('callback_query', (ctx) => {react(ctx,ctx.callbackQuery.data);ctx.answerCbQuery().then()});

bot.on('message', (ctx) => {
    if(ctx.message.text.toLocaleLowerCase() === "new" || ctx.message.text ==="جدید"){
        begin(ctx);
    }else {
        ctx.reply("لطفا جهت شروع مجدد عبارت \"new\" یا \"جدید\" را وارد کنید.")
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
    ctx.reply("آیا کار مورد نظر جزء عملکردهای اصلی شرکت است؟",inlineMessageKeyboard);
}
function askForCoupling(ctx) {
    const inlineMessageKeyboard = Markup.inlineKeyboard([
        {text: 'بله', callback_data: 'has-coupling'},
        {text: 'خیر', callback_data: 'medium'}
    ]).extra();
    ctx.reply("آیا برروی موارد دیگر تاثیر میگذارد؟", inlineMessageKeyboard);
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
        {text: 'خیر', callback_data: 'highest'}
    ]).extra();
    ctx.telegram.sendMessage(ctx.from.id, "آیا باعث مختل شدن کار کاربر می‌ شود؟", inlineMessageKeyboard);
}

function react(ctx, message){
    switch (message) {
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
}
