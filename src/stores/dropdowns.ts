import ProfileDropdown from '$lib/app/main/dropdowns/ProfileDropdown.svelte';
import TenorDropdown from '$lib/app/main/dropdowns/TenorDropdown.svelte';
import type { FronvoAccount } from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

/****************************** Dropdowns ******************************/
export const dropdowns = [ProfileDropdown, TenorDropdown];
/****************************** Dropdowns ******************************/

/****************************** Dropdown Exports ******************************/
export enum DropdownTypes {
    Profile,
    Gif,
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
/****************************** DMDropdown ******************************/

/****************************** ProfileDropdown ******************************/
export const dropdownForAccountInfo: Writable<boolean> = writable(false);
/****************************** ProfileDropdown ******************************/
