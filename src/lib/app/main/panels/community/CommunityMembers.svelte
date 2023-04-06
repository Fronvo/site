<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { findCachedAccount, setProgressBar } from 'utilities/main';
    import { onMount } from 'svelte';
    import { communityData } from 'stores/community';
    import { cachedAccountData } from 'stores/main';
    import { DropdownTypes, targetMemberDropdown } from 'stores/dropdowns';
    import ProfilePreviewSmall from '$lib/app/reusables/communities/ProfilePreviewSmall.svelte';
    import { writable, type Writable } from 'svelte/store';

    let memberInfo: Writable<FronvoAccount[]> = writable([]);
    let loadingFinished = false;

    async function loadCommunityMembers(): Promise<void> {
        setProgressBar(true);

        // Fetch all community members, notify UI once finished
        for (const memberIndex in $communityData.members) {
            findCachedAccount(
                $communityData.members[memberIndex],
                $cachedAccountData
            ).then((data) => {
                $memberInfo.push(data);

                checkLoadingDone();
            });
        }

        function checkLoadingDone(): void {
            // Finish loading
            if ($memberInfo.length == $communityData.members.length) {
                loadingFinished = true;
                setProgressBar(false);
            }
        }
    }

    onMount(async () => {
        await loadCommunityMembers();
    });
</script>

<div class="members-container">
    {#if loadingFinished}
        <h1>{$memberInfo.length} member{$memberInfo.length != 1 ? 's' : ''}</h1>

        {#each $memberInfo as profileData}
            <ProfilePreviewSmall
                {profileData}
                preDropdownCallback={() =>
                    ($targetMemberDropdown = profileData)}
                dropdown={DropdownTypes.CommunityMember}
            />
        {/each}
    {/if}
</div>

<style>
    .members-container {
        position: sticky;
        width: 17vw;
        min-width: 250px;
        height: 100vh;
        transition: 150ms background;
        z-index: 2;
        right: 0;
        top: 0;
        background: var(--side_bg_color);
        border-left: 1px solid var(--accent_shadow_color);
        overflow: hidden;
    }

    h1 {
        font-size: 1.6rem;
        padding: 20px;
        padding-bottom: 0;
        color: var(--profile_info_color);
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 850px) {
        .members-container {
            display: none;
        }
    }
</style>
