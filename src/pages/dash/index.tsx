import {useEffect} from "react";
import {Data} from "@/utils/types";
import Head from "next/head";
import axios from "axios";

export default function Dash (props: { data: Data }) {

    useEffect(() => {
        if (!props.data) window.location.href = `/login`
        else window.location.href = `/dash/servers`
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

    return { props: { data: data ? data : null } };
}