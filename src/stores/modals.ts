import EditProfileModal from '$lib/app/main/modals/EditProfileModal.svelte';
import DeleteMessageModal from '$lib/app/main/modals/DeleteMessageModal.svelte';

import type {
    RoomMessage,
    FronvoAccount,
    Post,
    Theme,
    Channel,
} from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';
import ProfileModal from '$lib/app/main/modals/ProfileModal.svelte';
import LogoutModal from '$lib/app/main/modals/LogoutModal.svelte';
import StatusModal from '$lib/app/main/modals/StatusModal.svelte';
import SwitchAccountsModal from '$lib/app/main/modals/SwitchAccountsModal.svelte';
import AddAccountModal from '$lib/app/main/modals/AddAccountModal.svelte';
import AddFriendModal from '$lib/app/main/modals/AddFriendModal.svelte';
import RemoveFriendModal from '$lib/app/main/modals/RemoveFriendModal.svelte';
import ImageModal from '$lib/app/main/modals/ImageModal.svelte';
import RequestDataModal from '$lib/app/main/modals/RequestDataModal.svelte';
import DeleteAccountModal from '$lib/app/main/modals/DeleteAccountModal.svelte';
import GoTurboModal from '$lib/app/main/modals/GoTurboModal.svelte';
import GoPayModal from '$lib/app/main/modals/GoPayModal.svelte';
import MaxFriendsModal from '$lib/app/main/modals/MaxFriendsModal.svelte';
import RefundTurboModal from '$lib/app/main/modals/RefundTurboModal.svelte';
import CreateServerModal from '$lib/app/main/modals/CreateServerModal.svelte';
import MaxServersModal from '$lib/app/main/modals/MaxServersModal.svelte';
import CreateChannelModal from '$lib/app/main/modals/CreateChannelModal.svelte';
import JoinServerModal from '$lib/app/main/modals/JoinServerModal.svelte';
import PendingFriendsModal from '$lib/app/main/modals/PendingFriendsModal.svelte';
import DeletePostModal from '$lib/app/main/modals/DeletePostModal.svelte';
import DeleteChannelModal from '$lib/app/main/modals/DeleteChannelModal.svelte';
import InvitePeopleModal from '$lib/app/main/modals/InvitePeopleModal.svelte';
import SharePostModal from '$lib/app/main/modals/SharePostModal.svelte';
import LeaveServerModal from '$lib/app/main/modals/LeaveServerModal.svelte';
import KickMemberModal from '$lib/app/main/modals/KickMemberModal.svelte';
import BanMemberModal from '$lib/app/main/modals/BanMemberModal.svelte';
import BannedMembersModal from '$lib/app/main/modals/BannedMembersModal.svelte';
import SendImageModal from '$lib/app/main/modals/SendImageModal.svelte';
import GifModal from '$lib/app/main/modals/GifModal.svelte';

/****************************** Modals ******************************/
export const modals = [
    ProfileModal,
    EditProfileModal,
    DeleteMessageModal,
    LogoutModal,
    StatusModal,
    SwitchAccountsModal,
    AddAccountModal,
    AddFriendModal,
    MaxServersModal,
    RemoveFriendModal,
    ImageModal,
    RequestDataModal,
    DeleteAccountModal,
    GoTurboModal,
    GoPayModal,
    MaxFriendsModal,
    RefundTurboModal,
    CreateServerModal,
    CreateChannelModal,
    JoinServerModal,
    PendingFriendsModal,
    DeletePostModal,
    DeleteChannelModal,
    InvitePeopleModal,
    SharePostModal,
    LeaveServerModal,
    KickMemberModal,
    BanMemberModal,
    BannedMembersModal,
    SendImageModal,
    GifModal,
];
/****************************** Modals ******************************/

/****************************** Modal Exports ******************************/
export enum ModalTypes {
    Profile,
    EditProfile,
    DeleteMessage,
    Logout,
    Status,
    SwitchAccounts,
    AddAccount,
    AddFriend,
    MaxServers,
    RemoveFriend,
    Image,
    RequestData,
    DeleteAccount,
    GoTurbo,
    GoPay,
    MaxFriends,
    RefundTurbo,
    CreateServer,
    CreateChannel,
    JoinServer,
    PendingFriends,
    DeletePost,
    DeleteChannel,
    InvitePeople,
    SharePost,
    LeaveServer,
    KickMember,
    BanMember,
    BannedMembers,
    SendImage,
    Gif,
}

export interface ModalActions {
    title: string;
    callback: () => void;
    condition?: boolean;
    danger?: boolean;
    primary?: boolean;
    useProShadow?: boolean;
}

export interface ModalData {
    title?: string;
    actions?: ModalActions[];
    transparent?: boolean;
    noDecoration?: boolean;
}
/****************************** Modal Exports ******************************/

/****************************** Modal settings ******************************/
export const currentModalId = writable(-1);
export const modalVisible = writable(false);
export const modalAnimDuration = 300;
export const modalLoading = writable(false);
/****************************** Modal settings ******************************/

/****************************** ProfileModal ******************************/
export const targetProfileModal: Writable<FronvoAccount> = writable();
/****************************** ProfileModal ******************************/

/****************************** FriendDropdown, RemoveFriendModal ******************************/
export const targetFriendModal: Writable<FronvoAccount> = writable();
/****************************** FriendDropdown ******************************/

/****************************** KickMemberModal, BanMemberModal ******************************/
export const targetMemberModal: Writable<FronvoAccount> = writable();
/****************************** FriendDropdown ******************************/

/****************************** DeleteMessageModal ******************************/
export const targetMessageModal: Writable<RoomMessage> = writable();
export const targetMessageModalProfile: Writable<FronvoAccount> = writable();
/****************************** DeleteMessageModal ******************************/

/****************************** DeletePostModal ******************************/
export const targetPostModal: Writable<Post> = writable();
/****************************** DeletePostModal ******************************/

/****************************** ChannelDropdown ******************************/
export const targetChannelModal: Writable<Channel> = writable();
/****************************** ChannelDropdown ******************************/

/****************************** ImageModal ******************************/
export const targetImageModal: Writable<string> = writable();
export const sendImageTargetFile: Writable<File> = writable();
/****************************** ImageModal ******************************/

/****************************** TenorModal ******************************/
export const targetTenorCallback: Writable<(url: string) => void> = writable();
/****************************** TenorModal ******************************/

/****************************** DeleteTheme ******************************/
export const targetTheme: Writable<Theme> = writable();
/****************************** DeleteTheme ******************************/
