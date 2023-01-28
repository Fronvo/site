<script lang="ts">
    import { socket } from 'stores/all';
    import { ourProfileData, userData, userPosts } from 'stores/profile';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import type { ModalData } from 'types/main';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    let title: string;
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
                title,
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

                // Update, new posts
                socket.emit(
                    'fetchProfilePosts',
                    {
                        profileId: $ourProfileData.profileId,
                        from: '0',
                        // Including newer post
                        to: ($userPosts.length + 1).toString(),
                    },
                    ({ profilePosts }) => {
                        $userPosts = profilePosts;
                        $userData.totalPosts += 1;
                        dismissModal();
                    }
                );
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
        <h1 id="error-header" in:fade={{ duration: 500 }}>
            {errorMessage}
        </h1>
    {/if}

    <h1 id="input-header">Title</h1>
    <!-- svelte-ignore a11y-autofocus -->
    <input autofocus bind:value={title} maxlength={30} />

    <h1 id="input-header">Content</h1>
    <textarea bind:value={content} maxlength={256} rows={6} />

    <!-- Just for attachment checking, no preview -->
    <img
        id="attachment-preview"
        src={$attachment ? $attachment : ''}
        alt="Post attachment"
        draggable={false}
    />
    <h1 id="input-header" class="attachment-info">Attachment</h1>
    <input bind:value={$attachment} maxlength={256} />
</ModalTemplate>

<style>
    #error-header {
        color: red;
        font-size: 2rem;
        margin: 0;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    #input-header {
        color: var(--profile_info_color);
        margin: 0;
        font-size: 2.2rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    input,
    textarea {
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 100%;
        background: var(--modal_input_bg_color);
    }

    #attachment-preview {
        display: none;
    }

    @media screen and (max-width: 720px) {
        #error-header {
            font-size: 1.7rem;
        }

        #input-header {
            font-size: 1.7rem;
        }

        input,
        textarea {
            font-size: 1.7rem;
        }
    }

    @media screen and (max-width: 520px) {
        #error-header {
            font-size: 1.4rem;
        }

        #input-header {
            font-size: 1.4rem;
        }

        input,
        textarea {
            font-size: 1.4rem;
        }
    }
</style>
