import { Scenes, session, Telegraf } from "telegraf";
import { help, start, startLangScene } from "./controllers/command.js";
import { CMD_TEXT } from "./config/constants.js";
import { langScene } from "./controllers/scene.js";
import { ISceneContext } from "./types/bot.types.js";
import "dotenv/config";

const bot = new Telegraf<Scenes.SceneContext>(process.env.BOT_TOKEN as string);

const stage = new Scenes.Stage<ISceneContext>([langScene]);

export const setupBot = () => {
   bot.use(session());
   bot.use(stage.middleware());
   bot.use((ctx, next) => {
      console.log(ctx);
      return next();
   });

   bot.start(start);
   bot.help(help);
   bot.hears(CMD_TEXT.add, startLangScene);

   bot.hears(CMD_TEXT.newwords, (ctx) =>
      ctx.reply("Пройти тест по новым словам")
   );
   return bot;
};
