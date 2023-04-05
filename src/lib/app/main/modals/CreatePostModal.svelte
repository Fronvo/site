<script lang="ts">
    import Post from '$lib/app/reusables/all/Post.svelte';
    import type { AccountPost } from 'interfaces/all';
    import { cachedAccountData, socket } from 'stores/main';
    import type { ModalData } from 'stores/modals';
    import { currentPanelId, PanelTypes } from 'stores/panels';
    import { ourData, searchData } from 'stores/profile';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { loadTargetProfile } from 'utilities/profile';
    import ModalTemplate from '../ModalTemplate.svelte';

    let isSharing = false;
    let canShare = true;

    const postData: Writable<AccountPost> = writable({
        author: $ourData.profileId,
        content: '',
        creationDate: new Date().toString(),
        postId: '',
        attachment: '',
    });

    function sharePost(): void {
        if (!canShare || isSharing) return;

        isSharing = true;

        setProgressBar(true);

        socket.emit(
            'createPost',
            {
                content: $postData.content,
                attachment: $postData.attachment,
            },
            async ({ err }) => {
                if (err) {
                    isSharing = false;
                    setProgressBar(false);

                    return;
                }

                if (
                    $searchData?.profileId == $ourData.profileId &&
                    $currentPanelId == PanelTypes.Profile
                ) {
                    loadTargetProfile($ourData.profileId, $cachedAccountData);
                }

                dismissModal();
            }
        );
    }

    onMount(() => {
        const attachmentPreview: HTMLImageElement = document.getElementById(
            'attachment-preview'
        ) as HTMLImageElement;

        attachmentPreview.onerror = () => {
            if ($postData.attachment == '') return;

            canShare = false;
        };

        postData.subscribe(({ attachment }) => {
            if (attachment == undefined) return;

            // Allow empty avatar url, reset it
            if (attachment == '') {
                canShare = true;
            }

            // Check for avatar https, perform some client side validation on our own
            else if (!attachment.match(/^(https:\/\/).+$/)) {
                canShare = false;
            } else if (!canShare) {
                canShare = true;
            }
        });
    });

    const data: ModalData = {
        title: 'Create Post',

        actions: [
            {
                title: 'Share',
                callback: sharePost,
            },
            {
                title: 'Discard',
                callback: dismissModal,
            },
        ],

        useSecondaryHr: true,
    };
</script>

<ModalTemplate {data}>
    <Post
        profileData={$ourData}
        bind:postData={$postData}
        hideOptions
        isPreview
        isShare
    />

    <img
        id="attachment-preview"
        src={$postData.attachment ? $postData.attachment : ''}
        alt="Post attachment"
        draggable={false}
    />

    <input
        placeholder="Attachment URL"
        class="modal-input"
        bind:value={$postData.attachment}
        maxlength={256}
    />
</ModalTemplate>

<style>
    #attachment-preview {
        display: none;
    }
</style>
