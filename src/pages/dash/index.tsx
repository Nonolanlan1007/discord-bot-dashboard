import {useEffect} from "react";
import {DiscordUser, Guild, Props} from "@/utils/types";
import {parseUser} from "@/utils/parseUser";
import axios from "axios";
import Head from "next/head";

export default function Dash (props: Props) {
    useEffect(() => {
        if (props.user) window.location.href = `/dash/servers`
        else window.location.href = `/login`
    },[])

    let style = {
        "text-align": "center",
        "font-size": "200px",
        "margin-top": "25px"
    }

    let style2 = {
        "text-align": "center",
        "font-size": "100px",
        "margin-top": "25px"
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

    /*console.log(user)*/
    console.log(ctx.req.headers)

    const stats = await axios.get(`${process.env.APP_URL}/api/stats`).then(res => res.data);

    return { props: { user: user, servers: stats.servers! } };
}