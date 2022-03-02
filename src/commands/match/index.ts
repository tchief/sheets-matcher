import { Context } from "grammy";
import { getMatches } from "./match";
import { saveMatchesToRequestSheet } from "./sheets";
import { Match, matchesToString } from "./types";

const match = async (ctx: Context, rewrite = false): Promise<void> => {
    const matches: Match[] = await getMatches();
    if (rewrite) await saveMatchesToRequestSheet(matches);
    await ctx.reply(matches.length ? `request: proposals\n\n${matchesToString(matches)}` : "No matches found yet.");
};

export default match;
