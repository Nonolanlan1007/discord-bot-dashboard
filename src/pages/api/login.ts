import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import config from "@/utils/config.json";
// @ts-ignore
import {sign, verify} from "jsonwebtoken";
// @ts-ignore
import {serialize} from "cookie";
import {Guild,DiscordUser} from "@/utils/types";


const scope = ["identify", "guilds"].join(" ");
const REDIRECT_URI = `${process.env.APP_URL}/api/login`

const OAUTH_PARAMS = new URLSearchParams({
    client_id: config.infos.id,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope,
}).toString();

const OAuthURL = `https://discord.com/api/oauth2/authorize?${OAUTH_PARAMS}`;

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.redirect("/");

    const { code = null, error = null, redirect = null } = req.query;

    if (error) return res.redirect(`/?error=${req.query.error}`);

    if (redirect) {
        res.setHeader("Set-Cookie", [
            serialize("redirectAfterLogin", redirect, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "lax",
                path: "/"
            }),
        ]);
    }

    if (!code || typeof code !== "string") return res.redirect(OAuthURL);

    const body = new URLSearchParams({
        client_id: config.infos.id,
        client_secret: process.env.CLIENT_SECRET!,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code,
        scope,
    }).toString();

    // @ts-ignore
    const { access_token, token_type = "Bearer" } = await axios.post("https://discord.com/api/oauth2/token", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).then(res => res.data).catch(() => {
        return res.redirect(OAuthURL)
    })

    if (!access_token || typeof access_token !== "string") return res.redirect(OAuthURL);

    let redirectAfterLogin = req.cookies.redirectAfterLogin;

    const data = await axios.post(`${process.env.APP_URL}/api/data`, { token: access_token }).then(res => res.data).catch(() => { return undefined });

    if (data && data.success && data.id) {
        res.setHeader("Set-Cookie", serialize("id", String(data.id), {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "lax",
            path: "/"
        }));

        return res.redirect(redirectAfterLogin || "/");
    }

    return res.redirect(OAuthURL);
}