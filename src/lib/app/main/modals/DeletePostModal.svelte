<script lang="ts">
    import { cachedAccountData, socket } from 'stores/main';
    import { type ModalData, targetPostModal } from 'stores/modals';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { toast } from 'svelte-sonner';
    import { loadProfile } from 'utilities/profile';
    import Post from '$lib/app/reusables/all/Post.svelte';

    function deletePost(): void {
        // Will recieve result in RoomChat listener if successful
        setProgressBar(true);

        socket.emit(
            'deletePost',
            {
                postId: $targetPostModal.post.postId,
            },
            async ({ err }) => {
                if (err) return;

                loadProfile($cachedAccountData);

                toast('Post deleted');

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
