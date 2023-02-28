<script lang="ts">
    import { socket } from 'stores/main';
    import {
        joinRequests,
        ModalTypes,
        targetRequestModal,
        type ModalData,
    } from 'stores/modals';
    import { onMount } from 'svelte';
    import { dismissModal, setProgressBar, showModal } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    let loadingFinished = false;

    async function loadJoinRequests() {
        setProgressBar(true);

        // Fetch all followed users, notify UI once finished
        socket.emit('listJoinRequests', (res) => {
            $joinRequests = res.joinRequests;

            loadingFinished = true;
            setProgressBar(false);
        });
    }

    function editRequest(accountIndex: number): void {
        dismissModal(() => {
            $targetRequestModal = $joinRequests[accountIndex].email;

            showModal(ModalTypes.EditJoinRequest);
        });
    }

    onMount(async () => {
        await loadJoinRequests();
    });

    const data: ModalData = {
        title: 'Join Requests',

        actions: [
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],

        sideModal: {
            side: 'left',
        },
    };
</script>

<ModalTemplate {data}>
    {#if loadingFinished}
        {#if $joinRequests?.length == 0}
            <h1 class="modal-header">No join requests</h1>
        {:else}
            <div class="join-requests-container">
                {#each $joinRequests as { email }, i}
                    <div on:click={() => editRequest(i)}>
                        <img
                            id="avatar"
                            src={'/svgs/profile/avatar.svg'}
                            alt={`${email}'s avatar`}
                            draggable={false}
                        />
                        <h1 id="email">{email.substring(0, 5)}***</h1>
                    </div>
                {/each}
            </div>
        {/if}
    {/if}
</ModalTemplate>

<style>
    .join-requests-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: auto;
        flex: 1;
    }

    .join-requests-container div {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--accent_bg_color);
        box-shadow: 0 0 5px var(--accent_shadow_color);
        width: 200px;
        margin-top: 15px;
        margin-bottom: 15px;
        margin-right: 10px;
        margin-left: 10px;
        height: min-content;
        border-radius: 10px;
        padding: 10px;
        transition: 400ms background;
        cursor: pointer;
        overflow: hidden;
    }

    .join-requests-container div:hover {
        background-position: right center;
    }

    .join-requests-container div h1 {
        margin: 0;
    }

    .join-requests-container div #email {
        font-size: 2.5rem;
        color: var(--profile_info_color);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .join-requests-container div #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 128px;
        height: 128px;
        border-radius: 10px;
    }

    @media screen and (max-width: 700px) {
        .join-requests-container {
            flex-direction: column;
            justify-content: start;
            flex-wrap: nowrap;
        }

        .join-requests-container div {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 10px;
            cursor: default;
            width: 280px;
            margin-bottom: 5px;
            padding: 5px;
        }

        .join-requests-container div #email {
            font-size: 1.6rem;
            cursor: default;
        }

        .join-requests-container div #avatar {
            width: 64px;
            height: 64px;
            margin-right: 5px;
        }
    }
</style>
