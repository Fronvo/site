<script lang="ts">
    import { dismissModal, showModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { ModalTypes, type ModalData, modalLoading } from 'stores/modals';
    import { isMobile, socket } from 'stores/main';
    import { onMount } from 'svelte';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';

    let element: HTMLInputElement;

    let errorMessage: string;
    let profileId: string;

    function addFriend(): void {
        if (!profileId || $modalLoading) return;

        if (profileId.trim().length == 0) {
            return;
        }

        // Custom errors to prettify
        if (profileId.length < 5) {
            errorMessage = 'Must be atleast 5 characters.';
            return;
        }

        $modalLoading = true;

        socket.emit(
            'addFriend',
            { profileId: profileId ? profileId.toLowerCase() : '' },
            ({ err }) => {
                if (err) {
                    // Prettify
                    if (err.name == 'INVALID_REGEX') {
                        errorMessage =
                            'Identifier contains invalid characters.';
                    } else if (err.name == 'OVER_FRIENDS_LIMIT') {
                        showModal(ModalTypes.MaxFriends);
                    } else {
                        errorMessage = err.msg;

                        $modalLoading = false;
                    }
                } else {
                    dismissModal();
                }
            }
        );
    }

    onMount(() => {
        element.focus();

        element.onkeyup = (ev) => {
            if (ev.key == 'Enter') {
                addFriend();
            }
        };
    });

    const data: ModalData = {
        title: 'Add a friend',
        actions: [
            {
                title: 'Send request',
                callback: addFriend,
                primary: true,
            },

            {
                title: 'Cancel',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <ErrorHeader size={'1.2rem'} {errorMessage} />

    <div class={`friend-container ${$isMobile ? 'mobile' : ''}`}>
        <h1 class="modal-header">@</h1>
        <input
            bind:this={element}
            class="modal-input"
            bind:value={profileId}
            maxlength={20}
        />
    </div>
</ModalTemplate>

<style>
    .friend-container {
        display: flex;
        align-items: center;
    }

    h1 {
        font-size: 1.7rem;
        height: 50px;
    }

    input {
        border: 2px solid transparent;
        transition: 150ms;
        font-weight: 500;
    }

    input:focus {
        border: 2px solid white;
    }

    .mobile input {
        width: 70vw;
    }
</style>
