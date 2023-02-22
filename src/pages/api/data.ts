import {NextApiRequest, NextApiResponse} from "next";
import {DiscordUser, Guild} from "@/utils/types";
import axios from "axios";
import config from "@/utils/config.json";
import tokenDb from "@/models/token";
// @ts-ignore
import {sign, verify} from "jsonwebtoken";
// @ts-ignore
import {parse, serialize} from "cookie";
import dbConnect from "@/utils/mongoConnect";

const scope = ["identify", "guilds"].join(" ");
const REDIRECT_URI = `${process.env.APP_URL}/api/login`

const OAUTH_PARAMS = new URLSearchParams({
    client_id: config.infos.id,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope,
}).toString();

const OAuthURL = `https://discord.com/api/oauth2/authorize?${OAUTH_PARAMS}`;

export default async function Data (req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const url = req.headers.host;

    if (!url || !url.startsWith(process.env.APP_URL!.split("/").reverse()[0] as string)) return res.status(401).json({error: "Not authorized"})

    if (req.method === "POST") {
        const { token } = req.body;

        if (!token) return res.status(400).json({error: "Bad request"})

        const me: DiscordUser | { unauthorized: true } = await axios.get("https://discord.com/api/users/@me", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data).catch(() => {
            return res.redirect(OAuthURL)
        })

        if (!("id" in me)) return res.status(404).json({error: "User not found"})

        const userGuilds = await axios.get("https://discord.com/api/users/@me/guilds", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data).catch(() => {
            return res.status(404).json({error: "User guilds not found"})
        })

        if (!userGuilds) return res.status(404).json({error: "User guilds not found"})

        const botGuilds = await axios.get("https://discord.com/api/users/@me/guilds", {
            headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` }
        }).then(res => res.data).catch(() => {
            return res.redirect(OAuthURL)
        })

        const data = {
            userInfos: me,
            userGuilds: userGuilds,
            botGuilds: botGuilds
        }

        const jwt = sign(data, process.env.JWT_SECRET!, { expiresIn: "24h" });

        const currentData = await tokenDb.findOne({id: me.id});

        if (currentData) {
            currentData.jwt = jwt;
            await currentData.save();

            return res.status(200).json({ success: true, id: me.id })
        }

        if (!currentData) {
            await new tokenDb({
                id: me.id,
                jwt: jwt
            }).save();

            return res.status(200).json({ success: true, id: me.id })
        }
    }

    if (req.method === "GET") {
        if (!req.headers.cookie) return res.status(404).json({error: "Cookie not found"})

        const id = parse(req.headers.cookie)[`id`];

        if (!id) return res.status(404).json({error: "Cookie not found"})

        const data = await tokenDb.findOne({id: id})

        if (!data) return res.status(404).json({error: "JWT not found"})

        const jwt = data.jwt;

        if (!jwt) return res.status(404).json({error: "JWT not found"})

        const jwtData = verify(jwt, process.env.JWT_SECRET!) as {
            userInfos: DiscordUser,
            userGuilds: Guild[],
            botGuilds: Guild[]
        } & { iat: number; exp: number; };

        if (!jwtData) return res.status(404).json({error: "JWT not found"})

        const me = jwtData.userInfos;
        const userGuilds = jwtData.userGuilds;
        const botGuilds = jwtData.botGuilds;

        const dataToSend = {
            userInfos: me,
            userGuilds: userGuilds,
            botGuilds: botGuilds
        }

        return res.status(200).json(dataToSend);
    }
}