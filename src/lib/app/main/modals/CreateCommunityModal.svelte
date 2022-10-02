<script lang="ts">
    import { goto } from '$app/navigation';
    import {
        chatRequestAccepted,
        joinedCommunity,
    } from 'stores/app/communities';

    import { socket } from 'stores/global';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { dismissModal } from 'utilities/app/main';

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
            ({ communityData, err }) => {
                if (err) {
                    errorMessage = err.msg;
                    isCreating = false;

                    return;
                }

                // Update, new community data
                $joinedCommunity = communityData;
                $chatRequestAccepted = true;

                goto(`/community/${communityData.communityId}`, {
                    replaceState: true,
                });

                dismissModal();
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
</script>

<div class="create-container">
    <div class="header-container">
        <h1 id="header">Create Community</h1>
    </div>

    <hr />

    <div class="data-container">
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
    </div>

    <div class="options-container">
        <button on:click={createCommunity}>Create</button>

        <button
            on:click={() => {
                if (!isCreating) dismissModal();
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

    .data-container #icon-preview {
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
