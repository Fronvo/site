<script lang="ts">
    import Dropdown from './Dropdown.svelte';
    import ProgressBar from './ProgressBar.svelte';
    import Modal from './Modal.svelte';
    import { fade } from 'svelte/transition';
    import AccountInfo from '../reusables/top/AccountInfo.svelte';
    import RoomInfo from './rooms/RoomInfo.svelte';
    import TopOptions from '../reusables/top/TopOptions.svelte';
    import MessagesList from '../reusables/side/MessagesList.svelte';
    import RoomChat from './rooms/RoomChat.svelte';
    import RoomSend from './rooms/RoomSend.svelte';
    import { currentRoomId, roomsList } from 'stores/rooms';
    import HomePosts from './home/HomePosts.svelte';
    import { Toaster, toast } from 'svelte-sonner';
    import {
        darkTheme,
        disabledIn30,
        lastSendsIn30,
        loginSucceeded,
        socket,
    } from 'stores/main';
    import { onMount } from 'svelte';
    import { ourData } from 'stores/profile';
    import { differenceInMinutes } from 'date-fns';
    import { getKey } from 'utilities/global';
    import { fetchConvos } from 'utilities/rooms';

    onMount(() => {
        loginSucceeded.subscribe((state) => {
            if (!state) return;

            toast(`Welcome back, ${$ourData.username}`);
        });

        socket.on('onlineStatusUpdated', ({ online, profileId }) => {
            if ($ourData.friends.includes(profileId)) {
                if (online) toast(`${profileId} is now online.`);
            }
        });

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

<ProgressBar />

<Dropdown />

<Modal />

<Toaster
    theme={$darkTheme ? 'dark' : 'light'}
    duration={2500}
    richColors
    visibleToasts={5}
    toastOptions={{
        style: 'background: var(--bg); border-color: var(--secondary); border-radius: 10px; font-family: Manrope; font-size: 0.925rem;',
        class: 'fronvo-toast',
    }}
    offset={'25px'}
/>

<div class="main-container" in:fade={{ duration: 500 }}>
    <div id="content">
        <div class="top-container">
            <AccountInfo />
            <RoomInfo />
            <TopOptions />
        </div>

        <div>
            <div class="second-container">
                <div>
                    <MessagesList />
                </div>

                <div class="third-container">
                    {#if $currentRoomId}
                        <RoomChat />
                        <RoomSend />
                    {:else}
                        <HomePosts />
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 955px;
    }

    .top-container {
        display: flex;
        height: 0px;
    }

    .second-container {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .third-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
</style>
