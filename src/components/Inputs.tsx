import config from "@/utils/config.json";
import {useState} from "react";
import Link from "next/link";
import ButtonStyle from "@/styles/components/Buttons.module.css";

interface ButtonProps {
    label: string
    onClick?: () => void
    type: 'primary' | 'secondary' | 'tertiary' | "iconic"
    redirect?: string
    icon?: string
}

function Button (props: ButtonProps) {
    return (
        <>
            {
                props.type === "primary" ? <span style={{ cursor: "pointer" }}>{ props.redirect ? <Link className={ButtonStyle.link} href={props.redirect} target={props.redirect.startsWith("http") ? "_blank" : "_parent"}><button onClick={props.onClick} className={ButtonStyle.primary}  >{props.label}</button></Link> : <button onClick={props.onClick} className={ButtonStyle.primary}  >{props.label}</button> }</span> : null
            }
            {
                props.type === "secondary" ? <span style={{ cursor: "pointer" }}>{ props.redirect ? <Link className={ButtonStyle.link} href={props.redirect} target={props.redirect.startsWith("http") ? "_blank" : "_parent"}><button onClick={props.onClick} className={ButtonStyle.secondary}  >{props.label}</button></Link> : <button onClick={props.onClick} className={ButtonStyle.secondary}  >{props.label}</button> }</span> : null
            }
            {
                props.type === "tertiary" ? <span style={{ cursor: "pointer" }}>{ props.redirect ? <Link className={ButtonStyle.link} href={props.redirect} target={props.redirect.startsWith("http") ? "_blank" : "_parent"}><button onClick={props.onClick} className={ButtonStyle.tertiary}  >{props.label}</button></Link> : <button onClick={props.onClick} className={ButtonStyle.tertiary}  >{props.label}</button> }</span> : null
            }
            {
                props.type === "iconic" && props.icon ? <span style={{ cursor: "pointer" }}>{ props.redirect ? <Link className={ButtonStyle.link} href={props.redirect} target={props.redirect.startsWith("http") ? "_blank" : "_parent"}><button onClick={props.onClick} className={ButtonStyle.iconic}  ><img className={ButtonStyle.icon} src={props.icon} alt={props.label}/>{props.label}</button></Link> : <button onClick={props.onClick} className={ButtonStyle.iconic}  ><img className={ButtonStyle.icon} src={props.icon} alt={props.label}/>{props.label}</button> }</span> : null
            }
        </>
    )
}

export {
    Button
}