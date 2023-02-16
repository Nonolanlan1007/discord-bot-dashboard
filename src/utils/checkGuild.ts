import {Guild} from "@/utils/types";

export default function checkGuild(botGuilds: Guild[] | null, userGuilds: Guild[] | null): { guildsWithBot: Guild[], guildsWithoutBot: Guild[] } {
    let serversWithBot: Guild[] = []

    if (userGuilds && botGuilds) serversWithBot = userGuilds.filter((guild: Guild) => botGuilds!.find((botGuild: Guild) => botGuild.id === guild.id) && (guild.permissions & 0x0000000000000008) == 8)

    let serversWithoutBot: Guild[] = []

    if (userGuilds && botGuilds) serversWithoutBot = userGuilds.filter((guild: Guild) => !botGuilds!.find((botGuild: Guild) => botGuild.id === guild.id) && (guild.permissions & 0x0000000000000008) == 8)

    return { guildsWithBot: serversWithBot, guildsWithoutBot: serversWithoutBot }
}