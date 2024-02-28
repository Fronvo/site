<script lang="ts">
    import Dropdown from './Dropdown.svelte';
    import Modal from './Modal.svelte';
    import { scale } from 'svelte/transition';
    import MessagesList from '../reusables/side/MessagesList.svelte';
    import {
        currentChannel,
        currentRoomData,
        currentRoomLoaded,
        isInServer,
        mobileShowMembers,
    } from 'stores/rooms';
    import { disabledIn30, isMobile, lastSendsIn30 } from 'stores/main';
    import { onMount } from 'svelte';
    import { differenceInMinutes } from 'date-fns';
    import { getKey } from 'utilities/global';
    import { Toaster } from 'svelte-sonner';
    import HomeButton from '../reusables/top/HomeButton.svelte';
    import CreateServerButton from '../reusables/side/CreateServerButton.svelte';
    import SecondaryOptions from '../reusables/top/SecondaryOptions.svelte';
    import { quintInOut } from 'svelte/easing';
    import ServersList from '../reusables/side/ServersList.svelte';
    import RoomChat from './rooms/RoomChat.svelte';
    import RoomSend from './rooms/RoomSend.svelte';
    import RoomInfo from './rooms/RoomInfo.svelte';
    import DmMembers from './rooms/DMMembers.svelte';
    import RoomMembers from './rooms/RoomMembers.svelte';
    import ServerPanel from '../reusables/side/ServerPanel.svelte';
    import Dashboard from './dashboard/Dashboard.svelte';
    import JoinServerButton from '../reusables/side/JoinServerButton.svelte';
    import RoomTyping from './rooms/RoomTyping.svelte';
    import ToggleThemeButton from '../reusables/side/ToggleThemeButton.svelte';
    import SecondaryOptionsMobile from '../reusables/top/SecondaryOptionsMobile.svelte';

    let ParticlesComponent;

    onMount(async () => {
        const module = await import('svelte-particles');

        ParticlesComponent = module.default;
    });

    let particlesConfig = {
        particles: {
            color: { value: '#fff' },

            move: {
                direction: 'bottom',
                enable: true,
                outModes: 'out',
                speed: 2,
            },

            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 400,
            },

            opacity: {
                value: 0.7,
            },

            shape: {
                type: 'circle',
            },

            size: {
                value: 10,
            },

            wobble: {
                enable: true,
                distance: 10,
                speed: 10,
            },

            zIndex: {
                value: { min: 1, max: 100 },
            },
        },
    };

    let onParticlesLoaded = (event) => {
        const particlesContainer = event.detail.particles;
    };

    let particlesInit = async (engine) => {};

    onMount(() => {
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

{#if new Date().getMonth() == 11}
    <svelte:component
        this={ParticlesComponent}
        id="tsparticles"
        options={particlesConfig}
        on:particlesLoaded={onParticlesLoaded}
        {particlesInit}
    />
{/if}

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

<div
    class={`main-container ${$isMobile ? 'mobile' : ''}`}
    in:scale={{ duration: 750, easing: quintInOut, opacity: 0, start: 1.25 }}
>
    {#if !$mobileShowMembers}
        {#if !$isMobile}
            <div class="first-container">
                <HomeButton />
                <ServersList />
                <CreateServerButton />
                <JoinServerButton />
                <ToggleThemeButton />
            </div>

            <div class="second-container">
                {#if !$isInServer}
                    <div class="wrapper">
                        <SecondaryOptions />

                        <MessagesList />
                    </div>
                {:else}
                    <ServerPanel />
                {/if}
            </div>
        {:else if !$currentChannel && !$currentRoomData}
            <SecondaryOptionsMobile />
        {/if}

        <div class="third-container">
            {#if !$isMobile}
                {#if $currentRoomLoaded || $isInServer}
                    {#if $currentRoomData || $currentChannel}
                        <RoomInfo />

                        <RoomChat />

                        <RoomSend />

                        <RoomTyping />
                    {/if}
                {:else}
                    <Dashboard />
                {/if}
            {:else if $currentRoomLoaded || $currentChannel}
                <RoomInfo />

                <RoomChat />

                <RoomSend />

                <RoomTyping />
            {:else}
                <Dashboard />
            {/if}
        </div>

        {#if !$isMobile}
            <div class="fourth-container">
                {#if $isInServer}
                    <RoomMembers />
                {:else}
                    <DmMembers />
                {/if}
            </div>
        {/if}
    {:else}
        <RoomMembers />
    {/if}
</div>

<style>
    .main-container {
        display: flex;
        flex-direction: row;
        min-width: 955px;
        z-index: 1;
        overflow: hidden;
    }

    .mobile {
        min-width: 0;
    }

    .first-container {
        width: 64px;
        min-width: 64px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-bottom: 10px;
        border-right: 1px solid var(--primary);
    }

    .first-container::-webkit-scrollbar {
        display: none;
    }

    .second-container {
        height: calc(100vh);
        min-width: 235px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        background: var(--primary);
    }

    .wrapper {
        width: 235px;
        height: calc(100vh);
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .wrapper::-webkit-scrollbar-thumb {
        background: transparent;
    }

    .wrapper:hover.wrapper::-webkit-scrollbar-thumb {
        background: var(--primary);
    }

    .third-container {
        width: 100%;
        height: calc(100vh);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .fourth-container {
        z-index: 1;
        display: flex;
        flex-direction: column;
        background: var(--primary);
    }
</style>
