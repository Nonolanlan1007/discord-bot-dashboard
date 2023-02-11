import config from "@/utils/config.json"
import styles from "@/styles/components/NavBar.module.css"
import { Button } from "@/components/globals";

export default function NavBar() {
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
                <Button label="Se connecter" type="tertiary" redirect="/login" />
            </div>
        </div>
    )
}