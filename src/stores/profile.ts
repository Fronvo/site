// ******************** //
// Shared variables for the app profile panel, after login.
// ******************** //

import type { AccountPost, FronvoAccount } from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

/****************************** Our profile data ******************************/
export const ourData: Writable<FronvoAccount> = writable();
export const ourPosts: Writable<AccountPost[]> = writable([]);
/****************************** Our profile data ******************************/

/****************************** Search profile data ******************************/
export const pendingSearchId: Writable<string> = writable();
export const searchData: Writable<FronvoAccount> = writable();
export const searchPosts: Writable<AccountPost[]> = writable();
/****************************** Search profile data ******************************/
