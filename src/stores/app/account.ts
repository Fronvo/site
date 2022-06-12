// ******************** //
// Shared variables for the app route, prior to login.
// ******************** //

import { writable } from 'svelte/store';

export const accountVisible = writable(false);

export const accountRegisterTab = writable(true);

export const accountRegisterVerifyTab = writable(false);

export const accountResetPasswordTab = writable(false);

export const accountResetPasswordVerifyTab = writable(false);

export const accountResetPasswordFinalTab = writable(false);
