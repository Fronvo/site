import AccountOptionsDropdown from '$lib/app/main/dropdowns/AccountOptionsDropdown.svelte';
import AdminDropdown from '$lib/app/main/dropdowns/AdminDropdown.svelte';
import CommunityDropdown from '$lib/app/main/dropdowns/CommunityDropdown.svelte';
import CommunityMemberDropdown from '$lib/app/main/dropdowns/CommunityMemberDropdown.svelte';
import CommunityMemberUnbanDropdown from '$lib/app/main/dropdowns/CommunityMemberUnbanDropdown.svelte';
import CommunityOptionsDropdown from '$lib/app/main/dropdowns/CommunityOptionsDropdown.svelte';
import ImageDropdown from '$lib/app/main/dropdowns/ImageDropdown.svelte';
import JoinRequestDropdown from '$lib/app/main/dropdowns/JoinRequestDropdown.svelte';
import LinkDropdown from '$lib/app/main/dropdowns/LinkDropdown.svelte';
import PostOptionsDropdown from '$lib/app/main/dropdowns/PostOptionsDropdown.svelte';
import ProfileOptionsDropdown from '$lib/app/main/dropdowns/ProfileOptionsDropdown.svelte';
import SettingsDropdown from '$lib/app/main/dropdowns/SettingsDropdown.svelte';
import type { FronvoAccount } from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

/****************************** Dropdowns ******************************/
export const dropdowns = [
    CommunityOptionsDropdown,
    PostOptionsDropdown,
    CommunityDropdown,
    CommunityMemberDropdown,
    CommunityMemberUnbanDropdown,
    ProfileOptionsDropdown,
    SettingsDropdown,
    AccountOptionsDropdown,
    AdminDropdown,
    ImageDropdown,
    LinkDropdown,
    JoinRequestDropdown,
];
/****************************** Dropdowns ******************************/

/****************************** Dropdown Exports ******************************/
export enum DropdownTypes {
    CommunityOptions,
    PostOptions,
    Community,
    CommunityMember,
    CommunityMemberUnban,
    ProfileOptions,
    Settings,
    AccountOptions,
    Admin,
    Image,
    Link,
    JoinRequest,
}

export interface DropdownActions {
    title: string;
    callback: () => void;
    condition?: boolean;
    useHr?: boolean;
}
/****************************** Dropdown Exports ******************************/

/****************************** Dropdown settings ******************************/
export const currentDropdownId = writable(0);
export const dropdownVisible = writable(false);
export const dropdownAnimDuration = 350;
export const dropdownPosition = writable([0, 0]);
/****************************** Dropdown settings ******************************/

/****************************** Dropdown other ******************************/
export const dropdownImage = writable('');
export const dropdownLink = writable('');
/****************************** Dropdown other ******************************/

/****************************** CommunityMemberDropdown ******************************/
export const targetMemberDropdown: Writable<FronvoAccount> = writable();
/****************************** CommunityMemberDropdown ******************************/
