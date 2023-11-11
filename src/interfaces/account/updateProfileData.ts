// ******************** //
// Interfaces for the updateProfileData event file.
// ******************** //

import type { FronvoAccount, FronvoError } from 'interfaces/all';

export interface UpdateProfileDataParams {
    username?: string;
    bio?: string;
    avatar?: string;
    banner?: string;
}

export interface UpdateProfileDataResult extends FronvoError {
    profileData: Partial<FronvoAccount>;
}
