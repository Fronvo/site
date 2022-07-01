// ******************** //
// Shared variables for the app home panel, after login.
// ******************** //

import type { FronvoAccount } from 'interfaces/app/main';
import type { HomeUpdates } from 'src/interfaces/app/home';
import { writable, type Writable } from 'svelte/store';

export const userData: Writable<FronvoAccount> = writable();
export const homeUpdates: Writable<HomeUpdates[]> = writable();
