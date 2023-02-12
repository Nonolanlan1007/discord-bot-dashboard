import {useEffect} from "react";
import {DiscordUser} from "@/utils/types";
import {parseUser} from "@/utils/parseUser";
import NavBar from "@/components/NavBar";

export default function Dash (props: { user: DiscordUser | null }) {
    useEffect(() => {
        if (!props.user) window.location.href = `/login`
    },[])

    return (
        <>
            <NavBar user={props.user} />
            <h1>Coucou 👋</h1>
        </>
    )
}

export const getServerSideProps: (ctx: any) => Promise<{ props: { user: DiscordUser | null } }> = async (ctx) => {
    const user = parseUser(ctx);

    return { props: { user: user } };
}