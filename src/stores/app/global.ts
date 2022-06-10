// ******************** //
// Shared variables for the app route.
// ******************** //

import { writable } from 'svelte/store';

export const appVisible = writable(false);

export const hasLoggedIn = writable(false);

export const tokenInvalid = writable(false);