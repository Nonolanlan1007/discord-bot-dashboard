import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
// @ts-ignore
import {parse} from "cookie";
import {parseUser} from "@/utils/parseUser";
import {parseUserGuilds} from "@/utils/parseUserGuilds";

export default async function getGuilds (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).json({error: "Method not allowed"});

    console.log(typeof req.headers.cookie)

    let host = req.headers.host
    if (!host) return res.status(400).json({error: "Bad request"});
    if (host.startsWith("http://")) host = host.replace("http://", "")
    if (host.startsWith("https://")) host = host.replace("https://", "")

    if (req.headers.host !== host) return res.status(403).json({error: "Forbidden"});

    const { id } = req.query

    const token = parse(req.headers.cookie)[`${process.env.COOKIENAME}`];

    const botGuilds = await axios.get(`https://discord.com/api/v10/users/@me/guilds`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`
        }
    })

    const userGuilds = await parseUserGuilds(req.headers.cookie)

    let commonGuilds = botGuilds.data.filter((guild: any) => userGuilds.data.find((userGuild: any) => userGuild.id === guild.id))
    const uncommonGuilds = userGuilds.data.filter((guild: any) => !botGuilds.data.find((userGuild: any) => userGuild.id === guild.id))

    res.status(200).json({commonGuilds: commonGuilds, uncommonGuilds: uncommonGuilds})
}