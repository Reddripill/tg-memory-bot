import { Context } from "telegraf";
import { mainKeyboard } from "../utils/buttons.js";
import { ISceneContext } from "../types/bot.types.js";
import { SCENES_TEXT } from "../config/constants.js";

export const start = (ctx: Context) => ctx.reply("HI", mainKeyboard);
export const help = (ctx: Context) => ctx.reply("Help Command");

export const startLangScene = (ctx: ISceneContext) => {
   return ctx.scene.enter(SCENES_TEXT.lang);
};
