<script lang="ts">
    import { socket } from 'stores/all';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { dismissModal } from 'utilities/main';
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
            iconPreview.src = '/svgs/profile/default.svg';
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

        extraStyling: ['width: 50%'],
        removeTransparency: true,
    };
</script>

<ModalTemplate {data}>
    {#if errorMessage}
        <h1 id="error-header" in:fade={{ duration: 500 }}>
            {errorMessage}
        </h1>
    {/if}

    <h1 id="input-header">Name</h1>
    <!-- svelte-ignore a11y-autofocus -->
    <input autofocus bind:value={name} maxlength={15} />

    <h1 id="input-header">Description</h1>
    <textarea bind:value={description} maxlength={50} rows={4} />

    <!-- Just for attachment checking, no preview -->
    <img
        id="icon-preview"
        src={$icon ? $icon : ''}
        alt="Community icon"
        draggable={false}
    />

    <h1 id="input-header" class="icon-info">H</h1>
    <input bind:value={$icon} maxlength={256} />
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
        width: 95%;
        background: var(--modal_input_bg_color);
    }

    #icon-preview {
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
