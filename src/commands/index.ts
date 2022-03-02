import { Composer } from "grammy";

import match from "./match";

const composer = new Composer();

composer.command("match", (ctx) => match(ctx));
composer.command("rewrite", (ctx) => match(ctx, true));

export default composer;
