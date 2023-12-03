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
    content?: string;
    attachment?: string;
    gif?: string;
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
    isPRO?: boolean;
    appliedTheme?: string;
    bW?: string;
    bDW?: string;
    bD?: string;
    bDD?: string;
}

export interface SwitchedAccount {
    avatar: string;
    profileId: string;
    token: string;
}

export interface Room {
    roomId: string;
    ownerId?: string;
    name?: string;
    creationDate?: string;
    icon?: string;
    members?: string[];
    totalMessages: number;
    lastMessageFrom?: string;
    isDM: boolean;
    unreadCount: number;
    dmUsers?: string[];
    dmUserOnline?: boolean;
    dmUser?: FronvoAccount;
}

export interface Server {
    serverId: string;
    ownerId?: string;
    name?: string;
    description?: string;
    creationDate?: string;
    icon?: string;
    members?: string[];
    channels?: Channel[];
    roles?: string[];
}

export interface Channel {
    serverId: string;
    roomId?: string;
    name?: string;
    description?: string;
    creationDate?: string;
}

export interface RoomMessage {
    messageId: string;
    ownerId: string;
    content: string;
    creationDate: string;
    isReply: boolean;
    replyContent: string;
    isImage: boolean;
    attachment?: string;
    isSpotify?: boolean;
    spotifyEmbed?: string;
    isTenor?: boolean;
    tenorUrl?: string;
    isNotification?: boolean;
    notificationText?: string;
}

export interface Theme {
    title: string;
    brandingWhite?: string;
    brandingDarkenWhite?: string;
    brandingDark?: string;
    brandingDarkenDark?: string;
}
