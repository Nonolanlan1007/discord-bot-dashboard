import { GetServerSidePropsContext } from 'next';
// @ts-ignore
import { parse } from 'cookie';
// @ts-ignore
import { verify } from 'jsonwebtoken';
import { DiscordUser } from './types';

export function parseUser(ctx: GetServerSidePropsContext): DiscordUser | null {
    if (!ctx.req.headers.cookie) return null;

    const token = parse(ctx.req.headers.cookie)[`${process.env.COOKIENAME}`];

    if (!token) return null;

    try {
        const { iat, exp, ...user } = verify(token, process.env.JWT_SECRET!) as DiscordUser & { iat: number; exp: number; };
        return user;
    } catch (err) {
        return null;
    }
}