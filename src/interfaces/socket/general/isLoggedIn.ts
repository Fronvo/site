// ******************** //
// Interfaces for the isLoggedIn event file.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface isLoggedInParams {}

export interface IsLoggedInResult extends FronvoError {
    loggedIn: boolean;
}
