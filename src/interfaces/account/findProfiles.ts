// ******************** //
// Interfaces for the findProfiles event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface FindProfilesParams {
    profileId: string;
    maxResults?: string;
}

export interface FindProfilesResult extends FronvoError {
    findResults: string[];
}
