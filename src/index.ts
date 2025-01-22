import { setupBot } from "./bot.js";
import { dbClient } from "./config/db.js";

(async function () {
   try {
      await dbClient.connect();
      console.log("Подключение к PostgreSQL успешно!");
      await setupBot().launch();
   } catch (error) {
      console.log("BIG ERROR: ", error);
   }
})();
