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
}

export interface SwitchedAccount {
    avatar: string;
    username: string;
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
    lastMessage?: string;
    lastMessageAt: string;
    lastMessageFrom?: string;
    isDM: boolean;
    unreadCount: number;
    dmUsers?: string[];
    dmUserOnline?: boolean;
    dmUser?: FronvoAccount;
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
}

export interface Theme {
    title: string;
    description: string;
    icon: string;
    brandingWhite?: string;
    brandingDarkenWhite?: string;
    brandingDark?: string;
    brandingDarkenDark?: string;
}
