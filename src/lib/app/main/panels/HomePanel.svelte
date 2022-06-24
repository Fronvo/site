<script lang="ts">
    import { goto } from '$app/navigation';
    import { userData } from 'stores/app/main';
    import { quadIn } from 'svelte/easing';
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
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        margin-bottom: 50px;
        flex: 1;
    }

    .top-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .top-content #username {
        text-align: center;
        font-size: 2.8rem;
        margin: 0;
    }

    .top-content #avatar {
        width: 128px;
        height: 128px;
    }

    @media screen and (max-width: 700px) {
        .home-container {
            margin: 0;
            margin-bottom: 100px;
        }

        .top-content #username {
            font-size: 2.5rem;
        }
    }

    @media screen and (max-width: 520px) {
        .top-content #username {
            font-size: 2.1rem;
        }

        .top-content #avatar {
            width: 100px;
            height: 100px;
        }
    }
</style>
