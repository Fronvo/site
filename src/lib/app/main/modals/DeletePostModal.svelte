<script lang="ts">
    import Message from '$lib/app/reusables/rooms/Message.svelte';
    import { socket } from 'stores/main';
    import {
        targetMessageModal,
        targetMessageModalProfile,
        type ModalData,
        modalLoading,
        targetPostModal,
    } from 'stores/modals';
    import { dismissModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { currentChannel, currentRoomData } from 'stores/rooms';
    import PostDashboard from '$lib/app/reusables/dashboard/PostDashboard.svelte';

    function deletePost(): void {
        $modalLoading = true;

        socket.emit(
            'deletePost',
            {
                postId: $targetPostModal.post.postId,
            },
            async ({ err }) => {
                if (err) {
                    $modalLoading = false;
                } else {
                    dismissModal();
                }
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
    <PostDashboard post={$targetPostModal} isPreview />
</ModalTemplate>
