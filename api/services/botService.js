const Telegraf = require("telegraf/markup");
const { Markup } = Telegraf;

module.exports = {
    begin: function (ctx) {
        const inlineMessageKeyboard = Markup.inlineKeyboard([
            {text: 'بله👍', callback_data: 'main-function'},
            {text: 'خیر👎', callback_data: 'low'}
        ]).extra();
        ctx.telegram.sendMessage(ctx.from.id, "آیا کار مورد نظر جزء عملکردهای اصلی شرکت است؟",inlineMessageKeyboard);
    },
    askForCoupling: function (ctx) {
        const inlineMessageKeyboard = Markup.inlineKeyboard([
            {text: 'بله👍', callback_data: 'has-coupling'},
            {text: 'خیر👎', callback_data: 'medium'}
        ]).extra();
        ctx.telegram.sendMessage(ctx.from.id, "آیا برروی موارد دیگر تاثیر میگذارد؟", inlineMessageKeyboard);
    },

    askForDeadline: function (ctx) {
        const inlineMessageKeyboard = Markup.inlineKeyboard([
            {text: 'بله👍', callback_data: 'affects-deadline'},
            {text: 'خیر👎', callback_data: 'high'}
        ]).extra();
        ctx.telegram.sendMessage(ctx.from.id, "آیا  باعث نرسیدن به مهلت سررسید می شود؟", inlineMessageKeyboard);
    },

    askForSeverFault: function (ctx) {
        const inlineMessageKeyboard = Markup.inlineKeyboard([
            {text: 'بله👍', callback_data: 'blocker'},
            {text: 'خیر👎', callback_data: 'high'}
        ]).extra();
        ctx.telegram.sendMessage(ctx.from.id, "آیا باعث مختل شدن کار کاربر می‌ شود؟", inlineMessageKeyboard);
    }
};