<script lang="ts">
    import { dismissModal, setProgressBar } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import type { AccountPost } from 'interfaces/all';
    import { ourData } from 'stores/profile';
    import { loadOurProfile, loadTargetProfile } from 'utilities/profile';
    import Post from '$lib/app/reusables/all/Post.svelte';
    import { postModalInfo, type ModalData } from 'stores/modals';
    import { cachedAccountData, socket } from 'stores/main';

    let isDeleting = false;
    const postData = $postModalInfo as AccountPost;

    function deletePost(): void {
        if (isDeleting) return;

        isDeleting = true;
        setProgressBar(true);

        socket.emit(
            'deletePost',
            { postId: ($postModalInfo as AccountPost).postId },
            async ({ err }) => {
                if (!err) {
                    await loadOurProfile($cachedAccountData);

                    await loadTargetProfile(
                        $ourData.profileId,
                        $cachedAccountData
                    );
                    dismissModal();
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
                danger: true,
            },
            {
                title: 'No, keep',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <Post {postData} profileData={$ourData} hideOptions isPreview />
</ModalTemplate>
