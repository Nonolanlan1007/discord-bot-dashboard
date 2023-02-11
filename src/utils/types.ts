export interface DiscordUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    public_flags: number;
    flags: number;
    locale: string;
    mfa_enabled: boolean;
    email: string;
    verified: boolean;
    banner: string;
}

export interface Props {
    user: DiscordUser | null;
}