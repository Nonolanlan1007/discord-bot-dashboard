import {Guild} from "@/utils/types";
import styles from "@/styles/components/GuildCard.module.css";
import Link from "next/link";
import {Button} from "@/components/Inputs";
import config from "@/utils/config.json";

interface GuildCardProps {
    guild: Guild;
    botIsInGuild: boolean;
}

export default function GuildCard (props: GuildCardProps) {

    return (
        <>
            <div className={styles.guild}>
                <img src={props.guild.icon ? `https://cdn.discordapp.com/icons/${props.guild.id}/${props.guild.icon}.png` : "https://cdn.discordapp.com/embed/avatars/0.png"} alt={props.guild.name} className={styles.icon} />
                <h3>{ props.guild.owner ? "👑 - " : ""}{props.guild.name}</h3>
                <Button label={props.botIsInGuild ? "Gérer" : "Inviter"} type={"primary"} redirect={props.botIsInGuild ? `/dash/${props.guild.id}` : `https://discord.com/api/oauth2/authorize?client_id=${config.infos.id}&guild_id=${props.guild.id}&permissions=-1&redirect_uri=${/*${encodeURIComponent(`${process.env.APP_URL}/dash`)}*/ ""}&scope=bot`} />
            </div>
        </>
    )
}