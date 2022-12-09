<script lang="ts">
    import { goto } from '$app/navigation';
    import { dismissModal } from 'utilities/main';
    import { socket } from 'stores/all';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { joinedCommunity } from 'stores/communities';
    import Checkbox from 'svelte-checkbox';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';

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
            iconPreview.src = '/svgs/profile/avatar.svg';
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

    const data: ModalData = {
        title: 'Edit Community',

        actions: [
            {
                title: 'Save',
                callback: uploadData,
            },
            {
                title: 'Discard',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
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
            src={$icon ? $icon : '/svgs/profile/avatar.svg'}
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
            primaryColor="var(--modal_checkbox_primary_color)"
            secondaryColor="var(--modal_checkbox_secondary_color)"
        />
    </div>
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

    div {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .centered-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(div .invite-only-checkbox) {
        margin-left: 20px;
    }

    div #icon-preview {
        width: 64px;
        height: 64px;
        border-radius: 10px;
        margin-right: 10px;
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
        width: 95%;
        background: var(--modal_input_bg_color);
    }

    textarea {
        min-height: 100px;
    }

    #description-input {
        font-size: 1.7rem;
    }

    @media screen and (max-width: 720px) {
        #error-header {
            font-size: 1.7rem;
        }

        div #icon-preview {
            width: 48px;
            height: 48px;
        }

        :global(div .invite-only-checkbox) {
            margin-left: 10px;
            padding: 0;
        }

        #input-header {
            font-size: 1.7rem;
        }

        input {
            font-size: 1.7rem;
        }

        #description-input {
            font-size: 1.5rem;
        }
    }

    @media screen and (max-width: 520px) {
        #error-header {
            font-size: 1.4rem;
        }

        #input-header {
            font-size: 1.4rem;
        }

        input {
            font-size: 1.4rem;
        }

        #description-input {
            font-size: 1.3rem;
        }
    }
</style>
