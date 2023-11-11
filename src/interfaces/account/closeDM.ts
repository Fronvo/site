// ******************** //
// Interfaces for the closeDM event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface CloseDMParams {
    roomId: string;
}

export interface CloseDMResult extends FronvoError {}
