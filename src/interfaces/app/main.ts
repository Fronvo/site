// ******************** //
// Shared interfaces for the app route, after login.
// ******************** //

export interface FronvoAccount {
    profileId: string;
    username: string;
    bio: string;
    email?: string;
    avatar: string;
    creationDate: string;
    following: string[];
    followers: string[];
    isSelf: boolean;
    isPrivate: boolean;
    isFollower: boolean;
    isInCommunity: boolean;
    communityId: string;
    isAdmin: boolean;
    isDisabled: boolean;
}

export interface AccountPost {
    postId: string;
    author: string;
    title: string;
    content: string;
    attachment?: string;
    creationDate: string;
}
