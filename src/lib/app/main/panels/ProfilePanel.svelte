<script lang="ts">
    import ProfileInfo from '$lib/app/main/panels/profile/ProfileInfo.svelte';
    import ProfilePosts from '$lib/app/main/panels/profile/ProfilePosts.svelte';
    import { targetProfile, userData, userPosts } from 'stores/profile';
    import { onDestroy, onMount } from 'svelte';
    import { loadProfilePanel } from 'utilities/profile';

    onMount(async () => {
        await loadProfilePanel($targetProfile);
    });

    onDestroy(() => {
        $targetProfile = undefined;
    });
</script>

<div class="profile-container">
    {#if $userData && $userPosts}
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
