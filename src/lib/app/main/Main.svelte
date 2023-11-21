<script lang="ts">
    import Dropdown from './Dropdown.svelte';
    import Modal from './Modal.svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import AccountInfo from '../reusables/top/AccountInfo.svelte';
    import MessagesList from '../reusables/side/MessagesList.svelte';
    import {
        currentRoomData,
        currentRoomId,
        currentRoomLoaded,
        roomsList,
    } from 'stores/rooms';
    import {
        darkTheme,
        disabledIn30,
        lastSendsIn30,
        socket,
    } from 'stores/main';
    import { onMount } from 'svelte';
    import { differenceInMinutes } from 'date-fns';
    import { getKey } from 'utilities/global';
    import { fetchConvos } from 'utilities/rooms';
    import { Toaster } from 'svelte-sonner';
    import HomeButton from '../reusables/top/HomeButton.svelte';
    import CreateServerButton from '../reusables/side/CreateServerButton.svelte';
    import DownloadFronvoButton from '../reusables/side/DownloadFronvoButton.svelte';
    import SecondaryOptions from '../reusables/top/SecondaryOptions.svelte';
    import {
        quartInOut,
        quartOut,
        quintOut,
        sineInOut,
        sineOut,
    } from 'svelte/easing';
    import ServersList from '../reusables/side/ServersList.svelte';
    import DiscoverBotsButton from '../reusables/side/DiscoverBotsButton.svelte';
    import RoomChat from './rooms/RoomChat.svelte';
    import RoomSend from './rooms/RoomSend.svelte';
    import RoomInfo from './rooms/RoomInfo.svelte';
    import DmMembers from './rooms/DMMembers.svelte';
    import RoomMembers from './rooms/RoomMembers.svelte';

    onMount(() => {
        socket.on('roomAdded', async () => ($roomsList = await fetchConvos()));
        socket.on(
            'roomRemoved',
            async () => ($roomsList = await fetchConvos())
        );

        // TODO: Servers by user join date / custom, not last msg, change room types to servers, server side
        // TODO: Requires db change too, old fronvo used rooms and not servers, might need to port whole db to servers or just keep as seperate v2 instance, different paltforms maybe

        setInterval(() => {
            if ($lastSendsIn30 != -1) {
                $lastSendsIn30 = 0;
            }

            if (
                differenceInMinutes(
                    new Date(),
                    new Date(getKey('disabledIn30Time'))
                ) < 15
            ) {
                $disabledIn30 = false;
            }
        }, 30000);
    });
</script>

<Dropdown />

<Modal />

<Toaster
    theme={'dark'}
    duration={2500}
    richColors
    visibleToasts={5}
    toastOptions={{
        style: 'background: var(--bg); border-color: var(--secondary); border-radius: 10px; font-family: Manrope; font-size: 0.925rem;',
        class: 'fronvo-toast',
    }}
    offset={'25px'}
/>

<div class="main-container" in:fade={{ duration: 300, easing: sineOut }}>
    <div
        class="first-container"
        in:fly={{ x: -75, duration: 300, easing: quintOut, opacity: 1 }}
    >
        <HomeButton />
        <ServersList />
        <CreateServerButton />
        <DiscoverBotsButton />
        <DownloadFronvoButton />
    </div>

    <div class="second-container" in:scale={{ duration: 300, start: 0.975 }}>
        <span class="seperator" />

        <SecondaryOptions />

        <span class="seperator" />

        <MessagesList />

        <span class="seperator" />

        <AccountInfo />
    </div>

    {#if $currentRoomLoaded}
        <div class="third-container" in:scale={{ duration: 300, start: 0.975 }}>
            <!-- TODO: Else for Dashboard, Turbo -->
            <RoomInfo />

            <span class="seperator" />

            <RoomChat />

            <span class="seperator" />

            <RoomSend />
        </div>
    {/if}

    {#if $currentRoomLoaded}
        <div
            class="fourth-container"
            in:scale={{ duration: 300, start: 0.975 }}
        >
            {#if $currentRoomData.isDM}
                <DmMembers />
            {:else}
                <RoomMembers />
            {/if}
        </div>
    {/if}
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: row;
        min-width: 955px;
    }

    .first-container {
        width: 60px;
        min-width: 60px;
        height: 100vh;
        padding: 5px;
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .first-container::-webkit-scrollbar {
        display: none;
    }

    .second-container {
        height: calc(100vh - 3px);
        width: 235px;
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
    }

    .third-container {
        width: 100%;
        height: calc(100vh - 15px);
        margin-left: 5px;
        margin-right: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }

    .fourth-container {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        margin-bottom: 13px;
        background: var(--primary);
        border-radius: 10px;
        margin-right: 10px;
    }

    .seperator {
        width: 100%;
        height: 4px;
        background: var(--bg);
    }
</style>
