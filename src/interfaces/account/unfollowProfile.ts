// ******************** //
// Interfaces for the unfollowProfile event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface UnfollowProfileParams {
    profileId: string;
}

export interface UnfollowProfileResult extends FronvoError {}
