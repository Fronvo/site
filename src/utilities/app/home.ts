// ******************** //
// Reusable functions for the app home panel.
// ******************** //

import { socket } from 'stores/global';
import { homePosts as homePostsStore } from 'stores/app/home';

export async function loadHomePosts(): Promise<void> {
    socket.emit('fetchHomePosts', ({ homePosts }) => {
        homePostsStore.set(homePosts);
    });
}
