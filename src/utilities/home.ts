import { totalHomePosts, homePosts as posts } from 'stores/home';
import { socket } from 'stores/main';
import { getKey } from './global';

export async function loadHomePosts(): Promise<void> {
    return new Promise((resolve) => {
        socket.emit(
            getKey('token') ? 'fetchHomePosts' : 'fetchHomePostsGuest',
            { from: '0', to: '15' },
            ({ homePosts, totalPosts }) => {
                totalHomePosts.set(totalPosts);
                posts.set(homePosts);

                resolve();
            }
        );
    });
}
