<script lang="ts">
    import { goto } from '$app/navigation';
    import ProfileInfo from '$lib/app/main/panels/profile/ProfileInfo.svelte';
    import ProfilePosts from '$lib/app/main/panels/profile/ProfilePosts.svelte';
    import {
        ourId,
        targetProfile,
        userData,
        userPosts,
    } from 'stores/app/profile';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { loadProfileData, loadProfilePosts } from 'utilities/app/profile';

    goto('profile', {
        replaceState: true,
    });

    onMount(async () => {
        await loadProfileData($targetProfile);
        await loadProfilePosts($targetProfile || $ourId);
    });
</script>

<div class="profile-container" in:fade={{ duration: 300, delay: 200 }}>
    <!-- Hot updates in dev -->
    {#if $userData && $userPosts}
        <ProfileInfo info={$userData} />

        <hr in:fade={{ duration: 250, delay: 600 }} />

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

    hr {
        width: 300px;
        margin-top: 20px;
    }

    @media screen and (max-width: 720px) {
        .profile-container {
            margin-left: 0;
            margin-right: 0;
            margin-bottom: 90px;
        }

        hr {
            width: 250px;
            margin-top: 15px;
        }
    }

    @media screen and (max-width: 520px) {
        .profile-container {
            margin-bottom: 70px;
        }

        hr {
            width: 200px;
        }
    }
</style>
