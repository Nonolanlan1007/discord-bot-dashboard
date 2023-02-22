import {useEffect} from "react";
import {Data} from "@/utils/types";
import axios from "axios";
import Head from "next/head";
import parseGuilds from "@/utils/parseGuilds";
import config from "@/utils/config.json";

export default function Dash (props: { data: Data, guildId: string }) {

    useEffect(() => {
        if (!props.data || !props.data.userInfos) window.location.href = `/login?redirect=${encodeURIComponent(window.location.href)}`;
        else {
            const res = parseGuilds(props.data.botGuilds, props.data.userGuilds)


            if (res.guildsWithBot.find(x => x.id === props.guildId)) window.location.href = `/dash/${props.guildId}/modules`
            else if (res.guildsWithoutBot.find(x => x.id === props.guildId)) window.open(`https://discord.com/api/oauth2/authorize?client_id=${config.infos.id}&guild_id=${res.guildsWithoutBot.find(x => x.id === props.guildId)!.id}&permissions=-1&scope=bot`)
            else if (!res.guildsWithBot.find(x => x.id === props.guildId) && !res.guildsWithoutBot.find(x => x.id === props.guildId)) window.location.href = `/dash`
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

export const getServerSideProps: (ctx: any) => Promise<{ props: { data: Data } }> = async (ctx) => {
    const data = await axios.get(`${process.env.APP_URL}/api/data`, {
        headers: {
            Cookie: ctx.req.headers.cookie
        }
    }).then(res => res.data).catch(() => null);

    return { props: { data: data, guildId: ctx.query.id } };
}