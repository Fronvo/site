// ******************** //
// Interfaces for the createCommunity event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';
import type { Community } from 'interfaces/app/communities';

export interface CreateCommunityParams {
    name: string;
    description: string;
    icon?: string;
}

export interface CreateCommunityResult extends FronvoError {
    communityData: Community;
}
