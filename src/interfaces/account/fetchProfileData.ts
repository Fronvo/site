// ******************** //
// Interfaces for the fetchProfileData event file.
// ******************** //

import type { FronvoAccount, FronvoError } from 'interfaces/all';

export interface FetchProfileDataParams {
    profileId: string;
}

export interface FetchProfileDataResult extends FronvoError {
    profileData: FronvoAccount;
}
