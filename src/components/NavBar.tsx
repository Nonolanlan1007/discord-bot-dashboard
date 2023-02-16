import config from "@/utils/config.json"
import styles from "@/styles/components/NavBar.module.css"
import { Button } from "@/components/Inputs";
import {DiscordUser} from "@/utils/types";

interface NavBarProps {
    user?: DiscordUser | null
}

export default function NavBar(props: NavBarProps) {
    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <img src={config.infos.avatar} alt={config.infos.name} className={styles.logo}/>
                <Button label="Accueil" type="primary" redirect="/" />
                {
                    config.infos.docs ? <Button label="Documentation" type="primary" redirect={config.infos.docs}/> : null
                }
                {
                    config.infos.support ? <Button label="Serveur support" type="primary" redirect={config.infos.support} /> : null
                }
            </div>
            <div className={styles.right}>
                {
                    props.user ? <Button label={props.user.username} type="iconic" icon={props.user.avatar ? `https://cdn.discordapp.com/avatars/${props.user.id}/${props.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/0.png"} redirect="/dash" /> : <Button label="Se connecter" type="tertiary" redirect="/dash" />
                }
            </div>
        </div>
    )
}