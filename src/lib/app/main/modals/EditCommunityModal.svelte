<script lang="ts">
    import { goto } from '$app/navigation';
    import { dismissModal, setProgressBar } from 'utilities/main';
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
        setProgressBar(true);

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
                    setProgressBar(false);

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
                setProgressBar(false);
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
        noSeperator: true,

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
        <h1 class="modal-error-header modal-header" in:fade={{ duration: 500 }}>
            {errorMessage}
        </h1>
    {/if}

    <h1 class="modal-header">Community ID</h1>
    <input class="modal-input" bind:value={communityId} maxlength={15} />

    <h1 class="modal-header">Name</h1>
    <input class="modal-input" bind:value={name} maxlength={15} />

    <h1 class="modal-header">Description</h1>
    <textarea
        class="modal-input"
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
        <h1 class="modal-header icon-info">Icon</h1>
    </div>

    <input class="modal-input" maxlength={512} bind:value={$icon} />

    <div class="centered-container">
        <h1 class="modal-header">Invite only</h1>
        <Checkbox
            bind:checked={inviteOnly}
            class="checkbox"
            size="2.7rem"
            primaryColor="var(--modal_checkbox_primary_color)"
            secondaryColor="var(--modal_checkbox_secondary_color)"
        />
    </div>
</ModalTemplate>

<style>
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

    div #icon-preview {
        width: 64px;
        height: 64px;
        border-radius: 10px;
        margin-right: 10px;
    }

    @media screen and (max-width: 720px) {
        div #icon-preview {
            width: 48px;
            height: 48px;
        }
    }
</style>
