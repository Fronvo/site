// ******************** //
// Interfaces for the fetchCommunityData event file.
// ******************** //

import type { Community } from 'interfaces/app/communities';
import type { FronvoError } from 'interfaces/socket/all';

export interface FetchCommunityDataParams {
    communityId: string;
}

export interface FetchCommunityDataResult extends FronvoError {
    communityData: Community;
}
