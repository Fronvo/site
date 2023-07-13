<script lang="ts">
    import {
        currentRoomData,
        currentRoomLoaded,
        currentRoomMessages,
    } from 'stores/rooms';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/store';

    let name: string;
    let unsubscribe: Unsubscriber;

    function setName(): void {
        if ($currentRoomData.isDM) {
            name = $currentRoomData.dmUser.username;
        } else {
            name = $currentRoomData.name;
        }
    }

    onMount(() => {
        unsubscribe = currentRoomLoaded.subscribe((state) => {
            if (!state) return;

            setName();
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

<div class="start-container">
    {#if $currentRoomData?.icon}
        <img
            id="icon"
            src={`${$currentRoomData?.icon}`}
            alt={`${$currentRoomData?.name}'s icon'`}
            draggable={false}
        />
    {:else if $currentRoomData?.isDM}
        <svg
            id="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
            ><path
                fill="var(--branding)"
                d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0ZM96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0Z"
            /></svg
        >
    {:else}
        <svg
            id="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><g fill="var(--branding)"
                ><path
                    d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2c1.108 0 2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715c.519.948.519 2.092.519 4.38v1.522c0 3.9 0 5.851-1.172 7.063C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212C2 19.576 2 17.626 2 13.725v-1.521Z"
                    opacity=".5"
                /><path
                    d="M11.25 18a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0v3Z"
                /></g
            ></svg
        >
    {/if}

    <h1 id="name">{name}</h1>
</div>

<style>
    .start-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #icon {
        width: 90px;
        height: 90px;
        border-radius: 30px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: 150ms;
        border: 2px solid var(--bg);
        cursor: default;
    }

    #name {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin: 0;
        font-size: 1.5rem;
    }
</style>
