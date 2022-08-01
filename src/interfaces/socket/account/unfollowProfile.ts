// ******************** //
// Interfaces for the unfollowProfile event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface UnfollowProfileParams {
    profileId: string;
}

export interface UnfollowProfileResult extends FronvoError {}
