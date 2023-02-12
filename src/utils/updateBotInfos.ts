import config from "./config.json"
import axios from "axios"
import { writeFile } from "fs";

export default async function updateBotInfos() {

    const { data } = await axios.get("https://discord.com/api/v10/users/@me", {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`
        }
    })

    const newConfig = config

    newConfig.infos.id = data.id
    newConfig.infos.name = data.username
    newConfig.infos.avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`

    writeFile("./src/utils/config.json", JSON.stringify(newConfig, null, 4), (err) => {
        if (err) throw err
    })
}