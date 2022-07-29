// ******************** //
// Shared variables for the app route, after login.
// ******************** //

import CreatePostModal from '$lib/app/main/modals/CreatePostModal.svelte';
import EditProfileModal from '$lib/app/main/modals/EditProfileModal.svelte';
import FollowersModal from '$lib/app/main/modals/FollowersModal.svelte';
import FollowingModal from '$lib/app/main/modals/FollowingModal.svelte';
import SettingsModal from '$lib/app/main/modals/SettingsModal.svelte';
import ViewPostModal from '$lib/app/main/modals/ViewPostModal.svelte';
import CommunitiesPanel from '$lib/app/main/panels/CommunitiesPanel.svelte';
import HomePanel from '$lib/app/main/panels/HomePanel.svelte';
import MarketplacePanel from '$lib/app/main/panels/MarketplacePanel.svelte';
import ProfilePanel from '$lib/app/main/panels/ProfilePanel.svelte';
import type { AccountPost } from 'interfaces/app/main';
import { writable, type Writable } from 'svelte/store';

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
    CreatePostModal,
    ViewPostModal,
];

export const currentModalId = writable(0);
export const modalVisible = writable(false);
export const modalAnimDuration = 200;
export const followingModalInfo = writable([]);
export const followersModalInfo = writable([]);
export const viewPostModalInfo: Writable<AccountPost> = writable();
