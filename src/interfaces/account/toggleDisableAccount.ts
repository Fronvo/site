// ******************** //
// Interfaces for the toggleDisableAccount event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface ToggleDisableAccountParams {
    profileId: string;
}

export interface ToggleDisableAccountResult extends FronvoError {}
