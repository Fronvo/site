<script lang="ts">
    import ProfilePreview from '$lib/app/reusables/all/ProfilePreview.svelte';
    import { DropdownTypes } from 'stores/dropdowns';
    import { socket } from 'stores/main';
    import {
        joinRequests,
        targetRequestModal,
        type ModalData,
    } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { onMount } from 'svelte';
    import { dismissModal, setProgressBar } from 'utilities/main';
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
                {#each $joinRequests as { email }}
                    <ProfilePreview
                        profileData={{
                            ...$ourData,
                            avatar: '',
                        }}
                        isJoinRequest
                        joinRequestEmail={email}
                        preDropdownCallback={() =>
                            ($targetRequestModal = email)}
                        dropdown={DropdownTypes.JoinRequest}
                    />
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

    @media screen and (max-width: 700px) {
        .join-requests-container {
            flex-direction: column;
            justify-content: start;
            flex-wrap: nowrap;
        }
    }
</style>
