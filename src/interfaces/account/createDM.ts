// ******************** //
// Interfaces for the createDM event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface CreateDMParams {
    profileId: string;
}

export interface CreateDMResult extends FronvoError {
    roomId: string;
}
