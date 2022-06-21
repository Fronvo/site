// ******************** //
// Shared variables for the app route, after login.
// ******************** //

import CommunitiesPanel from '$lib/app/main/panels/CommunitiesPanel.svelte';
import FriendsPanel from '$lib/app/main/panels/FriendsPanel.svelte';
import HomePanel from '$lib/app/main/panels/HomePanel.svelte';
import MarketplacePanel from '$lib/app/main/panels/MarketplacePanel.svelte';
import type { FronvoAccount } from 'interfaces/app/main';
import { writable, type Writable } from 'svelte/store';
import type { ModalTypes } from 'types/app/main';

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
];

// Default to Home
export const currentPanelId = writable(0);

// Modal settings
export const modalVisible = writable(false);
export const currentModal: Writable<ModalTypes> = writable();
