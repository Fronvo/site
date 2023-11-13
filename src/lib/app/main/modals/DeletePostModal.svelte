<script lang="ts">
    import { cachedAccountData, socket } from 'stores/main';
    import { type ModalData, targetPostModal } from 'stores/modals';
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { loadProfile } from 'utilities/profile';
    import Post from '$lib/app/reusables/all/Post.svelte';
    import { homePosts } from 'stores/home';
    import { loadHomePosts } from 'utilities/home';

    function deletePost(): void {
        // Will recieve result in RoomChat listener if successful

        socket.emit(
            'deletePost',
            {
                postId: $targetPostModal.post.postId,
            },
            async ({ err }) => {
                if (err) return;

                loadProfile($cachedAccountData);

                if ($homePosts.includes($targetPostModal)) {
                    $homePosts = [];

                    loadHomePosts();
                }

                dismissModal();
            }
        );
    }

    const data: ModalData = {
        title: 'Delete post',
        actions: [
            {
                title: 'Delete',
                callback: deletePost,
                danger: true,
            },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <Post post={$targetPostModal} small preview />
</ModalTemplate>
