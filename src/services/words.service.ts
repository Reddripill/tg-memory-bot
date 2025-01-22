import { dbClient } from "../config/db.js";
import { IWordEntry } from "../types/bot.types.js";

type AddWordParametersType = Pick<
   IWordEntry,
   "user_id" | "word_pairs" | "from_lang" | "to_lang"
>;

export const addWords = async ({
   user_id,
   word_pairs,
   from_lang,
   to_lang,
}: AddWordParametersType) => {
   const query = `
      INSERT INTO words (user_id, word_pairs, from_lang, to_lang)
      VALUES ($1, $2, $3, $4);
    `;
   const values = [user_id, word_pairs, from_lang, to_lang];
   try {
      const result = await dbClient.query(query, values);
   } catch (error) {
      console.error("Error executing query", error);
      throw error;
   }
};
