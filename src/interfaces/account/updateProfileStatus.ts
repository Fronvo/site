// ******************** //
// Interfaces for the updateProfileStatus event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface UpdateProfileStatusParams {
    status: string;
}

export interface UpdateProfileStatusResult extends FronvoError {}
