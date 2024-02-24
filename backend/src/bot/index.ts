import { Context, Telegraf } from 'telegraf';
import { ChatUser, Menu, Order, Plate } from '@hackathon/types';

import { ChatUserEntity } from '../entities/chatUser';
import { MenuEntity } from '../entities/menu';
import { OrderEntity } from '../entities/order';

export interface MyContext extends Context {
  chatUser?: ChatUser;
}

const findChatUser = async (chatId: number) => {
  return await ChatUserEntity.findOne<ChatUser>({ chatId });
};
const createChatUser = (chatId: number, name: string) => {
  const newUser = new ChatUserEntity({ chatId, name });

  return newUser.save();
};

const plateToString = (plate: Plate) => {
  return `- ${plate.name}: *${plate.description}* `;
};

const menuToString = (menu: Menu) => {
  return `*${menu.name}:* ${menu.price}€ \n ${menu.plates
    .map(plateToString)
    .join('\n')}`;
};

const menuBtn = (menu: Menu) => {
  return { text: menu.name, callback_data: menu._id };
};

const getOrderId = async (chatId: number) => {
  return await OrderEntity.find<Order>();
};

const configureBot = () => {
  const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN);

  bot.use(async (ctx, next) => {
    const chat = await ctx.getChat();
    let chatUser = await findChatUser(chat.id);
    if (!chatUser) {
      chatUser = await createChatUser(
        chat.id,
        [chat.first_name, chat.last_name].join(' ')
      );
    }
    ctx.chatUser = chatUser;
    return next();
  });

  bot.start(async (ctx) => {
    await ctx.replyWithMarkdown('Welcome to Oído Cocina Bot');
    await ctx.replyWithMarkdown(`Here are some commands you can use: \n
    - /menu Shows the available menus, and lets you pick one to make an order.\n
    - /order Shows you the current status of your order.`);
  });

  bot.command('menu', async (ctx) => {
    const MenuData = await MenuEntity.find();

    ctx.replyWithMarkdown(
      `Here are the available menus: \n${MenuData.map(menuToString).join(
        '\n'
      )}`,
      {
        reply_markup: {
          inline_keyboard: [
            /* Inline buttons. 2 side-by-side */

            MenuData.map(menuBtn)
          ]
        }
      }
    );
  });

  bot.on('callback_query', async (ctx) => {
    const selectedMenu = ctx.callbackQuery.data;
    const chatUserId = ctx.chatUser._id;
    const newOrder = {
      chatUser: chatUserId,
      menu: selectedMenu
    };
    const order = new OrderEntity(newOrder);
    await order.save();
    ctx.replyWithMarkdown(`Your order is on the way! OrderId: ${order._id}`);
  });
  /* bot.command("order", async (ctx) => {await}) */

  return bot;
};

export default configureBot;
