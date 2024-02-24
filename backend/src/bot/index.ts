import {Context, Telegraf} from "telegraf";
import {ChatUser} from "@hackathon/types";


export interface MyContext extends Context {
    chatUser?: ChatUser
}

const configureBot =() =>  {
    const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN);

    bot.start(async (ctx) => {
        await ctx.replyWithMarkdown('Welcome to MenuBot');
    });


    return bot;
}


export default configureBot;