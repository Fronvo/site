import type { HomePost } from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

/****************************** Home ******************************/
export const totalHomePosts = writable(-1);
export const homePosts: Writable<HomePost[]> = writable();
/****************************** Home ******************************/
