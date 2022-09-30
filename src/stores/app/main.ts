// ******************** //
// Shared variables for the app route, after login.
// ******************** //

import CommunityOptionsDropdown from '$lib/app/main/dropdowns/CommunityOptionsDropdown.svelte';
import CommunityMembers from '$lib/app/main/modals/CommunityMembers.svelte';
import ControlCentreModal from '$lib/app/main/modals/ControlCenterModal.svelte';
import CreateCommunityModal from '$lib/app/main/modals/CreateCommunityModal.svelte';
import CreatePostModal from '$lib/app/main/modals/CreatePostModal.svelte';
import EditCommunityMemberModal from '$lib/app/main/modals/EditCommunityMemberModal.svelte';
import EditCommunityModal from '$lib/app/main/modals/EditCommunityModal.svelte';
import EditProfileModal from '$lib/app/main/modals/EditProfileModal.svelte';
import FindCommunitiesModal from '$lib/app/main/modals/FindCommunitiesModal.svelte';
import FindProfilesModal from '$lib/app/main/modals/FindProfilesModal.svelte';
import FollowInfoModal from '$lib/app/main/modals/FollowInfoModal.svelte';
import JoinCommunityModal from '$lib/app/main/modals/JoinCommunityModal.svelte';
import LeaveCommunityModal from '$lib/app/main/modals/LeaveCommunityModal.svelte';
import MaxOnlineTimeModal from '$lib/app/main/modals/MaxOnlineTimeModal.svelte';
import PostModal from '$lib/app/main/modals/PostModal.svelte';
import SettingsModal from '$lib/app/main/modals/SettingsModal.svelte';
import CommunitiesPanel from '$lib/app/main/panels/CommunitiesPanel.svelte';
import HomePanel from '$lib/app/main/panels/HomePanel.svelte';
import MarketplacePanel from '$lib/app/main/panels/MarketplacePanel.svelte';
import ProfilePanel from '$lib/app/main/panels/ProfilePanel.svelte';
import type { HomePost } from 'interfaces/app/home';
import type { AccountPost, FronvoAccount } from 'interfaces/app/main';
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
    PostModal,
    FindProfilesModal,
    ControlCentreModal,
    MaxOnlineTimeModal,
    CreateCommunityModal,
    JoinCommunityModal,
    FindCommunitiesModal,
    LeaveCommunityModal,
    CommunityMembers,
    EditCommunityModal,
    EditCommunityMemberModal,
];

// Dropdown settings
export const dropdowns = [CommunityOptionsDropdown];

// General Modal settings
export const currentModalId = writable(0);
export const modalVisible = writable(false);
export const modalAnimDuration = 200;

// General Dropdown settings
export const currentDropdownId = writable(0);
export const dropdownVisible = writable(false);
export const dropdownAnimDuration = 200;
export const dropdownPosition = writable([0, 0]);

// FollowModal
export const followModalInfo: Writable<string[]> = writable();
export const followModalForFollowing: Writable<boolean> = writable();

// PostModal
export const postModalInfo: Writable<AccountPost | HomePost> = writable();
export const postModalForHome: Writable<boolean> = writable();

// CommunityMemberModal
export const targetCommunityMember: Writable<FronvoAccount> = writable();
