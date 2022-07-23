// ******************** //
// Shared variables for the app profile panel, after login.
// ******************** //

import type { FronvoAccount } from 'interfaces/app/main';
import { writable, type Writable } from 'svelte/store';

export const userData: Writable<FronvoAccount> = writable();
