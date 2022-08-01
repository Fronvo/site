// ******************** //
// Interfaces for the followProfile event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface FollowProfileParams {
    profileId: string;
}

export interface FollowProfileResult extends FronvoError {}
