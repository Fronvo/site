import EditProfileModal from '$lib/app/main/modals/EditProfileModal.svelte';
import DeleteMessageModal from '$lib/app/main/modals/DeleteMessageModal.svelte';

import type { RoomMessage, FronvoAccount, Post, Theme } from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';
import LeaveRoomModal from '$lib/app/main/modals/LeaveRoomModal.svelte';
import ProfileModal from '$lib/app/main/modals/ProfileModal.svelte';
import LogoutModal from '$lib/app/main/modals/LogoutModal.svelte';
import StatusModal from '$lib/app/main/modals/StatusModal.svelte';
import SwitchAccountsModal from '$lib/app/main/modals/SwitchAccountsModal.svelte';
import AddAccountModal from '$lib/app/main/modals/AddAccountModal.svelte';
import AddFriendModal from '$lib/app/main/modals/AddFriendModal.svelte';
import MaxRoomsModal from '$lib/app/main/modals/MaxRoomsModal.svelte';
import RemoveFriendModal from '$lib/app/main/modals/RemoveFriendModal.svelte';
import AddMembersModal from '$lib/app/main/modals/AddMembersModal.svelte';
import ImageModal from '$lib/app/main/modals/ImageModal.svelte';
import CloseDmModal from '$lib/app/main/modals/CloseDMModal.svelte';
import RemoveMemberModal from '$lib/app/main/modals/RemoveMemberModal.svelte';
import RequestDataModal from '$lib/app/main/modals/RequestDataModal.svelte';
import DeleteAccountModal from '$lib/app/main/modals/DeleteAccountModal.svelte';
import DeletePostModal from '$lib/app/main/modals/DeletePostModal.svelte';
import GoProModal from '$lib/app/main/modals/GoPROModal.svelte';
import GoPayModal from '$lib/app/main/modals/GoPayModal.svelte';
import MaxFriendsModal from '$lib/app/main/modals/MaxFriendsModal.svelte';
import CreateThemeModal from '$lib/app/main/modals/CreateThemeModal.svelte';
import DeleteThemeModal from '$lib/app/main/modals/DeleteThemeModal.svelte';

/****************************** Modals ******************************/
export const modals = [
    ProfileModal,
    EditProfileModal,
    LeaveRoomModal,
    DeleteMessageModal,
    LogoutModal,
    StatusModal,
    SwitchAccountsModal,
    AddAccountModal,
    AddFriendModal,
    MaxRoomsModal,
    RemoveFriendModal,
    AddMembersModal,
    ImageModal,
    CloseDmModal,
    RemoveMemberModal,
    RequestDataModal,
    DeleteAccountModal,
    DeletePostModal,
    GoProModal,
    GoPayModal,
    MaxFriendsModal,
    CreateThemeModal,
    DeleteThemeModal,
];
/****************************** Modals ******************************/

/****************************** Modal Exports ******************************/
export enum ModalTypes {
    Profile,
    EditProfile,
    LeaveRoom,
    DeleteMessage,
    Logout,
    Status,
    SwitchAccounts,
    AddAccount,
    AddFriend,
    MaxRooms,
    RemoveFriend,
    AddMembers,
    Image,
    CloseDM,
    RemoveMember,
    RequestData,
    DeleteAccount,
    DeletePost,
    GoPRO,
    GoPay,
    MaxFriends,
    CreateTheme,
    DeleteTheme,
}

export interface ModalActions {
    title: string;
    callback: () => void;
    condition?: boolean;
    danger?: boolean;
    primary?: boolean;
    pro?: boolean;
}

export interface ModalData {
    title?: string;
    actions: ModalActions[];
    showCloseOnly?: boolean;
}
/****************************** Modal Exports ******************************/

/****************************** Modal settings ******************************/
export const currentModalId = writable(-1);
export const modalVisible = writable(false);
export const modalAnimDuration = 300;
/****************************** Modal settings ******************************/

/****************************** ProfileModal ******************************/
export const targetProfileModal: Writable<FronvoAccount> = writable();
/****************************** ProfileModal ******************************/

/****************************** DeleteMessageModal ******************************/
export const targetMessageModal: Writable<RoomMessage> = writable();
export const targetMessageModalProfile: Writable<FronvoAccount> = writable();
/****************************** DeleteMessageModal ******************************/

/****************************** DeletePostModal ******************************/
export const targetPostModal: Writable<Post> = writable();
/****************************** DeletePostModal ******************************/

/****************************** ImageModal ******************************/
export const targetImageModal: Writable<string> = writable();
/****************************** ImageModal ******************************/

/****************************** TenorModal ******************************/
export const targetTenorCallback: Writable<(url: string) => void> = writable();
/****************************** TenorModal ******************************/

/****************************** DeleteTheme ******************************/
export const targetTheme: Writable<Theme> = writable();
/****************************** DeleteTheme ******************************/
