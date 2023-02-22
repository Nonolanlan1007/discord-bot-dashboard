import styles from "@/styles/components/ModuleCard.module.css";
import Link from "next/link";

export default function ModuleCard (props: { module: any, guildId: string }) {
    return (
        <>
            <Link href={`/dash/${props.guildId}/modules/${props.module.name}`} className={styles.link}>
                <div className={styles.card}>
                    <h3>
                        { props.module.title }
                    </h3>
                    <p>
                        { props.module.description || "" }
                    </p>
                </div>
            </Link>
        </>
    )
}