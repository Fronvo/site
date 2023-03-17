<script lang="ts">
    import ProfileInfo from '$lib/app/main/panels/profile/ProfileInfo.svelte';
</script>

<div class="profile-container">
    <ProfileInfo />
</div>

<style>
    .profile-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 95%;
    }

    @media screen and (max-width: 850px) {
        .profile-container {
            width: 100%;
            margin-bottom: 70px;
        }
    }
</style>
