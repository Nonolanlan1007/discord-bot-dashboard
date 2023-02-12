import { GetServerSidePropsContext } from 'next';
// @ts-ignore
import { parse } from 'cookie';
// @ts-ignore
import { verify } from 'jsonwebtoken';
import {Guild} from "@/utils/types";

export function parseUserGuilds(ctx: GetServerSidePropsContext): Guild[] | null {
    if (!ctx.req.headers.cookie) return null;

    const token = JSON.parse(parse(ctx.req.headers.cookie)[`${process.env.COOKIENAME}`]).guilds

    if (!token) return null;

    try {
        const { iat, exp, ...guilds } = verify(token, process.env.JWT_SECRET!) as Guild[] & { iat: number; exp: number; };
        return guilds;
    } catch (err) {
        return null;
    }
}