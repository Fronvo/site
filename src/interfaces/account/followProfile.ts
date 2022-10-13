// ******************** //
// Interfaces for the followProfile event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface FollowProfileParams {
    profileId: string;
}

export interface FollowProfileResult extends FronvoError {}
