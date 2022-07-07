<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import Avatar from '$lib/svgs/Avatar.svelte';
    import { friendsAdded } from 'stores/app/profile';
    import { fade } from 'svelte/transition';
    import { fetchUser } from 'utilities/app/main';
</script>

<div class="added-container">
    {#if $friendsAdded.length == 0}
        <Center absolute>
            <div class="add-container">
                <h1>Add friend by tag</h1>
                <input />
            </div>
        </Center>
    {:else}
        {#each $friendsAdded as { id }, i}
            {#await fetchUser(id) then { username }}
                <div in:fade={{ duration: 500, delay: (i + 1) * 50 }}>
                    <Avatar />
                    <h1>{username}</h1>
                </div>
            {/await}
        {/each}
    {/if}
</div>

<style>
    .added-container {
        display: flex;
        flex-direction: column;
    }

    .added-container div {
        display: flex;
        align-items: center;
        background: var(--theme-nav_bg_color);
        box-shadow: 0 0 10px var(--theme-nav_shadow_color);
        width: 400px;
        border-radius: 20px;
        padding: 10px;
        margin-bottom: 15px;
        margin-right: 20px;
        cursor: pointer;
        transition: 300ms opacity;
    }

    .added-container div:hover {
        opacity: 0.8;
    }

    .added-container div h1 {
        margin: 0;
        margin-left: 5px;
        font-size: 2rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    @media screen and (max-width: 720px) {
        .added-container {
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            width: 100%;
        }

        .added-container div {
            width: 90%;
            cursor: default;
            margin-right: 0;
        }

        .added-container div h1 {
            font-size: 1.8rem;
        }
    }

    @media screen and (max-width: 520px) {
        .added-container div h1 {
            font-size: 1.5rem;
        }
    }

    @keyframes --global-fade-in {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
</style>
