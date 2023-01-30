// ******************** //
// Interfaces for the fetchProfileDataGuest event file.
// ******************** //

import type { FronvoAccount, FronvoError } from 'interfaces/all';

export interface FetchProfileDataGuestParams {
    profileId: string;
}

export interface FetchProfileDataGuestResult extends FronvoError {
    profileData: FronvoAccount;
}
