// ******************** //
// Interfaces for the fetchProfileData event file.
// ******************** //

import type { FronvoAccount } from 'interfaces/app/main';
import type { FronvoError } from 'interfaces/socket/all';

export interface FetchProfileDataParams {
    profileId: string;
}

export interface FetchProfileDataResult extends FronvoError {
    profileData: FronvoAccount;
}
