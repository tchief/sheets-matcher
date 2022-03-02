require("dotenv").config();

import commands from "./commands";
import bot from "./core/bot";
import { development, production } from "./utils/launch";
import { limit } from "@grammyjs/ratelimiter";

bot.use(limit(), commands);

process.env.NODE_ENV === "development" ? development(bot) : production(bot);

export {};
