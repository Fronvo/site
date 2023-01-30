<script lang="ts">
    import { goto } from '$app/navigation';
    import ProfileInfo from '$lib/app/main/panels/profile/ProfileInfo.svelte';
    import ProfilePosts from '$lib/app/main/panels/profile/ProfilePosts.svelte';
    import { loginSucceeded } from 'stores/main';
    import {
        ourProfileData,
        profileLoadingFinished,
        targetProfile,
        userData,
        userPosts,
    } from 'stores/profile';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';
    import { fade } from 'svelte/transition';
    import { getKey } from 'utilities/global';
    import { loadProfilePanel } from 'utilities/profile';

    let unsubscribe: Unsubscriber;

    onMount(async () => {
        unsubscribe = loginSucceeded.subscribe(async (state) => {
            if (!state && $targetProfile == undefined) return;

            if (
                $profileLoadingFinished &&
                $targetProfile == $ourProfileData.profileId
            ) {
                goto(`/profile/${$ourProfileData.profileId}`, {
                    replaceState: true,
                });
            } else {
                await loadProfilePanel($targetProfile);
            }
        });
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div
    class="profile-container"
    in:fade={{ duration: 250, delay: $profileLoadingFinished ? 200 : 0 }}
>
    {#if $userData && (!getKey('token') || $userPosts)}
        <ProfileInfo />

        <ProfilePosts />
    {/if}
</div>

<style>
    .profile-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 100px;
        margin-right: 100px;
        margin-top: 10px;
    }

    @media screen and (max-width: 720px) {
        .profile-container {
            margin-left: 0;
            margin-right: 0;
            margin-bottom: 90px;
        }
    }

    @media screen and (max-width: 520px) {
        .profile-container {
            margin-bottom: 70px;
        }
    }
</style>
