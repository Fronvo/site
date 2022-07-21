// ******************** //
// Shared interfaces for the app route, after login.
// ******************** //

export interface FronvoAccount {
    id: string;
    username: string;
    email: string;
    creationDate: string;
    following: String[];
    followers: String[];
    posts: AccountPost[];
}

interface AccountPost {
    title: string;
    message: string;
    creationDate: string;
}
