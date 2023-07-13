import EditProfileModal from '$lib/app/main/modals/EditProfileModal.svelte';
import DeleteMessageModal from '$lib/app/main/modals/DeleteMessageModal.svelte';

import type { RoomMessage, FronvoAccount } from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';
import CreateRoomModal from '$lib/app/main/modals/CreateRoomModal.svelte';
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

/****************************** Modals ******************************/
export const modals = [
    ProfileModal,
    EditProfileModal,
    CreateRoomModal,
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
];
/****************************** Modals ******************************/

/****************************** Modal Exports ******************************/
export enum ModalTypes {
    Profile,
    EditProfile,
    CreateRoom,
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
}

export interface ModalActions {
    title: string;
    callback: () => void;
    danger?: boolean;
    primary?: boolean;
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

/****************************** ImageModal ******************************/
export const targetImageModal: Writable<string> = writable();
/****************************** ImageModal ******************************/
