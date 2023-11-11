import type { Post } from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';

/****************************** Home ******************************/
export const totalHomePosts = writable(-1);
export const homePosts: Writable<Post[]> = writable();
/****************************** Home ******************************/
