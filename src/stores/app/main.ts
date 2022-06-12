// ******************** //
// Shared variables for the app route, after login.
// ******************** //

import type { FronvoAccount } from 'src/interfaces/app/main';
import HomePanel from 'src/lib/app/main/panels/HomePanel.svelte';
import { writable, type Writable } from 'svelte/store';

export const mainVisible = writable(false);

export const loginSucceeded = writable(false);

// Filled in after login
export const userData: Writable<FronvoAccount> = writable();

// Panel switching
export const panels = [HomePanel];

// Default to Home
export const currentPanelId = writable(0);
