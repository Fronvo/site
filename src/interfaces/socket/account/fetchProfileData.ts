// ******************** //
// Interfaces for the fetchProfileData event file.
// ******************** //

import type { FronvoAccount, FronvoError } from 'interfaces/socket/all';

export interface FetchProfileDataParams {
    profileId: string;
}

export interface FetchProfileDataResult extends FronvoError {
    profileData: Partial<FronvoAccount>;
}
