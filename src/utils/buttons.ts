import { Markup } from "telegraf";
import { CMD_TEXT, LANG_TEXT } from "../config/constants.js";

export const mainKeyboard = Markup.keyboard([
   [CMD_TEXT.newwords],
   [CMD_TEXT.oldwords],
   [CMD_TEXT.add],
]).resize();

export const langKeyboard = Markup.keyboard([
   [LANG_TEXT.ru],
   [LANG_TEXT.en],
]).resize();

export const emptyKeyboard = Markup.removeKeyboard();
