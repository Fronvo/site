// ******************** //
// Interfaces for the joinCommunity event file.
// ******************** //

import type { Community, FronvoError } from 'interfaces/all';

export interface JoinCommunityParams {
    communityId: string;
}

export interface JoinCommunityResult extends FronvoError {
    communityData: Community;
}
