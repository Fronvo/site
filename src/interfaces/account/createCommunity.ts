// ******************** //
// Interfaces for the createCommunity event file.
// ******************** //

import type { Community, FronvoError } from 'interfaces/all';

export interface CreateCommunityParams {
    name: string;
    description: string;
    icon?: string;
}

export interface CreateCommunityResult extends FronvoError {
    communityData: Community;
}
