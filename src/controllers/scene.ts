import { Scenes } from "telegraf";
import { SCENES_TEXT } from "../config/constants.js";
import { ISceneContext } from "../types/bot.types.js";
import { emptyKeyboard, langKeyboard, mainKeyboard } from "../utils/buttons.js";
import { addWords } from "../services/words.service.js";
import { transformWordPairs } from "../utils/transformWordPairs.js";

export const langScene = new Scenes.BaseScene<ISceneContext>(SCENES_TEXT.lang);

langScene.enter(async (ctx) => {
   ctx.scene.session.step = "firstLang";
   ctx.scene.session.mode = { from: "", to: "" };
   return await ctx.reply("Выберите язык, который переводите", langKeyboard);
});

langScene.on("text", async (ctx) => {
   const step = ctx.scene.session.step as string;
   if (ctx.scene.session.mode) {
      if (step === "firstLang") {
         if (ctx.message && "text" in ctx.message) {
            ctx.scene.session.mode.from = ctx.message.text;
            ctx.scene.session.step = "secondLang";
            ctx.reply("Выберите язык на который переводите");
         }
      } else if (step === "secondLang") {
         if (ctx.message && "text" in ctx.message) {
            if (ctx.message.text !== ctx.scene.session.mode.from) {
               ctx.scene.session.mode.to = ctx.message.text;
               ctx.scene.session.step = "words";
               ctx.reply(
                  `Введите слово с его переводом, разделяя "-". Если хотите добавить несколько пар слов, пишите их с новой строки.`,
                  emptyKeyboard
               );
            } else {
               ctx.reply(
                  "Извините, но вы с этого языка переводите. Пожалуйста, выберите другой язык",
                  langKeyboard
               );
            }
         }
      } else if (step === "words") {
         if (ctx.message && "text" in ctx.message) {
            if (ctx.message.text) {
               const userId = ctx.from.id;
               ctx.scene.session.words = ctx.message.text;
               ctx.reply(
                  `Отлично вы добавили новые слова. Так держать!`,
                  mainKeyboard
               );
               await addWords({
                  user_id: userId,
                  word_pairs: transformWordPairs(ctx.scene.session.words),
                  from_lang: ctx.scene.session.mode.from,
                  to_lang: ctx.scene.session.mode.to,
               });
               ctx.scene.leave();
            } else {
               ctx.reply("Извините, но что-то пошло не так");
            }
         }
      }
   }
});
