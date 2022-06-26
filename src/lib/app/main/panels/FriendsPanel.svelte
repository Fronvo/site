<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';
    import { loadFriendsPanel } from 'utilities/app/friend';

    goto('friends', {
        replaceState: true,
    });

    $: loadFriendsPanel();
</script>

<div class="friends-container" in:fade={{ duration: 200, delay: 200 }}>
    <h1>Friends are coming soon!</h1>
</div>

<style>
    .friends-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        flex: 1;
    }

    .friends-container h1 {
        text-align: center;
        font-size: 2rem;
    }

    @media screen and (max-width: 720px) {
        .friends-container {
            margin: 0;
            margin-bottom: 100px;
        }

        .friends-container h1 {
            font-size: 1.7rem;
        }
    }

    @media screen and (max-width: 520px) {
        .friends-container h1 {
            font-size: 1.5rem;
        }
    }
</style>
