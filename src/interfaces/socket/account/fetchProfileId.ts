// ******************** //
// Interfaces for the fetchProfileId event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface FetchProfileIdParams {}

export interface FetchProfileIdResult extends FronvoError {
    profileId: string;
}
