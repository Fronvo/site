// ******************** //
// Interfaces for the toggleDisableAccount event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface ToggleDisableAccountParams {
    profileId: string;
}

export interface ToggleDisableAccountResult extends FronvoError {}
