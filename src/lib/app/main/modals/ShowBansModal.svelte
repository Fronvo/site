<script lang="ts">
    import ProfilePreview from '$lib/app/reusables/all/ProfilePreview.svelte';
    import type { FronvoAccount } from 'interfaces/all';
    import { DropdownTypes, targetMemberDropdown } from 'stores/dropdowns';
    import { dataSaver, socket } from 'stores/main';
    import type { ModalData } from 'stores/modals';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    // Cap at 20 max loaded
    let loadingFinished = false;
    const bansInfo: Writable<FronvoAccount[]> = writable([]);

    async function loadBannedMembers(): Promise<void> {
        return new Promise((resolve) => {
            socket.emit('showBannedMembers', ({ bannedMembers }) => {
                // Save data
                if ($dataSaver) {
                    bannedMembers = bannedMembers.splice(0, 10);
                }

                $bansInfo = bannedMembers;

                resolve();
            });
        });
    }

    onMount(async () => {
        setProgressBar(true);

        await loadBannedMembers();

        loadingFinished = true;

        setProgressBar(false);
    });

    const data: ModalData = {
        titlePreSpan: $bansInfo.length,
        title: 'Banned members',

        actions: [
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],

        sideModal: {
            side: 'right',
        },
    };
</script>

<ModalTemplate {data}>
    {#if loadingFinished}
        {#if $bansInfo.length == 0}
            <h1 class="modal-header">No banned users</h1>
        {:else}
            <div class="members-items-container">
                {#each $bansInfo as profileData}
                    <ProfilePreview
                        {profileData}
                        preDropdownCallback={() =>
                            ($targetMemberDropdown = profileData)}
                        dropdown={DropdownTypes.CommunityMemberUnban}
                    />
                {/each}
            </div>
        {/if}
    {/if}
</ModalTemplate>

<style>
    .members-items-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: auto scroll;
        flex: 1;
    }

    @media screen and (max-width: 700px) {
        .members-items-container {
            flex-direction: column;
            justify-content: start;
            flex-wrap: nowrap;
        }
    }
</style>
