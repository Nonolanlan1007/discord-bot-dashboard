import {useEffect} from "react";
import {DiscordUser, Guild} from "@/utils/types";
import NavBar from "@/components/NavBar";
import styles from "@/styles/pages/servers.module.css";
import config from "@/utils/config.json";
import GuildCard from "@/components/GuildCard";
import Head from "next/head";
import parseGuilds from "@/utils/parseGuilds";
import axios from "axios";

export default function Dash (props: { data: { userInfos: DiscordUser, userGuilds: Guild[], botGuilds: Guild[] } }) {
    useEffect(() => {
        if (!props.data || !props.data.userInfos) window.location.href = `/login`
    },[])

    const result = parseGuilds(props.data.botGuilds, props.data.userGuilds)

    return (
        <>
            <Head>
                <title>Vos serveurs - { config.infos.name }</title>
            </Head>
            <NavBar user={props.data.userInfos} />
            <div className={styles.main}>
                <h1>
                    Sélectionnez un serveur à gérer, ou invitez { config.infos.name } sur votre serveur !
                </h1>
                <div className={styles.guilds}>
                    {
                        result.guildsWithBot && result.guildsWithBot.length > 0 ? result.guildsWithBot.map((guild: Guild) => {
                            return (
                                <GuildCard guild={guild} botIsInGuild={true} />
                            )
                        }) : <h2>Et si vous commenciez pas créer un serveur ?</h2>
                    }
                    {
                        result.guildsWithoutBot && result.guildsWithoutBot.length > 0 ? result.guildsWithoutBot.map((guild: Guild) => {
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

export async function getServerSideProps (ctx: any) {
    const data = await axios.get(`${process.env.APP_URL}/api/data`, {
        headers: {
            Cookie: ctx.req.headers.cookie
        }
    }).then(res => res.data).catch(() => null);

    return {
        props: {
            data
        }
    }
}