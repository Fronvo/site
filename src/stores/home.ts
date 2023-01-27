// ******************** //
// Shared variables for the app home panel, after login.
// ******************** //

import type { HomePost } from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

export const totalHomePosts: Writable<number> = writable(0);
export const homePosts: Writable<HomePost[]> = writable();
