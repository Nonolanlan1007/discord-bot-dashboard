import axios from 'axios';
import {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(405).json({message: 'Method not allowed'});
        return;
    }

    const data = await axios.get("https://discord.com/api/v10/users/@me/guilds", {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`
        }
    }).catch(() => {
        return {
            data: []
        }
    })

    const serverCount = data.data.length.toLocaleString("fr-FR");

    res.status(200).json({ servers: serverCount });
}