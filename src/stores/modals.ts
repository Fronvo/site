import CommunityMembers from '$lib/app/main/modals/CommunityMembers.svelte';
import CreateCommunityModal from '$lib/app/main/modals/CreateCommunityModal.svelte';
import CreatePostModal from '$lib/app/main/modals/CreatePostModal.svelte';
import DeletePostModal from '$lib/app/main/modals/DeletePostModal.svelte';
import EditCommunityModal from '$lib/app/main/modals/EditCommunityModal.svelte';
import EditProfileModal from '$lib/app/main/modals/EditProfileModal.svelte';
import SearchModal from '$lib/app/main/modals/SearchModal.svelte';
import FollowInfoModal from '$lib/app/main/modals/FollowInfoModal.svelte';
import JoinCommunityModal from '$lib/app/main/modals/JoinCommunityModal.svelte';
import JoinFronvoModal from '$lib/app/main/modals/JoinFronvoModal.svelte';
import JoinRequestsModal from '$lib/app/main/modals/JoinRequestsModal.svelte';
import LeaveCommunityModal from '$lib/app/main/modals/LeaveCommunityModal.svelte';
import PostModal from '$lib/app/main/modals/PostModal.svelte';
import ShowBansModal from '$lib/app/main/modals/ShowBansModal.svelte';
import DeleteMessageModal from '$lib/app/main/modals/DeleteMessageModal.svelte';

import type {
    AccountPost,
    CommunityMessage,
    FronvoAccount,
    HomePost,
    JoinRequest,
} from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

/****************************** Modals ******************************/
export const modals = [
    FollowInfoModal,
    EditProfileModal,
    CreatePostModal,
    PostModal,
    SearchModal,
    CreateCommunityModal,
    JoinCommunityModal,
    LeaveCommunityModal,
    CommunityMembers,
    EditCommunityModal,
    DeleteMessageModal,
    JoinRequestsModal,
    DeletePostModal,
    JoinFronvoModal,
    ShowBansModal,
];
/****************************** Modals ******************************/

/****************************** Modal Exports ******************************/
export enum ModalTypes {
    FollowInfo,
    EditProfile,
    CreatePost,
    ViewPost,
    Search,
    CreateCommunity,
    JoinCommunity,
    LeaveCommunity,
    CommunityMembers,
    EditCommunity,
    DeleteMessage,
    JoinRequests,
    DeletePost,
    JoinFronvo,
    ShowBans,
}

export interface ModalActions {
    title: string;
    callback: () => void;
    danger?: boolean;
}

export type ModalSide = 'left' | 'right';

export interface SideModalOptions {
    side: 'left' | 'right';
}

export interface ModalData {
    titlePreSpan?: any;
    titleIcon?: string;
    titleDropdown?: any;
    titleDropdownCondition?: () => boolean;
    titleListener?: () => void;
    titleListenerCondition?: () => boolean;
    title: string;
    actions: ModalActions[];
    removeTransparency?: boolean;
    sideModal?: SideModalOptions;
    useInput?: boolean;
    inputMaxLength?: number;
}
/****************************** Modal Exports ******************************/

/****************************** Modal settings ******************************/
export const currentModalId = writable(-1);
export const modalVisible = writable(false);
export const modalAnimDuration = 300;
export const modalSide: Writable<ModalSide> = writable();
export const modalInput = writable('');
/****************************** Modal settings ******************************/

/****************************** FollowInfoModal ******************************/
export const followModalInfo: Writable<string[]> = writable([]);
export const followModalForFollowing = writable(false);
/****************************** FollowInfoModal ******************************/

/****************************** PostModal ******************************/
export const postModalIndex = writable(-1);
export const postModalInfo: Writable<AccountPost | HomePost> = writable();
export const postModalForHome = writable(false);
/****************************** PostModal ******************************/

/****************************** DeleteMessageModal ******************************/
export const targetMessageModal: Writable<CommunityMessage> = writable();
export const targetMessageModalProfile: Writable<FronvoAccount> = writable();
/****************************** DeleteMessageModal ******************************/

/****************************** JoinRequestsModal ******************************/
export const joinRequests: Writable<JoinRequest[]> = writable([]);
export const targetRequestModal: Writable<string> = writable();
/****************************** JoinRequestsModal ******************************/
