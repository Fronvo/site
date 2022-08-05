// ******************** //
// Interfaces for the findProfiles event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface FindProfilesParams {
    profileId: string;
    maxResults?: string;
}

export interface FindProfilesResult extends FronvoError {
    findResults: string[];
}
