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

interface AccountPost {
    title: string;
    message: string;
    creationDate: string;
}
