<script lang="ts">
    import { goto } from '$app/navigation';
    import { userData } from 'stores/app/main';
    import { quadIn } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { loadHomePanel } from 'utilities/app/home';

    goto('home', {
        replaceState: true,
    });

    $: loadHomePanel();
</script>

<!-- Placeholder for hot updates -->
<div class="home-container">
    {#if $userData}
        <div
            class="top-content"
            in:fade={{ duration: 200, delay: 200, easing: quadIn }}
        >
            <h1 id="username">{$userData.username}</h1>
        </div>
    {/if}
</div>

<style>
    .home-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

    .top-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .top-content #username {
        text-align: center;
        font-size: 2.8rem;
        margin: 0;
    }

    @media screen and (max-width: 720px) {
        .home-container {
            margin-right: 0;
            margin-bottom: 9vh;
            margin-top: 0;
        }
        .top-content #username {
            font-size: 2.5rem;
        }
    }

    @media screen and (max-width: 520px) {
        .top-content #username {
            font-size: 2.2rem;
        }
    }
</style>
