// ******************** //
// Shared variables for the app profile panel, after login.
// ******************** //

import type { AccountPost, FronvoAccount } from 'interfaces/app/main';
import type { Community } from 'src/interfaces/app/communities';
import { writable, type Writable } from 'svelte/store';

export const targetProfile: Writable<string> = writable();
export const userData: Writable<FronvoAccount> = writable();
export const userPosts: Writable<AccountPost[]> = writable();
export const userCommunity: Writable<Community> = writable();
export const profileLoadingFinished: Writable<boolean> = writable(false);
