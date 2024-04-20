// ******************** //
// Interfaces for all kinds of files.
// ******************** //

export interface FronvoError {
    err: {
        msg: string;
        code: number;
        name: string;
        extras?: {
            for?: string;
            min?: number;
            max?: number;
        };
    };
}

export interface AccountPost {
    postId: string;
    author: string;
    attachment?: string;
    creationDate: string;
    totalLikes: number;
    isLiked: boolean;
}

export interface Post {
    post: AccountPost;
    profileData: FronvoAccount;
}
export interface FronvoAccount {
    profileId: string;
    username: string;
    bio: string;
    avatar: string;
    banner: string;
    creationDate: string;
    isSelf: boolean;
    online: boolean;
    totalPosts: number;
    status?: string;
    pendingFriendRequests?: string[];
    friends: string[];
    isTurbo?: boolean;
    hasSpotify?: boolean;
    spotifyName?: string;
    spotifyURL?: string;
    hasGithub?: boolean;
    githubName?: string;
    githubURL?: string;
}

export interface SwitchedAccount {
    avatar: string;
    profileId: string;
    token: string;
}

export interface Room {
    roomId: string;
    totalMessages: number;
    unreadCount: number;
    dmUsers?: string[];
    dmUserOnline?: boolean;
    dmUser?: FronvoAccount;
}

export interface Server {
    serverId: string;
    ownerId?: string;
    name?: string;
    icon?: string;
    invite?: string;
    invitesDisabled?: boolean;
    creationDate?: string;
    members?: string[];
    channels?: Channel[];
    roles?: string[];
    bannedMembers?: string[];
}

export interface Channel {
    channelId?: string;
    name?: string;
    creationDate?: string;
}

export interface RoomMessage {
    messageId: string;
    ownerId: string;
    content: string;
    creationDate: string;
    isReply: boolean;
    replyId: string;
    isImage: boolean;
    attachment?: string;
    isSpotify?: boolean;
    spotifyEmbed?: string;
    isTenor?: boolean;
    tenorUrl?: string;
}

export interface Theme {
    title: string;
    brandingWhite?: string;
    brandingDarkenWhite?: string;
    brandingDark?: string;
    brandingDarkenDark?: string;
}
