<script lang="ts">
    import OptionsMenu from '$lib/svgs/OptionsMenu.svelte';
    import type { FronvoAccount } from 'interfaces/all';
    import { DropdownTypes, dropdownVisible } from 'stores/dropdowns';
    import { cachedAccountData, guestMode, socket } from 'stores/main';
    import { ModalTypes } from 'stores/modals';
    import { searchData } from 'stores/profile';
    import {
        dismissDropdown,
        setProgressBar,
        showDropdown,
        showModal,
        updateCachedAccount,
    } from 'utilities/main';
    import { loadOurProfile, loadTargetProfile } from 'utilities/profile';
    import ModernButton from '../all/ModernButton.svelte';

    export let ourData: FronvoAccount;
    export let data: FronvoAccount;

    let isFollowed: boolean;
    let isRequesting = false;

    async function handleFollowProfile(): Promise<void> {
        if (isRequesting) return;

        if ($guestMode) {
            showModal(ModalTypes.JoinFronvo);
            return;
        }

        // Block adjacent requests
        isRequesting = true;
        setProgressBar(true);

        if (!isFollowed) {
            socket.emit(
                'followProfile',
                { profileId: data.profileId },
                ({ err }) => {
                    if (!err) {
                        reloadProfile();
                    }
                }
            );
        } else {
            socket.emit(
                'unfollowProfile',
                { profileId: data.profileId },
                ({ err }) => {
                    if (!err) {
                        reloadProfile();
                    }
                }
            );
        }

        async function reloadProfile(): Promise<void> {
            await loadOurProfile($cachedAccountData);

            // First update the target profile
            searchData.set(
                await updateCachedAccount(data.profileId, $cachedAccountData)
            );

            // Now use updated cache, no panel reload
            await loadTargetProfile(data.profileId, $cachedAccountData, true);

            isRequesting = false;
            setProgressBar(false);
        }
    }

    function callDropdown(dropdown: DropdownTypes): void {
        if ($dropdownVisible) {
            dismissDropdown();
        } else {
            showDropdown(dropdown);
        }
    }

    $: isFollowed = ourData?.following.includes(data.profileId);
</script>

<div class="options-container">
    {#if !$guestMode}
        <ModernButton callback={handleFollowProfile}
            >{isFollowed ? 'Unfollow' : 'Follow'}</ModernButton
        >

        {#if !data.isAdmin && ourData?.isAdmin}
            <OptionsMenu
                callback={() => callDropdown(DropdownTypes.ProfileOptions)}
            />
        {/if}
    {:else}
        <ModernButton callback={handleFollowProfile}>Join Fronvo</ModernButton>
    {/if}
</div>

<style>
    .options-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>
