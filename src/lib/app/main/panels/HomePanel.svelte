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
            <img
                id="avatar"
                src="svgs/home/avatar.svg"
                draggable={false}
                alt="Fronvo avatar"
            />

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
        flex: 1;
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

    .top-content #avatar {
        width: 64px;
        height: 64px;
        margin-right: 10px;
        cursor: pointer;
    }

    @media screen and (max-width: 720px) {
        .home-container {
            margin-right: 0;
            margin-bottom: 9vh;
        }

        .top-content {
            display: none;
        }
    }
</style>
