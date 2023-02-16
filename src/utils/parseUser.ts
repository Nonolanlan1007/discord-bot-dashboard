import { GetServerSidePropsContext } from 'next';
import {DiscordUser} from "./types";
// @ts-ignore
import { parse } from 'cookie';
// @ts-ignore
import { verify } from 'jsonwebtoken';

export function parseUser(ctx: GetServerSidePropsContext): DiscordUser | null {
    if (!ctx.req.headers.cookie) return null;

    const token = parse(ctx.req.headers.cookie)[`userInfos`];

    if (!token) return null;

    try {
        const { iat, exp, ...user } = verify(token, process.env.JWT_SECRET!) as DiscordUser & { iat: number; exp: number; };
        return user;
    } catch (err) {
        return null;
    }
}