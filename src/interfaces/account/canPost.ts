// ******************** //
// Interfaces for the canPost event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface CanPostParams {}

export interface CanPostResult extends FronvoError {
    canPost: boolean;
}
