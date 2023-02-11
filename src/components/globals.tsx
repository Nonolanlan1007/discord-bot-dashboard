import config from "@/utils/config.json";
import {useState} from "react";
import Link from "next/link";

interface ButtonProps {
    label: string
    onClick?: () => void
    type: 'primary' | 'secondary' | 'tertiary'
    redirect?: string
}

function Button (props: ButtonProps) {
    const [hover, setHover] = useState(false)

    let primaryStyle = {
        "background": hover ? "#36393F" : "#2F3136",
        "border-radius": "1em",
        "border": "none",
        "padding": "25px",
        "transition": "all 0.3s ease",
        "color": hover ? `${config.infos.mainColor}` : "white",
        "font-size": "1.5em",
        "font-weight": "bold",
        "font-family": "'Nunito', sans-serif",
        "outline": "none",
        "text-decoration": "none",
        "cursor": props.onClick ? "pointer" : "default"
    }
    let secondaryStyle = {
        "border-radius": "1em",
        "border": "none",
        "padding": "25px",
        "transition": "all 0.3s ease",
        "color": hover ? `${config.infos.mainColor}` : "white",
        "font-size": "1.5em",
        "font-weight": "bold",
        "font-family": "'Nunito', sans-serif",
        "outline": "none",
        "text-decoration": "none",
        "cursor": props.onClick ? "pointer" : "default",
        "background": hover ? "#2F3136" : `${config.infos.mainColor}`,
    }

    let tertiaryStyle = {
        "border-radius": "1em",
        "border": `10px solid ${config.infos.mainColor}`,
        "padding": "10px",
        "transition": "all 0.3s ease",
        "color": "white",
        "font-size": "1.5em",
        "font-weight": "bold",
        "font-family": "'Nunito', sans-serif",
        "outline": "none",
        "background": hover ? `${config.infos.mainColor}` : "none",
        "text-decoration": "none",
        "cursor": props.onClick ? "pointer" : "default",
    }

    let linkStyle = {
        "text-decoration": "none",
        "color": "white",
        "margin": "0",
        "cursor": "pointer"
    }

    const handleMouseEnter = () => {
        setHover(true);
    };
    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <>
            {
                props.type === "primary" ? <span style={{ cursor: "pointer" }}>{ props.redirect ? <Link style={linkStyle} href={props.redirect} target={props.redirect.startsWith("http") ? "_blank" : "_parent"}><button onClick={props.onClick} style={primaryStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{props.label}</button></Link> : <button onClick={props.onClick} style={primaryStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{props.label}</button> }</span> : null
            }
            {
                props.type === "secondary" ? <span style={{ cursor: "pointer" }}>{ props.redirect ? <Link style={linkStyle} href={props.redirect} target={props.redirect.startsWith("http") ? "_blank" : "_parent"}><button onClick={props.onClick} style={secondaryStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{props.label}</button></Link> : <button onClick={props.onClick} style={secondaryStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{props.label}</button> }</span> : null
            }
            {
                props.type === "tertiary" ? <span style={{ cursor: "pointer" }}>{ props.redirect ? <Link style={linkStyle} href={props.redirect} target={props.redirect.startsWith("http") ? "_blank" : "_parent"}><button onClick={props.onClick} style={tertiaryStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{props.label}</button></Link> : <button onClick={props.onClick} style={tertiaryStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{props.label}</button> }</span> : null
            }
        </>
    )
}

export {
    Button
}