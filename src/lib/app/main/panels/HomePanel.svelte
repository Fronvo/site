<script lang="ts">
    import { goto } from '$app/navigation';
    import { userData } from 'stores/app/main';
    import { fade } from 'svelte/transition';
    import { fillUserData } from 'utilities/app/main';

    goto('home', {
        replaceState: true,
    });

    $: fillUserData();
</script>

<!-- Placeholder for hot updates -->
<div class="home-container">
    {#if $userData}
        <div in:fade={{ duration: 200, delay: 200 }}>
            <h1 id="username" in:fade={{ duration: 750 }}>
                Welcome back, {$userData.username}
            </h1>
        </div>
    {/if}
</div>

<style>
    .home-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        flex: 1;
    }

    .home-container #username {
        text-align: center;
        font-size: 2.5rem;
    }

    @media screen and (max-width: 700px) {
        .home-container {
            margin: 0;
            margin-bottom: 100px;
        }

        .home-container #username {
            font-size: 2.1rem;
        }
    }

    @media screen and (max-width: 520px) {
        .home-container #username {
            font-size: 1.7rem;
        }
    }
</style>
