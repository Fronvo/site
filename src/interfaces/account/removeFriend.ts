// ******************** //
// Interfaces for the removeFriend event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface RemoveFriendParams {
    profileId: string;
}

export interface RemoveFriendResult extends FronvoError {}
