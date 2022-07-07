// ******************** //
// Shared variables for the app home panel, after login.
// ******************** //

import type { HomeUpdates } from 'src/interfaces/app/home';
import { writable, type Writable } from 'svelte/store';

export const homeUpdates: Writable<HomeUpdates[]> = writable();
