// ******************** //
// Shared variables for the app route, after login.
// ******************** //

import CommunityOptionsDropdown from '$lib/app/main/dropdowns/CommunityOptionsDropdown.svelte';
import PostOptionsDropdown from '$lib/app/main/dropdowns/PostOptionsDropdown.svelte';
import CommunityMembers from '$lib/app/main/modals/CommunityMembers.svelte';
import ConfirmDeleteMessageModal from '$lib/app/main/modals/ConfirmDeleteMessageModal.svelte';
import CreateCommunityModal from '$lib/app/main/modals/CreateCommunityModal.svelte';
import CreatePostModal from '$lib/app/main/modals/CreatePostModal.svelte';
import DeletePostModal from '$lib/app/main/modals/DeletePostModal.svelte';
import EditCommunityMemberModal from '$lib/app/main/modals/EditCommunityMemberModal.svelte';
import EditCommunityModal from '$lib/app/main/modals/EditCommunityModal.svelte';
import EditJoinRequestModal from '$lib/app/main/modals/EditJoinRequestModal.svelte';
import EditProfileModal from '$lib/app/main/modals/EditProfileModal.svelte';
import FindCommunitiesModal from '$lib/app/main/modals/FindCommunitiesModal.svelte';
import FindProfilesModal from '$lib/app/main/modals/FindProfilesModal.svelte';
import FollowInfoModal from '$lib/app/main/modals/FollowInfoModal.svelte';
import JoinCommunityModal from '$lib/app/main/modals/JoinCommunityModal.svelte';
import JoinFronvoModal from '$lib/app/main/modals/JoinFronvoModal.svelte';
import JoinRequestsModal from '$lib/app/main/modals/JoinRequestsModal.svelte';
import LeaveCommunityModal from '$lib/app/main/modals/LeaveCommunityModal.svelte';
import MaxOnlineTimeModal from '$lib/app/main/modals/MaxOnlineTimeModal.svelte';
import PostModal from '$lib/app/main/modals/PostModal.svelte';
import SettingsModal from '$lib/app/main/modals/SettingsModal.svelte';
import CommunitiesPanel from '$lib/app/main/panels/CommunitiesPanel.svelte';
import HomePanel from '$lib/app/main/panels/HomePanel.svelte';
import ProfilePanel from '$lib/app/main/panels/ProfilePanel.svelte';
import type {
    AccountPost,
    HomePost,
    FronvoAccount,
    CommunityMessage,
} from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

export const loginSucceeded = writable();

// Panel settings
export const panels = [HomePanel, ProfilePanel, CommunitiesPanel];

export const currentPanelId = writable(0);

// Modal settings
export const modals = [
    SettingsModal,
    FollowInfoModal,
    EditProfileModal,
    CreatePostModal,
    PostModal,
    FindProfilesModal,
    MaxOnlineTimeModal,
    CreateCommunityModal,
    JoinCommunityModal,
    FindCommunitiesModal,
    LeaveCommunityModal,
    CommunityMembers,
    EditCommunityModal,
    EditCommunityMemberModal,
    ConfirmDeleteMessageModal,
    JoinRequestsModal,
    EditJoinRequestModal,
    DeletePostModal,
    JoinFronvoModal,
];

// Dropdown settings
export const dropdowns = [CommunityOptionsDropdown, PostOptionsDropdown];

// General Modal settings
export const currentModalId = writable(0);
export const modalVisible = writable(false);
export const modalAnimDuration = 300;

// FollowModal
export const followModalInfo: Writable<string[]> = writable();
export const followModalForFollowing: Writable<boolean> = writable();

// PostModal
export const postModalIndex: Writable<number> = writable();
export const postModalInfo: Writable<AccountPost | HomePost> = writable();
export const postModalForHome: Writable<boolean> = writable();

// CommunityMemberModal
export const targetCommunityMember: Writable<FronvoAccount> = writable();

// ConfirmDeleteMessageModal
export const targetConfirmCommunityMessage: Writable<CommunityMessage> =
    writable();

// JoinRequestModal
export const targetJoinRequestEmail: Writable<string> = writable();

// General Dropdown settings
export const currentDropdownId = writable(0);
export const dropdownVisible = writable(false);
export const dropdownAnimDuration = 350;
export const dropdownPosition = writable([0, 0]);

// Loading
export const progressBarVisible = writable(false);
