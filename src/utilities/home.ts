// ******************** //
// Reusable functions for the app home panel.
// ******************** //

import { socket } from 'stores/all';
import { homePosts as homePostsStore } from 'stores/home';

export async function loadHomePosts(): Promise<void> {
    socket.emit('fetchHomePosts', ({ homePosts }) => {
        homePostsStore.set(homePosts);
    });
}
