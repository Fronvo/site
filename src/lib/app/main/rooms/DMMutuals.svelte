<script lang="ts">
    import type { Server } from 'interfaces/all';
    import {
        currentChannel,
        currentRoomData,
        currentRoomId,
        currentRoomMessages,
        currentServer,
        isInServer,
        serversList,
    } from 'stores/rooms';
    import { onMount } from 'svelte';
    import { setTitle } from 'utilities/main';

    let mutualServers: Server[] = [];
    let showMutuals = false;

    function findMutualServers(): void {
        mutualServers = [];

        for (const serverIndex in $serversList) {
            const server = $serversList[serverIndex];

            if (server.members.includes($currentRoomData?.dmUser.profileId)) {
                mutualServers.push(server);
            }
        }
    }

    function toggleShow(): void {
        showMutuals = !showMutuals;
    }

    function enterMutualServer(index: number): void {
        // See last accessed channel with localStorage key
        $currentChannel = undefined;
        $currentRoomId = undefined;
        $currentRoomData = undefined;

        $isInServer = true;
        $currentServer = mutualServers[index];

        $currentRoomMessages = [];

        setTitle(mutualServers[index].name);
    }

    onMount(() => {
        currentRoomData.subscribe((data) => {
            if (!data) return;

            showMutuals = false;

            findMutualServers();
        });
    });
</script>

{#if mutualServers.length > 0}
    <div class="mutuals">
        <div class="top" on:click={toggleShow} on:keydown={toggleShow}>
            <h1 id="descriptor">
                {mutualServers.length} mutual server{mutualServers.length != 1
                    ? 's'
                    : ''}
            </h1>

            {#if !showMutuals}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    ><path
                        fill-rule="evenodd"
                        d="M4.43 8.512a.75.75 0 0 1 1.058-.081L12 14.012l6.512-5.581a.75.75 0 0 1 .976 1.138l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.057Z"
                        clip-rule="evenodd"
                    /></svg
                >
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    ><path
                        fill-rule="evenodd"
                        d="M11.512 8.43a.75.75 0 0 1 .976 0l7 6a.75.75 0 1 1-.976 1.14L12 9.987l-6.512 5.581a.75.75 0 1 1-.976-1.138l7-6Z"
                        clip-rule="evenodd"
                    /></svg
                >
            {/if}
        </div>

        {#if showMutuals}
            <div class="servers">
                {#each mutualServers as server, i}
                    <div
                        class="server"
                        on:click={() => enterMutualServer(i)}
                        on:keydown={() => enterMutualServer(i)}
                    >
                        {#if server.icon}
                            <img
                                id="icon"
                                src={`${server.icon}/tr:w-96:h-96`}
                                alt={`${server.name}\'s icon'`}
                                draggable={false}
                            />
                        {:else}
                            <div class="placeholder">
                                <h1>{server.name[0]}{server.name[1] || ''}</h1>
                            </div>
                        {/if}

                        <h1 id="name">
                            {server.name}
                        </h1>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
{/if}

<style>
    .mutuals {
        width: 95%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transform: translateY(-30px);
        background: var(--primary);
        border-radius: 10px;
        margin-top: 20px;
    }

    .top {
        display: flex;
        align-items: center;
        user-select: none;
        cursor: pointer;
        padding: 10px;
    }

    #descriptor {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 500;
        flex: 1;
        margin-left: 5px;
    }

    .top svg {
        width: 22px;
        height: 22px;
        fill: white;
    }

    .servers {
        max-height: 265px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .servers::-webkit-scrollbar-thumb {
        background: transparent;
    }

    .servers:hover.servers::-webkit-scrollbar-thumb {
        background: var(--secondary);
    }

    .server {
        display: flex;
        align-items: center;
        height: 48px;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 5px;
        margin-right: 5px;
        margin-left: 5px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .server:hover {
        background: var(--primary);
    }

    #icon {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        margin-left: 2px;
    }

    .placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--primary);
        border-radius: 15px;
        width: 30px;
        height: 30px;
        margin-left: 2px;
        margin-bottom: 2px;
    }

    .server:hover .placeholder {
        background: var(--secondary);
    }

    .placeholder h1 {
        margin: 0;
        font-size: 0.9rem;
    }

    #name {
        margin: 0;
        font-size: 0.95rem;
        margin-left: 10px;
        width: 175px;
        overflow: hidden;
        white-space: no-wrap;
        text-overflow: ellipsis;
    }
</style>
