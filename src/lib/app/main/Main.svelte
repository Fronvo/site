<script lang="ts">
    import Dropdown from './Dropdown.svelte';
    import Modal from './Modal.svelte';
    import { fade, fly } from 'svelte/transition';
    import AccountInfo from '../reusables/top/AccountInfo.svelte';
    import MessagesList from '../reusables/side/MessagesList.svelte';
    import { roomsList } from 'stores/rooms';
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
    import SearchBar from '../reusables/all/SearchBar.svelte';
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

    onMount(() => {
        socket.on('roomAdded', async () => ($roomsList = await fetchConvos()));
        socket.on(
            'roomRemoved',
            async () => ($roomsList = await fetchConvos())
        );

        socket.on('newRoomMessage', async () => {
            setTimeout(async () => {
                $roomsList = await fetchConvos();
            }, 500);
        });

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

    <div class="second-container">
        <span class="seperator" />

        <SecondaryOptions />

        <span class="seperator" />

        <MessagesList />

        <span class="seperator" />

        <AccountInfo />
    </div>
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: row;
        min-width: 955px;
        margin-left: 10px;
    }

    .first-container {
        width: 60px;
        padding: 5px;
        padding-right: 15px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .second-container {
        height: calc(100vh - 3px);
        width: 235px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
    }

    .third-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .seperator {
        width: 100%;
        height: 4px;
        background: var(--bg);
    }
</style>
