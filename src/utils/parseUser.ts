import { GetServerSidePropsContext } from 'next';
// @ts-ignore
import { parse } from 'cookie';
// @ts-ignore
import { verify } from 'jsonwebtoken';
import {DiscordUser, Guild} from './types';

export function parseUser(ctx: GetServerSidePropsContext): DiscordUser | null {
    if (!ctx.req.headers.cookie) return null;

    const token = parse(ctx.req.headers.cookie)[`${process.env.COOKIENAME!}`];

    if (!token) return null;

    try {
        const { iat, exp, ...data } = verify(token, process.env.JWT_SECRET!) as { user: DiscordUser, guilds: Guild[] } & { iat: number; exp: number; };
        /*console.log(data)*/
        return data.user;
    } catch (err) {
        return null;
    }
}