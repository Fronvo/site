import type { Post } from 'interfaces/all';
import {
    totalDashboardPosts,
    dashboardPosts as dashPosts,
    ourPosts,
    totalOurPosts,
} from 'stores/dashboard';
import { socket } from 'stores/main';

export async function loadHomePosts(): Promise<Post[]> {
    return new Promise((resolve) => {
        socket.emit(
            'fetchDashboard',
            { from: '0', to: '20' },
            ({ dashboard, totalPosts }) => {
                totalDashboardPosts.set(totalPosts);
                dashPosts.set(dashboard);

                resolve(dashboard);
            }
        );
    });
}

export async function loadOurPosts(profileId: string): Promise<Post[]> {
    return new Promise((resolve) => {
        socket.emit(
            'fetchProfilePosts',
            { profileId, from: '0', to: '20' },
            ({ profilePosts, totalPosts }) => {
                totalOurPosts.set(totalPosts);
                ourPosts.set(profilePosts);

                resolve(profilePosts);
            }
        );
    });
}
