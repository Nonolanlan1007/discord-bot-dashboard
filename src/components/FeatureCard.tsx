import styles from "@/styles/components/FeatureCard.module.css"
import {useState} from "react";
import config from "@/utils/config.json"

interface FunctionCardProps {
    title: string
    description: string
    icon: string
}

export default function FeatureCard(props: FunctionCardProps) {
    const [hover, setHover] = useState(false)

    let style = {
        color: hover ? config.infos.mainColor : "white"
    }

    const handleMouseEnter = () => {
        setHover(true);
    };
    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <>
            <div className={styles.card} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {
                    props.icon ? <img src={props.icon} alt={props.title}/> : null
                }
                <h2 className={styles.title} style={style}>{ props.title }</h2>
                {
                    props.description ? <h3>{ props.description }</h3> : null
                }
            </div>
        </>
    )
}