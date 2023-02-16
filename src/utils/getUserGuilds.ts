import {GetServerSidePropsContext} from "next";
import {Guild} from "@/utils/types";
import axios from "axios";
// @ts-ignore
import {parse} from "cookie";

// @ts-ignore
export default async function getUserGuilds(ctx: GetServerSidePropsContext): { data: Guild[]  } | null {
    if (!ctx.req.headers.cookie) return null;

    const token = parse(ctx.req.headers.cookie)[`userToken`]

    if (!token) return null;

    try {
        const {data} = await axios.get("https://discord.com/api/users/@me/guilds", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!data) return null;
        return {data: data};
    } catch {
        return null;
    }
}