import type { Post } from 'interfaces/all';
import { totalHomePosts, homePosts as posts } from 'stores/home';
import { socket } from 'stores/main';

export async function loadHomePosts(): Promise<Post[]> {
    return new Promise((resolve) => {
        socket.emit(
            'fetchHomePosts',
            { from: '0', to: '20' },
            ({ homePosts, totalPosts }) => {
                totalHomePosts.set(totalPosts);
                posts.set(homePosts);

                resolve(homePosts);
            }
        );
    });
}
