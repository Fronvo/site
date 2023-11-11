// ******************** //
// Interfaces for the addFriend event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface AddFriendParams {
    profileId: string;
}

export interface AddFriendResult extends FronvoError {}
