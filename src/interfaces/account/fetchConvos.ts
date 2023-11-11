// ******************** //
// Interfaces for the fetchConvos event file.
// ******************** //

import type { FronvoError, Room } from 'interfaces/all';

export interface FetchConvosParams {}

export interface FetchConvosResult extends FronvoError {
    convos: Room[];
}
