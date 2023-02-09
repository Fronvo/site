<script lang="ts">
    import { socket } from 'stores/all';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { loadCommunitiesPanel } from 'utilities/communities';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    let name: string;
    let description: string;
    let icon: Writable<string> = writable('');
    let isCreating = false;
    let canCreate = true;
    let errorMessage: string;

    function createCommunity(): void {
        if (!canCreate || isCreating) return;

        isCreating = true;

        setProgressBar(true);

        socket.emit(
            'createCommunity',
            {
                name,
                description,
                icon: $icon,
            },
            async ({ err }) => {
                if (err) {
                    errorMessage = err.msg;
                    isCreating = false;

                    return;
                }

                dismissModal();

                await loadCommunitiesPanel();
            }
        );
    }

    onMount(() => {
        const iconPreview: HTMLImageElement = document.getElementById(
            'icon-preview'
        ) as HTMLImageElement;

        iconPreview.onerror = () => {
            if ($icon == '') return;

            const attachmentText =
                document.getElementsByClassName('icon-info')[0];

            attachmentText.textContent = 'Icon - Invalid URL';

            canCreate = false;
            iconPreview.src = '/svgs/profile/avatar.svg';
        };

        icon.subscribe((newIcon) => {
            if (newIcon == undefined) return;

            const iconText = document.getElementsByClassName('icon-info')[0];

            // Allow empty avatar url, reset it
            if (newIcon == '') {
                // Reset state
                iconText.textContent = 'Icon';

                canCreate = true;
            }

            // Check for avatar https, perform some client side validation on our own
            else if (!newIcon.match(/^(https:\/\/).+$/)) {
                iconText.textContent = 'Icon - Invalid URL';

                canCreate = false;
            } else if (!canCreate) {
                // Reset state
                iconText.textContent = 'Icon';

                canCreate = true;
            }
        });
    });

    const data: ModalData = {
        title: 'Create Community',

        actions: [
            {
                title: 'Create',
                callback: createCommunity,
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

    <h1 class="modal-header">Name</h1>
    <!-- svelte-ignore a11y-autofocus -->
    <input class="modal-input" autofocus bind:value={name} maxlength={15} />

    <h1 class="modal-header">Description</h1>
    <textarea
        class="modal-input"
        bind:value={description}
        maxlength={50}
        rows={4}
    />

    <!-- Just for attachment checking, no preview -->
    <img
        id="icon-preview"
        src={$icon ? $icon : ''}
        alt="Community icon"
        draggable={false}
    />

    <h1 class="modal-header icon-info">H</h1>
    <input class="modal-input" bind:value={$icon} maxlength={256} />
</ModalTemplate>

<style>
    #icon-preview {
        display: none;
    }
</style>
