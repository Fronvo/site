// ******************** //
// Shared interfaces for the app home panel, after login.
// ******************** //

import type { AccountPost, FronvoAccount } from 'interfaces/app/main';

export interface HomePost {
    post: AccountPost;
    profileData: FronvoAccount;
}
