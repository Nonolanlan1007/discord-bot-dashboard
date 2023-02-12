import config from "@/utils/config.json";
import {useState} from "react";
import Link from "next/link";
import Image from "next/image";

interface ButtonProps {
    label: string
    onClick?: () => void
    type: 'primary' | 'secondary' | 'tertiary' | "iconic"
    redirect?: string
    icon?: string
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
        "cursor": props.onClick || props.redirect ? "pointer" : "default"
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
        "cursor": props.onClick || props.redirect ? "pointer" : "default",
        "background": hover ? "#2F3136" : `${config.infos.mainColor}`,
        "display": "flex",
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
        "cursor": props.onClick || props.redirect ? "pointer" : "default",
    }

    let linkStyle = {
        "text-decoration": "none",
        "color": "white",
        "margin": "0",
        "cursor": "pointer"
    }

    let iconStyle = {
        "border-radius": hover ? "0.2em" : "100%",
        "border": "none",
        "width": "50px",
        "height": "50px",
        "transition": "all 0.3s ease",
    }

    let iconnicStyle = {
        "border-radius": "1em",
        "border": "none",
        "padding": "25px",
        "color": "white",
        "font-size": "1.5em",
        "font-weight": "bold",
        "font-family": "'Nunito', sans-serif",
        "outline": "none",
        "text-decoration": "none",
        "cursor": props.onClick || props.redirect ? "pointer" : "default",
        "background": `${config.infos.mainColor}`,
        "display": "flex",
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
            {
                props.type === "iconic" && props.icon ? <span style={{ cursor: "pointer" }}>{ props.redirect ? <Link style={linkStyle} href={props.redirect} target={props.redirect.startsWith("http") ? "_blank" : "_parent"}><button onClick={props.onClick} style={iconnicStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><img style={iconStyle} src={props.icon} alt={props.label}/>{props.label}</button></Link> : <button onClick={props.onClick} style={iconnicStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><img style={iconStyle} src={props.icon} alt={props.label}/>{props.label}</button> }</span> : null
            }
        </>
    )
}

export {
    Button
}