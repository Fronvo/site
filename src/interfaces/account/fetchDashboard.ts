// ******************** //
// Interfaces for the fetchDashboard event file.
// ******************** //

import type { FronvoError, Post } from 'interfaces/all';

export interface FetchDashboardParams {
    from: string;
    to: string;
}

export interface FetchDashboardResult extends FronvoError {
    totalPosts: number;
    dashboard: Post[];
}
