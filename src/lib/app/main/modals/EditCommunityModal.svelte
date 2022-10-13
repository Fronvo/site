<script lang="ts">
    import { goto } from '$app/navigation';
    import { dismissModal } from 'utilities/main';
    import { socket } from 'stores/all';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { joinedCommunity } from 'stores/communities';
    import Checkbox from 'svelte-checkbox';

    let communityId = $joinedCommunity.communityId;
    let name = $joinedCommunity.name;
    let description = $joinedCommunity.description;
    let icon: Writable<string> = writable($joinedCommunity.icon);
    let inviteOnly = $joinedCommunity.inviteOnly;

    let canUpload = true;
    let isUploading = false;
    let errorMessage: string;

    function uploadData(): void {
        if (!canUpload || isUploading) return;

        isUploading = true;

        const updatedData = {};

        if ($joinedCommunity.communityId != communityId) {
            updatedData['communityId'] = communityId;
        }

        if ($joinedCommunity.name != name) {
            updatedData['name'] = name;
        }

        if ($joinedCommunity.description != description) {
            updatedData['description'] = description;
        }

        if ($joinedCommunity.icon != $icon) {
            updatedData['icon'] = $icon;
        }

        if ($joinedCommunity.inviteOnly != inviteOnly) {
            updatedData['inviteOnly'] = inviteOnly;
        }

        socket.emit(
            'updateCommunityData',
            updatedData,
            ({ err, communityData }) => {
                if (err) {
                    errorMessage = err.msg;
                    isUploading = false;

                    return;
                }

                // Redirect to new community
                if ($joinedCommunity.communityId != communityId) {
                    goto(`/community/${communityId}`, {
                        replaceState: true,
                    });
                }

                $joinedCommunity = { ...$joinedCommunity, ...communityData };

                dismissModal();
            }
        );
    }

    onMount(() => {
        // Provided 404 backup image
        const iconPreview: HTMLImageElement = document.getElementById(
            'icon-preview'
        ) as HTMLImageElement;

        iconPreview.onerror = () => {
            const iconText = document.getElementsByClassName('icon-info')[0];

            iconText.textContent = 'Icon - Invalid URL';

            canUpload = false;
            iconPreview.src = '/svgs/profile/default.svg';
        };

        icon.subscribe((newIcon) => {
            if (newIcon == undefined) return;

            const iconText = document.getElementsByClassName('icon-info')[0];

            // Allow empty avatar url, reset it
            if (newIcon == '') {
                // Reset state
                iconText.textContent = 'Icon';

                canUpload = true;
            }

            // Check for avatar https, perform some client side validation on our own
            else if (!newIcon.match(/^(https:\/\/).+$/)) {
                iconText.textContent = 'Icon - Invalid URL';

                canUpload = false;
            } else if (!canUpload) {
                // Reset state
                iconText.textContent = 'Icon';

                canUpload = true;
            }
        });
    });
</script>

<div class="edit-container">
    <div class="header-container">
        <h1 id="header">Edit Community</h1>
    </div>

    <hr />

    <div class="data-container">
        {#if errorMessage}
            <h1 id="error-header" in:fade={{ duration: 500 }}>
                {errorMessage}
            </h1>
        {/if}

        <h1 id="input-header">Community ID</h1>
        <input bind:value={communityId} maxlength={15} />

        <h1 id="input-header">Name</h1>
        <input bind:value={name} maxlength={15} />

        <h1 id="input-header">Description</h1>
        <textarea
            id="description-input"
            bind:value={description}
            maxlength={50}
            rows={3}
        />

        <div>
            <img
                id="icon-preview"
                src={$icon ? $icon : '/svgs/profile/default.svg'}
                alt="New avatar"
                draggable={false}
            />
            <h1 id="input-header" class="icon-info">Icon</h1>
        </div>

        <input maxlength={512} bind:value={$icon} />

        <div class="centered-container">
            <h1 id="input-header">Invite only</h1>
            <Checkbox
                bind:checked={inviteOnly}
                class="invite-only-checkbox"
                size="2.7rem"
                primaryColor="rgb(180, 120, 255)"
                secondaryColor="white"
            />
        </div>
    </div>

    <div class="options-container">
        <button on:click={uploadData}>Save</button>

        <button
            on:click={() => {
                if (!isUploading) dismissModal();
            }}>Discard</button
        >
    </div>
</div>

<style>
    hr {
        width: 100px;
    }

    .edit-container {
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
    }

    .data-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        width: 40%;
        min-width: 450px;
    }

    .data-container #error-header {
        color: red;
        font-size: 2rem;
        margin: 0;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    .data-container div {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .data-container .centered-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.data-container div .invite-only-checkbox) {
        margin-left: 20px;
    }

    .data-container div #icon-preview {
        width: 64px;
        height: 64px;
        border-radius: 10px;
        margin-right: 10px;
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

    .data-container textarea {
        min-height: 100px;
    }

    .data-container #description-input {
        font-size: 1.7rem;
    }

    .options-container {
        display: flex;
        margin-bottom: 15px;
        margin-top: 10px;
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
            width: 350px;
            min-width: auto;
        }

        .data-container #error-header {
            font-size: 1.7rem;
        }

        .data-container div #icon-preview {
            width: 48px;
            height: 48px;
        }

        :global(.data-container div .invite-only-checkbox) {
            margin-left: 10px;
            padding: 0;
        }

        .data-container #input-header {
            font-size: 1.7rem;
        }

        .data-container input {
            font-size: 1.7rem;
        }

        .data-container #description-input {
            font-size: 1.5rem;
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

        .data-container input {
            font-size: 1.4rem;
        }

        .data-container #description-input {
            font-size: 1.3rem;
        }

        .options-container button {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
