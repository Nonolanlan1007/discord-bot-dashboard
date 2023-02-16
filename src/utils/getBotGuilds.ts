import {Guild} from "@/utils/types";
import axios from "axios";

// @ts-ignore
export default async function getBotGuilds(): { data: Guild[]  } | null | null {
    try {
        const {data} = await axios.get("https://discord.com/api/v10/users/@me/guilds", {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            }
        });
        if (!data) return null;
        return {data: data};
    } catch (err: any) {
        throw new Error(err);
    }
}