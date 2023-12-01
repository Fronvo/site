import type { Post } from 'interfaces/all';
import { writable, type Writable } from 'svelte/store';
import { DashboardOptions } from 'types/all';

/****************************** Dashboard ******************************/
export const totalDashboardPosts = writable(-1);
export const dashboardPosts: Writable<Post[]> = writable();

export const totalOurPosts = writable(-1);
export const ourPosts: Writable<Post[]> = writable();

export const activeDashboardTab: Writable<DashboardOptions> = writable(
    DashboardOptions.Dashboard
);
/****************************** Dashboard ******************************/
