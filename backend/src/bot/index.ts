import { Context, Telegraf } from 'telegraf';
import { ChatUser, Menu, Plate } from '@hackathon/types';

import { MenuEntity } from '../entities/menu';

export interface MyContext extends Context {
  chatUser?: ChatUser;
}

const plateToString = (plate: Plate) => {
  return `${plate.name}: *${plate.description}* `;
};

const menuToString = (menu: Menu) => {
  return `*${menu.name}:* ${menu.price}€ \n - ${menu.plates
    .map(plateToString)
    .join('\n')}`;
};

const configureBot = () => {
  const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN);

  bot.start(async (ctx) => {
    await ctx.replyWithMarkdown('Welcome to Oido Cocina Bot');
  });

  bot.command('menu', async (ctx) => {
    const MenuData = await MenuEntity.find();

    ctx.replyWithMarkdown(
      `Here are the available menus: \n${MenuData.map(menuToString).join('\n')}`
    );
  });

  return bot;
};

export default configureBot;
