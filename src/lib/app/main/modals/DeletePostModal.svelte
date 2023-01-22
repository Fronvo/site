<script lang="ts">
    import { socket } from 'stores/all';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { postModalIndex, postModalInfo } from 'stores/main';
    import type { AccountPost } from 'interfaces/all';
    import { userData, userPosts } from 'stores/profile';

    let isDeleting = false;

    function deletePost(): void {
        if (isDeleting) return;

        isDeleting = true;
        setProgressBar(true);

        socket.emit(
            'deletePost',
            { postId: ($postModalInfo as AccountPost).postId },
            ({ err }) => {
                if (!err) {
                    dismissModal(() => {
                        $userPosts.splice($postModalIndex, 1);
                        $userPosts = $userPosts;
                        $userData.totalPosts -= 1;
                    });
                } else {
                    isDeleting = false;
                    setProgressBar(false);
                }
            }
        );
    }

    const data: ModalData = {
        title: 'Delete this post?',

        actions: [
            {
                title: 'Yes, delete',
                callback: deletePost,
            },
            {
                title: 'No, keep',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <h1>Delete the selected post?</h1>
</ModalTemplate>

<style>
    h1 {
        font-size: 3rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
    }

    @media screen and (max-width: 720px) {
        h1 {
            font-size: 2rem;
        }
    }

    @media screen and (max-width: 520px) {
        h1 {
            font-size: 1.7rem;
        }
    }
</style>
