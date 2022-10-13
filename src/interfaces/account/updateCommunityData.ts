// ******************** //
// Interfaces for the updateCommunityData event file.
// ******************** //

import type { Community, FronvoError } from 'interfaces/all';

export interface UpdateCommunityDataParams {
    communityId?: string;
    name?: string;
    description?: string;
    icon?: string;
}

export interface UpdateCommunityDataResult extends FronvoError {
    communityData: Partial<Community>;
}
