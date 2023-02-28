<script lang="ts">
    import { cachedAccountData, socket } from 'stores/main';
    import type { ModalData } from 'stores/modals';
    import { currentPanelId, PanelTypes } from 'stores/panels';
    import { ourData, searchData } from 'stores/profile';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { loadTargetProfile } from 'utilities/profile';
    import ModalTemplate from '../ModalTemplate.svelte';

    let content: string;
    let attachment: Writable<string> = writable('');
    let isSharing = false;
    let canShare = true;
    let errorMessage: string;

    function sharePost(): void {
        if (!canShare || isSharing) return;

        isSharing = true;

        setProgressBar(true);

        socket.emit(
            'createPost',
            {
                content,
                attachment: $attachment,
            },
            async ({ err }) => {
                if (err) {
                    errorMessage = err.msg;
                    isSharing = false;
                    setProgressBar(false);

                    return;
                }

                if (
                    $searchData.profileId == $ourData.profileId &&
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
            if ($attachment == '') return;

            const attachmentText =
                document.getElementsByClassName('attachment-info')[0];

            attachmentText.textContent = 'Attachment - Invalid URL';

            canShare = false;
            attachmentPreview.src = '/svgs/profile/avatar.svg';
        };

        attachment.subscribe((newAttachment) => {
            if (newAttachment == undefined) return;

            const attachmentText =
                document.getElementsByClassName('attachment-info')[0];

            // Allow empty avatar url, reset it
            if (newAttachment == '') {
                // Reset state
                attachmentText.textContent = 'Attachment';

                canShare = true;
            }

            // Check for avatar https, perform some client side validation on our own
            else if (!newAttachment.match(/^(https:\/\/).+$/)) {
                attachmentText.textContent = 'Attachment - Invalid URL';

                canShare = false;
            } else if (!canShare) {
                // Reset state
                attachmentText.textContent = 'Attachment';

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

        removeTransparency: true,
    };
</script>

<ModalTemplate {data}>
    {#if errorMessage}
        <h1 class="modal-error-header modal-header" in:fade={{ duration: 500 }}>
            {errorMessage}
        </h1>
    {/if}

    <h1 class="modal-header">Content</h1>
    <textarea
        class="modal-input"
        bind:value={content}
        maxlength={256}
        rows={6}
    />

    <!-- Just for attachment checking, no preview -->
    <img
        id="attachment-preview"
        src={$attachment ? $attachment : ''}
        alt="Post attachment"
        draggable={false}
    />
    <h1 class="modal-header attachment-info">Attachment</h1>
    <input class="modal-input" bind:value={$attachment} maxlength={256} />
</ModalTemplate>

<style>
    #attachment-preview {
        display: none;
    }
</style>
