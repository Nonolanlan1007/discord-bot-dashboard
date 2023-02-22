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
    servers: number;
}

export interface Guild {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: number;
    features: string[];
}

export interface Data {
    userInfos: DiscordUser;
    userGuilds: Guild[];
    botGuilds: Guild[];
}

export interface Role {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    icon?: string;
    unicode_emoji?: string;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags?: {
        bot_id?: string;
        integration_id?: string;
        premium_subscriber?: null;
        subscription_listing_id?: string;
        available_for_purchase?: null;
        guild_connections?: null;
    }
}

export interface Channel {
    id: string;
    type: number;
    guild_id?: string;
    position?: number;
    permission_overwrites?: any[];
    name?: string;
    topic?: string | null;
    nsfw?: boolean;
    last_message_id?: string | null;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: any[];
    icon?: string | null;
    owner_id?: string;
    application_id?: string;
    parent_id?: string | null;
    last_pin_timestamp?: string | null;
    rtc_region?: string | null;
    video_quality_mode?: number;
    message_count?: number;
    member_count?: number;
    thread_metadata?: {
        archived: boolean;
        auto_archive_duration: number;
        archive_timestamp: string;
        locked: boolean;
        invitable: boolean;
        created_timestamp: string;
    };
    member?: {
        id?: string;
        user_id?: string;
        join_timestamp?: string;
        flags?: number;
        member?: GuildMember;
    };
    default_auto_archive_duration?: number;
    permissions?: string;
    flags?: number;
    total_thread_member_count?: number;
    available_tags?: ForumTag[];
    applied_tags?: string[];
    default_reaction_emoji?: {
        emoji_id: string | null;
        emoji_name: string | null;
    };
    default_thread_rate_limit_per_user?: number;
    default_sort_order?: number;
    default_forum_layout?: number;
}

export interface GuildMember {
    user?: DiscordUser;
    nick?: string | null;
    avatar?: string | null;
    roles: string[];
    joined_at: string;
    premium_since?: string | null;
    deaf: boolean;
    mute: boolean;
    flags: number;
    pending?: boolean;
    permissions?: string;
    communication_disabled_until?: string | null;
}

export interface ForumTag {
    id: string;
    name: string;
    moderated: boolean;
    emoji_id: string | null;
    emoji_name: string | null;
}

export interface FullGuild {
    id: string;
    name: string;
    icon: string | null;
    icon_hash: string | null;
    splash: string | null;
    discovery_splash: string | null;
    owner?: boolean;
    owner_id: string;
    permissions?: string;
    region?: string;
    afk_channel_id: string | null;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: string | null;
    verification_level: number;
    default_message_notifications: number;
    explicit_content_filter: number;
    roles: Role[];
    emojis: Emoji[];
    features: string[];
    mfa_level: number;
    application_id: string | null;
    system_channel_id: string | null;
    system_channel_flags: number;
    rules_channel_id: string | null;
    max_presences?: number | null;
    max_members: number;
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
    premium_tier: number;
    premium_subscription_count?: number;
    preferred_locale: string;
    public_updates_channel_id: string | null;
    max_video_channel_users?: number;
    approximate_member_count?: number;
    approximate_presence_count?: number;
    welcome_screen?: {
        description: string;
        welcome_channels: WelcomeChannel[];
    };
    nsfw_level: number;
    stickers?: Sticker[];
    premium_progress_bar_enabled?: boolean;
}

export interface WelcomeChannel {
    channel_id: string;
    description: string;
    emoji_id: string | null;
    emoji_name: string | null;
}

export interface Emoji {
    id: string | null;
    name: string | null;
    roles?: string[];
    user?: DiscordUser;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
}

export interface Sticker {
    id: string;
    pack_id?: string;
    name: string;
    description: string | null;
    tags: string;
    asset?: string;
    type: number;
    format_type: number;
    available?: boolean;
    guild_id?: string;
    user?: DiscordUser;
    sort_value?: number;
}