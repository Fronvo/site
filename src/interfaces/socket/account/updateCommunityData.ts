// ******************** //
// Interfaces for the updateCommunityData event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';
import type { Community } from 'interfaces/app/communities';

export interface UpdateCommunityDataParams {
    communityId?: string;
    name?: string;
    description?: string;
    icon?: string;
}

export interface UpdateCommunityDataResult extends FronvoError {
    communityData: Partial<Community>;
}
