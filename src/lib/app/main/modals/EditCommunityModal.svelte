<script lang="ts">
    import { goto } from '$app/navigation';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import Checkbox from 'svelte-checkbox';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { communityData as comData } from 'stores/community';
    import { socket } from 'stores/main';
    import type { ModalData } from 'stores/modals';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';

    let id = $comData.communityId;
    let name = $comData.name;
    let icon: Writable<string> = writable($comData.icon);
    let chatRequests = $comData.chatRequestsEnabled;

    let canUpload = true;
    let isUploading = false;
    let errorMessage: string;

    function uploadData(): void {
        if (!canUpload || isUploading) return;

        isUploading = true;
        setProgressBar(true);

        const updatedData = {};

        if ($comData.communityId != id) {
            updatedData['communityId'] = id;
        }

        if ($comData.name != name) {
            updatedData['name'] = name;
        }

        if ($comData.icon != $icon) {
            updatedData['icon'] = $icon;
        }

        if ($comData.chatRequestsEnabled != chatRequests) {
            updatedData['chatRequestsEnabled'] = chatRequests;
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
                if ($comData.communityId != id) {
                    goto(`/c/${id}`, {
                        replaceState: true,
                    });
                }

                $comData = { ...$comData, ...communityData };

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
            canUpload = false;
            iconPreview.src = '/svgs/profile/avatar.svg';
        };

        icon.subscribe((newIcon) => {
            if (newIcon == undefined) return;

            // Allow empty avatar url, reset it
            if (newIcon == '') {
                canUpload = true;
            }

            // Check for avatar https, perform some client side validation on our own
            else if (!newIcon.match(/^(https:\/\/).+$/)) {
                canUpload = false;
            } else if (!canUpload) {
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

        useSecondaryHr: true,
    };
</script>

<ModalTemplate {data}>
    <ErrorHeader {errorMessage} />

    <h1 class="modal-header">Community ID</h1>
    <input class="modal-input" bind:value={id} maxlength={15} />

    <h1 class="modal-header">Name</h1>
    <input class="modal-input" bind:value={name} maxlength={15} />

    <div>
        <img
            id="icon-preview"
            src={$icon ? $icon : '/svgs/profile/avatar.svg'}
            alt="New avatar"
            draggable={false}
        />
    </div>

    <input class="modal-input" maxlength={512} bind:value={$icon} />

    <div class="modal-center">
        <h1 class="modal-header">Chat requests</h1>
        <Checkbox
            bind:checked={chatRequests}
            class="checkbox"
            size="2.5rem"
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

    div #icon-preview {
        width: 48px;
        height: 48px;
        border-radius: 10px;
        margin-right: 10px;
    }

    @media screen and (max-width: 850px) {
        div #icon-preview {
            width: 40px;
            height: 40px;
        }
    }
</style>
