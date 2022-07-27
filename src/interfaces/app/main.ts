// ******************** //
// Shared interfaces for the app route, after login.
// ******************** //

export interface FronvoAccount {
    id: string;
    username: string;
    bio: string;
    email: string;
    avatar: string;
    creationDate: string;
    following: string[];
    followers: string[];
    posts: AccountPost[];
}

export interface AccountPost {
    title: string;
    content: string;
    attachment?: string;
    creationDate: string;
}
