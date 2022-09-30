// ******************** //
// Interfaces for the joinCommunity event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';
import type { Community } from 'interfaces/app/communities';

export interface JoinCommunityParams {
    communityId: string;
}

export interface JoinCommunityResult extends FronvoError {
    communityData: Community;
}
