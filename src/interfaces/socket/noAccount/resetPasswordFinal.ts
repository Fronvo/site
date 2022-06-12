// ******************** //
// Interfaces for the resetPasswordFinal event.
// ******************** //

import type { FronvoError } from 'interfaces/socket/all';

export interface ResetPasswordFinalParams {
    newPassword: string;
}

export interface ResetPasswordFinalResult extends FronvoError {}
