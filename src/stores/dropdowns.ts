import AccountDropdown from '$lib/app/main/dropdowns/AccountDropdown.svelte';
import AccountExtrasDropdown from '$lib/app/main/dropdowns/AccountExtrasDropdown.svelte';
import BanDropdown from '$lib/app/main/dropdowns/BanDropdown.svelte';
import ChannelDropdown from '$lib/app/main/dropdowns/ChannelDropdown.svelte';
import DmDropdown from '$lib/app/main/dropdowns/DMDropdown.svelte';
import FriendDropdown from '$lib/app/main/dropdowns/FriendDropdown.svelte';
import ImageDropdown from '$lib/app/main/dropdowns/ImageDropdown.svelte';
import MemberDropdown from '$lib/app/main/dropdowns/MemberDropdown.svelte';
import MessageDropdown from '$lib/app/main/dropdowns/MessageDropdown.svelte';
import PendingDropdown from '$lib/app/main/dropdowns/PendingDropdown.svelte';
import PostDropdown from '$lib/app/main/dropdowns/PostDropdown.svelte';
import ServerSettingsDropdown from '$lib/app/main/dropdowns/ServerSettingsDropdown.svelte';
import ServerTempSettingsDropdown from '$lib/app/main/dropdowns/ServerTempSettingsDropdown.svelte';
import type { FronvoAccount, Room } from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

/****************************** Dropdowns ******************************/
export const dropdowns = [
    ServerSettingsDropdown,
    PostDropdown,
    ChannelDropdown,
    FriendDropdown,
    ServerTempSettingsDropdown,
    DmDropdown,
    ImageDropdown,
    PendingDropdown,
    MessageDropdown,
    AccountDropdown,
    AccountExtrasDropdown,
    MemberDropdown,
    BanDropdown,
];
/****************************** Dropdowns ******************************/

/****************************** Dropdown Exports ******************************/
export enum DropdownTypes {
    ServerSettings,
    Post,
    Channel,
    Friend,
    ServerTempSettings,
    DM,
    Image,
    Pending,
    Message,
    Account,
    AccountExtras,
    Member,
    Ban,
}

export interface DropdownActions {
    title: string;
    callback: () => void;
    condition?: boolean;
    icon?: any;
    justifyStart?: boolean;
}
/****************************** Dropdown Exports ******************************/

/****************************** Dropdown settings ******************************/
export const currentDropdownId = writable(0);
export const dropdownVisible = writable(false);
export const dropdownAnimationFinished = writable(false);
export const dropdownPosition = writable([0, 0]);
/****************************** Dropdown settings ******************************/

/****************************** DMDropdown ******************************/
export const dropdownProfileData: Writable<FronvoAccount> = writable();
export const dropdownDMRoom: Writable<Room> = writable();
/****************************** DMDropdown ******************************/
