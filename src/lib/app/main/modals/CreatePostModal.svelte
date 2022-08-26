<script lang="ts">
    import { modalVisible } from 'stores/app/main';
    import { targetProfile } from 'stores/app/profile';
    import { socket } from 'stores/global';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { loadProfilePosts } from 'utilities/app/profile';

    let title: string;
    let content: string;
    let attachment: Writable<string> = writable('');
    let isSharing = false;
    let canShare = true;
    let errorMessage: string;

    function sharePost(): void {
        if (!canShare || isSharing) return;

        isSharing = true;

        socket.emit(
            'createPost',
            {
                title,
                content,
                attachment: $attachment,
            },
            ({ err }) => {
                if (err) {
                    errorMessage = err.msg;
                    isSharing = false;

                    return;
                }

                // Update, new posts
                loadProfilePosts($targetProfile);

                $modalVisible = false;
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
            attachmentPreview.src = 'svgs/profile/default.svg';
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
</script>

<div class="create-container">
    <div class="header-container">
        <h1 id="header">Create Post</h1>
    </div>

    <hr />

    <div class="data-container">
        {#if errorMessage}
            <h1 id="error-header" in:fade={{ duration: 500 }}>
                {errorMessage}
            </h1>
        {/if}

        <h1 id="input-header">Title</h1>
        <!-- svelte-ignore a11y-autofocus -->
        <input autofocus bind:value={title} maxlength={30} />

        <h1 id="input-header">Content</h1>
        <textarea bind:value={content} maxlength={128} rows={6} />

        <!-- Just for attachment checking, no preview -->
        <img
            id="attachment-preview"
            src={$attachment ? $attachment : ''}
            alt="Post attachment"
            draggable={false}
        />
        <h1 id="input-header" class="attachment-info">Attachment</h1>
        <input bind:value={$attachment} maxlength={256} />
    </div>

    <div class="options-container">
        <button on:click={sharePost}>Share</button>

        <button
            on:click={() => {
                if (!isSharing) $modalVisible = false;
            }}>Discard</button
        >
    </div>
</div>

<style>
    hr {
        width: 100px;
    }

    .create-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
        overflow-y: auto;
    }

    .header-container {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .header-container #header {
        font-size: 3rem;
        margin: 0;
        padding-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .data-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        width: 50%;
        min-width: 500px;
    }

    .data-container #error-header {
        color: red;
        font-size: 2rem;
        margin: 0;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    .data-container #input-header {
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

    .data-container input,
    .data-container textarea {
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 95%;
        background: var(--modal_input_bg_color);
    }

    .data-container #attachment-preview {
        display: none;
    }

    .options-container {
        display: flex;
        margin-bottom: 15px;
        margin-top: 50px;
    }

    .options-container button {
        font-size: 2.2rem;
        margin-right: 20px;
    }

    @media screen and (max-width: 720px) {
        .header-container #header {
            font-size: 2.4rem;
        }

        .data-container {
            width: 400px;
            min-width: auto;
        }

        .data-container #error-header {
            font-size: 1.7rem;
        }

        .data-container #input-header {
            font-size: 1.7rem;
        }

        .data-container input,
        .data-container textarea {
            font-size: 1.7rem;
        }

        .options-container button {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2rem;
        }

        .data-container {
            width: 300px;
        }

        .data-container #error-header {
            font-size: 1.4rem;
        }

        .data-container #input-header {
            font-size: 1.4rem;
        }

        .data-container input,
        .data-container textarea {
            font-size: 1.4rem;
        }

        .options-container button {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
