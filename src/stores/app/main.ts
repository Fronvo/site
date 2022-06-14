// ******************** //
// Shared variables for the app route, after login.
// ******************** //

import CommunitiesPanel from '$lib/app/main/panels/CommunitiesPanel.svelte';
import FriendsPanel from '$lib/app/main/panels/FriendsPanel.svelte';
import HomePanel from '$lib/app/main/panels/HomePanel.svelte';
import MarketplacePanel from '$lib/app/main/panels/MarketplacePanel.svelte';
import SettingsPanel from '$lib/app/main/panels/SettingsPanel.svelte';
import type { FronvoAccount } from 'interfaces/app/main';
import { writable, type Writable } from 'svelte/store';

export const mainVisible = writable(false);

export const loginSucceeded = writable(false);

// Filled in after login
export const userData: Writable<FronvoAccount> = writable();

// Panel switching
export const panels = [
    HomePanel,
    FriendsPanel,
    CommunitiesPanel,
    MarketplacePanel,
    SettingsPanel,
];

// Default to Home
export const currentPanelId = writable(0);
