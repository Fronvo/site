<script lang="ts">
    import { goto } from '$app/navigation';
    import { userData } from 'stores/app/profile';
    import { fade } from 'svelte/transition';
    import { loadProfilePanel } from 'utilities/app/profile';

    goto('profile', {
        replaceState: true,
    });

    $: loadProfilePanel();
</script>

<div class="profile-container" in:fade={{ duration: 200, delay: 200 }}>
    <!-- Hot updates in dev -->
    {#if $userData}
        <h1 id="username">{$userData.username}</h1>
    {/if}
</div>

<style>
    .profile-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 350px;
        margin-right: 350px;
        margin-top: 10px;
    }

    .profile-container #username {
        text-align: center;
        font-size: 2.8rem;
        margin: 0;
    }

    @media screen and (max-width: 720px) {
        .profile-container {
            margin: 0;
            margin-bottom: 90px;
        }

        .profile-container #username {
            font-size: 2.5rem;
        }
    }

    @media screen and (max-width: 520px) {
        .profile-container {
            margin-bottom: 70px;
        }

        .profile-container #username {
            font-size: 2.2rem;
        }
    }
</style>
