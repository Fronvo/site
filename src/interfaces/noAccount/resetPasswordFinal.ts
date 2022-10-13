// ******************** //
// Interfaces for the resetPasswordFinal event.
// ******************** //

import type { FronvoError } from 'interfaces/all';

export interface ResetPasswordFinalParams {
    newPassword: string;
}

export interface ResetPasswordFinalResult extends FronvoError {}
