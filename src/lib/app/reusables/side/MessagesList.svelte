<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import Dm from './DM.svelte';
    import Room from './Room.svelte';
    import { roomsList, showEditableRoom } from 'stores/rooms';
    import EditableRoom from './EditableRoom.svelte';

    function createNewRoom(): void {
        $showEditableRoom = true;
    }
</script>

<div
    class="messages-container"
    in:fly={{ duration: 250 }}
    out:fade={{ duration: 50 }}
>
    <div class="message-container">
        <h1 id="title">Messages</h1>

        <svg
            id="create"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
            on:click={createNewRoom}
            on:keydown={createNewRoom}
            ><path
                fill="var(--branding)"
                d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12Z"
            /></svg
        >
    </div>

    <div class="list-container">
        {#if $showEditableRoom}
            <EditableRoom />
        {/if}

        {#each $roomsList as roomData}
            {#if roomData.isDM}
                <Dm dmData={roomData} />
            {:else}
                <Room {roomData} />
            {/if}
        {/each}

        {#if $roomsList.length == 0}
            <div class="empty">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    ><g fill="none"
                        ><circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="var(--branding)"
                            stroke-width="1.5"
                            opacity=".5"
                        /><path
                            stroke="var(--branding)"
                            stroke-linecap="round"
                            stroke-width="1.5"
                            d="M12 17v-6"
                        /><circle
                            cx="1"
                            cy="1"
                            r="1"
                            fill="var(--branding)"
                            transform="matrix(1 0 0 -1 11 9)"
                        /></g
                    ></svg
                >
                <h1>No rooms found</h1>
            </div>{/if}
    </div>
</div>

<style>
    .messages-container {
        border-right: 1px solid var(--primary);
        width: 275px;
        height: calc(100vh - 65px);
        transform: translateY(65px);
        box-shadow: 0 5px 4px var(--message_shadow);
    }

    .message-container {
        height: 50px;
        display: flex;
        align-items: center;
        padding: 5px;
        border-bottom: 1px solid var(--primary);
    }

    .list-container {
        display: flex;
        flex-direction: column;
        overflow: auto;
        overflow-x: hidden;
        height: calc(100% - 50px);
        padding-top: 5px;
        padding-bottom: 10px;
    }

    #title {
        margin: 0;
        margin-left: 8px;
        font-size: 1.2rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        flex: 1;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    #create {
        width: 34px;
        height: 34px;
        padding: 7px;
        border-radius: 10px;
        margin-left: 7px;
        transition: 150ms;
    }

    #create:hover {
        background: var(--primary);
    }

    #create:active {
        transform: scale(0.975);
        opacity: 0.5;
    }

    .empty {
        height: calc(100vh - 260px);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 273px;
        justify-content: center;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .empty h1 {
        margin: 0;
        font-size: 1.3rem;
    }

    .empty svg {
        width: 128px;
        height: 128px;
        cursor: default;
    }

    @media screen and (max-width: 1250px) {
        .messages-container {
            width: 76px;
        }

        #title {
            display: none;
        }

        #create {
            display: none;
        }

        .empty {
            display: none;
        }
    }
</style>
