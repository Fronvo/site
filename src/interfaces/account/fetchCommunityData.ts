// ******************** //
// Interfaces for the fetchCommunityData event file.
// ******************** //

import type { Community, FronvoError } from 'interfaces/all';

export interface FetchCommunityDataParams {
    communityId: string;
}

export interface FetchCommunityDataResult extends FronvoError {
    communityData: Community;
}
