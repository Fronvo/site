<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import ProfilePreviewLarge from '$lib/app/reusables/all/PreviewLarge.svelte';
    import { findCachedAccount } from 'utilities/main';
    import { currentRoomData, currentRoomLoaded } from 'stores/rooms';
    import { ourData } from 'stores/profile';
    import { cachedAccountData } from 'stores/main';
    import { onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import CloseDmButton from '$lib/app/reusables/rooms/CloseDMButton.svelte';
    import PreviewSmall from '$lib/app/reusables/all/PreviewSmall.svelte';

    let profileData: FronvoAccount;

    let unsubscribe: Unsubscriber;

    async function getOtherUser(): Promise<FronvoAccount> {
        if (!$currentRoomData.dmUsers) return;

        return await findCachedAccount(
            $currentRoomData?.dmUsers[0] != $ourData.profileId
                ? $currentRoomData?.dmUsers[0]
                : $currentRoomData?.dmUsers[1],
            $cachedAccountData
        );
    }

    onMount(async () => {
        unsubscribe = currentRoomLoaded.subscribe(async (state) => {
            if (!state) return;

            profileData = await getOtherUser();
        });
    });

    onDestroy(() => {
        profileData = undefined;

        unsubscribe();
    });
</script>

{#if profileData}
    <div class="members-container" in:fade={{ duration: 150 }}>
        <PreviewSmall {profileData} />

        <hr />

        <CloseDmButton />
    </div>
{/if}

<style>
    .members-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 275px;
        z-index: 2;
        overflow: auto;
        height: calc(100vh - 65px);
        overflow: hidden;
    }

    hr {
        margin-top: 20px;
        width: 100%;
        height: 5px;
        background: var(--bg);
        border: 1px solid var(--bg);
        transform: translateY(-40px);
    }
</style>
