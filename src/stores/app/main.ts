// ******************** //
// Shared variables for the app route, after login.
// ******************** //

import SettingsModal from '$lib/app/main/modals/SettingsModal.svelte';
import CommunitiesPanel from '$lib/app/main/panels/CommunitiesPanel.svelte';
import FriendsPanel from '$lib/app/main/panels/FriendsPanel.svelte';
import HomePanel from '$lib/app/main/panels/HomePanel.svelte';
import MarketplacePanel from '$lib/app/main/panels/MarketplacePanel.svelte';
import type { HomeUpdates } from 'interfaces/app/home';
import type { FronvoAccount } from 'interfaces/app/main';
import { writable, type Writable } from 'svelte/store';

export const loginSucceeded = writable(false);

// Home route
export const userData: Writable<FronvoAccount> = writable();
export const homeUpdates: Writable<HomeUpdates[]> = writable();

// Panel settings
export const panels = [
    HomePanel,
    FriendsPanel,
    CommunitiesPanel,
    MarketplacePanel,
];

export const currentPanelId = writable(0);

// Modal settings
export const modals = [SettingsModal];

export const currentModalId = writable(0);
export const modalVisible = writable(false);
export const modalAnimDuration = 400;
