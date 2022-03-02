import { Composer } from "grammy";

import match from "./match";

const composer = new Composer();

composer.command("match", match);

export default composer;
