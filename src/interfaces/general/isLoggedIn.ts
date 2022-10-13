// ******************** //
// Interfaces for the isLoggedIn event file.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface isLoggedInParams {}

export interface IsLoggedInResult extends FronvoError {
    loggedIn: boolean;
}
