// ******************** //
// Shared variables for the app route, after login.
// ******************** //

import CreatePostModal from '$lib/app/main/modals/CreatePostModal.svelte';
import EditProfileModal from '$lib/app/main/modals/EditProfileModal.svelte';
import FollowInfoModal from '$lib/app/main/modals/FollowInfoModal.svelte';
import SettingsModal from '$lib/app/main/modals/SettingsModal.svelte';
import ViewHomePostModal from '$lib/app/main/modals/ViewHomePostModal.svelte';
import ViewProfilePostModal from '$lib/app/main/modals/ViewProfilePostModal.svelte';
import CommunitiesPanel from '$lib/app/main/panels/CommunitiesPanel.svelte';
import HomePanel from '$lib/app/main/panels/HomePanel.svelte';
import MarketplacePanel from '$lib/app/main/panels/MarketplacePanel.svelte';
import ProfilePanel from '$lib/app/main/panels/ProfilePanel.svelte';
import type { HomePost } from 'interfaces/app/home';
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
    FollowInfoModal,
    EditProfileModal,
    CreatePostModal,
    ViewHomePostModal,
    ViewProfilePostModal,
];

export const currentModalId = writable(0);
export const modalVisible = writable(false);
export const modalAnimDuration = 200;
export const followModalInfo: Writable<string[]> = writable();
export const followModalForFollowing: Writable<boolean> = writable();
export const viewHomePostModalInfo: Writable<HomePost> = writable();
export const viewProfilePostModalInfo: Writable<AccountPost> = writable();
