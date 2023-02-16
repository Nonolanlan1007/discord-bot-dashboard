import {useEffect} from "react";
import {DiscordUser, Guild} from "@/utils/types";
import {parseUser} from "@/utils/parseUser";
import NavBar from "@/components/NavBar";
import getUserGuilds from "@/utils/getUserGuilds";
import styles from "@/styles/pages/servers.module.css";
import config from "@/utils/config.json";
import GuildCard from "@/components/GuildCard";
import getBotGuilds from "@/utils/getBotGuilds";
import Head from "next/head";
import checkGuild from "@/utils/checkGuild";

export default function Dash (props: { user: DiscordUser | null, guilds: Guild[] | null, botGuilds: Guild[] | null }) {
    useEffect(() => {
        if (!props.user || !props.guilds) window.location.href = `/login`
        else {
            if (props.guilds.length === 1) window.location.href = `/dash/${props.guilds[0].id}`
        }
    },[])

    const res = checkGuild(props.botGuilds, props.guilds)

    return (
        <>
            <Head>
                <title>Vos serveurs - { config.infos.name }</title>
            </Head>
            <NavBar user={props.user} />
            <div className={styles.main}>
                <h1>
                    Sélectionnez un serveur à gérer, ou invitez { config.infos.name } sur votre serveur !
                </h1>
                <div className={styles.guilds}>
                    {
                        res.guildsWithBot && res.guildsWithBot.length > 0 ? res.guildsWithBot.map((guild: Guild) => {
                            return (
                                <GuildCard guild={guild} botIsInGuild={true} />
                            )
                        }) : <h2>Et si vous commenciez pas créer un serveur ?</h2>
                    }
                    {
                        res.guildsWithoutBot && res.guildsWithoutBot.length > 0 ? res.guildsWithoutBot.map((guild: Guild) => {
                            return (
                                <GuildCard guild={guild} botIsInGuild={false} />
                            )
                        }) : ""
                    }
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: (ctx: any) => Promise<{ props: { user: DiscordUser | null, guilds: Guild[] | null } }> = async (ctx) => {
    const user = parseUser(ctx);

    let guilds = null

    if (user) guilds = await getUserGuilds(ctx)

    const botGuilds = await getBotGuilds()

    return { props: { user: user, guilds: guilds ? guilds.data : null, botGuilds: botGuilds ? botGuilds.data : null } };
}