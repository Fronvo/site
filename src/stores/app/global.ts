// ******************** //
// Shared variables for the app route.
// ******************** //

import { writable } from 'svelte/store';

export const tokenInvalid = writable(false);

export const showHomeLoadingDelay = 750;
