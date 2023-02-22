import {useEffect} from "react";
import {Data, Guild} from "@/utils/types";
import axios from "axios";
import Head from "next/head";
import parseGuilds from "@/utils/parseGuilds";
import config from "@/utils/config.json";
import NavBar from "@/components/NavBar";
import {getModules} from "@/utils/getModules";
import ModuleCard from "@/components/ModuleCard";
import styles from "@/styles/pages/modules.module.css";
import GuildCard from "@/components/GuildCard";

export default function Dash (props: { data: Data, guildId: string, modules: undefined | any[] }) {

    useEffect(() => {
        if (!props.data || !props.data.userInfos) window.location.href = `/login?redirect=${encodeURIComponent(window.location.href)}`;
        else {
            const res = parseGuilds(props.data.botGuilds, props.data.userGuilds)

            if (res.guildsWithoutBot.find(x => x.id === props.guildId)) window.open(`https://discord.com/api/oauth2/authorize?client_id=${config.infos.id}&guild_id=${res.guildsWithoutBot.find(x => x.id === props.guildId)!.id}&permissions=-1&scope=bot`)
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
                    { props.data && props.data.botGuilds && props.data.botGuilds.find(x => x.id === props.guildId) ? props.data.botGuilds.find(x => x.id === props.guildId)!.name : "Dashboard" } - Modules - { config.infos.name }
                </title>
            </Head>
            <NavBar user={props.data && props.data.userInfos ? props.data.userInfos : null} />
            <div className={styles.main}>
                <h1>
                    Sélectionnez un module à configurer !
                </h1>
                <div className={styles.modules}>
                    {
                        props.modules && props.modules.length > 0 ? props.modules.map((x) => {
                            return (
                                <>
                                    <ModuleCard module={x} guildId={props.guildId}/>
                                </>
                            )
                        }) : <h1>
                                Aucun module n'est disponible pour le moment !
                            </h1>
                    }
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: (ctx: any) => Promise<{ props: { data: Data; guildId: any; modules: undefined | any[] } }> = async (ctx) => {
    const data = await axios.get(`${process.env.APP_URL}/api/data`, {
        headers: {
            Cookie: ctx.req.headers.cookie
        }
    }).then(res => res.data).catch(() => null);

    const modules = getModules();

    return { props: { data: data, guildId: ctx.query.id, modules: modules } };
}