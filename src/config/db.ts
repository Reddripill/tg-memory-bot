import pg from "pg";
import "dotenv/config";

export const dbClient = new pg.Client({
   user: process.env.POSTGRES_USER, // ваш пользователь PostgreSQL
   host: process.env.POSTGRES_HOST, // хост сервера
   database: process.env.POSTGRES_DB, // название базы данных
   password: process.env.POSTGRES_PASSWORD, // пароль пользователя
   port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432, // порт PostgreSQL
});
