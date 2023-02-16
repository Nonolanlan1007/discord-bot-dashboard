import {useEffect} from "react";
import {DiscordUser, Guild} from "@/utils/types";
import {parseUser} from "@/utils/parseUser";
import axios from "axios";
import Head from "next/head";
import getUserGuilds from "@/utils/getUserGuilds";
import getBotGuilds from "@/utils/getBotGuilds";
import checkGuild from "@/utils/checkGuild";
import config from "@/utils/config.json";

export default function Dash (props: { user: DiscordUser | null, servers: number, botGuilds: Guild[] | null, userGuilds: Guild[] | null, guildId: string }) {

    useEffect(() => {
        if (!props.user) window.location.href = `/login`
        else {
            const res = checkGuild(props.botGuilds, props.userGuilds)


            if (res.guildsWithBot.find(x => x.id === props.guildId)) window.location.href = `/dash/${props.guildId}/modules`
            else if (res.guildsWithoutBot.find(x => x.id === props.guildId)) window.open(`https://discord.com/api/oauth2/authorize?client_id=${config.infos.id}&guild_id=${res.guildsWithoutBot.find(x => x.id === props.guildId)!.id}&permissions=-1&scope=bot`)
            //else window.location.href = `/dash/`
        }
    },[])

    let style = {
        "text-align": "center",
        "font-size": "200px",
        "margin": "25px"
    }

    let style2 = {
        "text-align": "center",
        "font-size": "100px",
        "margin": "25px"
    }

    return (
        <>
            <Head>
                <title>
                    Dashboard - Redirection en cours...
                </title>
            </Head>
            <h1 style={style}>Dashboard</h1>
            <h2 style={style2}>
                Redirection en cours...
            </h2>
        </>
    )
}

export const getServerSideProps: (ctx: any) => Promise<{ props: { servers: string; user: DiscordUser | null } }> = async (ctx) => {
    const user = parseUser(ctx)

    const stats = await axios.get(`${process.env.APP_URL}/api/stats`).then(res => res.data);

    const userGuilds = await getUserGuilds(ctx)

    const botGuilds = await getBotGuilds()

    console.log(botGuilds)
    console.log(userGuilds)
    console.log(checkGuild(botGuilds ? botGuilds.data : null, userGuilds ? userGuilds.data : null))

    return { props: { user: user, servers: stats.servers!, botGuilds: botGuilds ? botGuilds.data : null, userGuilds: userGuilds ? userGuilds.data : null, guildId: ctx.query.id } };
}