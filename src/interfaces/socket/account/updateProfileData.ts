// ******************** //
// Interfaces for the updateProfileData event file.
// ******************** //

import type { FronvoAccount } from 'interfaces/app/main';
import type { FronvoError } from 'interfaces/socket/all';

export interface UpdateProfileDataParams {
    profileId?: string;
    username?: string;
    bio?: string;
    avatar?: string;
    isPrivate?: boolean;
}

export interface UpdateProfileDataResult extends FronvoError {
    profileData: Partial<FronvoAccount>;
}
