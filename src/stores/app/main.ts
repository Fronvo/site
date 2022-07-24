// ******************** //
// Shared variables for the app route, after login.
// ******************** //

import EditProfileModal from '$lib/app/main/modals/EditProfileModal.svelte';
import FollowersModal from '$lib/app/main/modals/FollowersModal.svelte';
import FollowingModal from '$lib/app/main/modals/FollowingModal.svelte';
import SettingsModal from '$lib/app/main/modals/SettingsModal.svelte';
import CommunitiesPanel from '$lib/app/main/panels/CommunitiesPanel.svelte';
import HomePanel from '$lib/app/main/panels/HomePanel.svelte';
import MarketplacePanel from '$lib/app/main/panels/MarketplacePanel.svelte';
import ProfilePanel from '$lib/app/main/panels/ProfilePanel.svelte';
import { writable } from 'svelte/store';

export const loginSucceeded = writable(false);

// Panel settings
export const panels = [
    HomePanel,
    ProfilePanel,
    CommunitiesPanel,
    MarketplacePanel,
];

export const currentPanelId = writable(0);

// Modal settings
export const modals = [
    SettingsModal,
    FollowingModal,
    FollowersModal,
    EditProfileModal,
];

export const currentModalId = writable(0);
export const modalVisible = writable(false);
export const modalAnimDuration = 400;
export const followingModalInfo = writable([]);
export const followersModalInfo = writable([]);
