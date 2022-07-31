// ******************** //
// Interfaces for the updateProfileData event file.
// ******************** //

import type { FronvoAccount } from 'interfaces/app/main';
import type { FronvoError } from 'interfaces/socket/all';

export interface UpdateProfileDataParams {
    username?: string;
    bio?: string;
    avatar?: string;
}

export interface UpdateProfileDataResult extends FronvoError {
    profileData: Partial<FronvoAccount>;
}
