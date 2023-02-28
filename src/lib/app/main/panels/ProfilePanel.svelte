<script lang="ts">
    import ProfileInfo from '$lib/app/main/panels/profile/ProfileInfo.svelte';
    import { fade } from 'svelte/transition';
</script>

<div class="profile-container" in:fade={{ duration: 250 }}>
    <ProfileInfo />
</div>

<style>
    .profile-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 40px;
    }

    @media screen and (max-width: 700px) {
        .profile-container {
            margin-top: 0;
        }
    }
</style>
