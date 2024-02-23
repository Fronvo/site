<script lang="ts">
    import type { Server } from 'interfaces/all';
    import { isMobile, mousePos } from 'stores/main';
    import {
        currentChannel,
        currentRoomData,
        currentRoomId,
        currentRoomMessages,
        currentServer,
        isInServer,
        tempCurrentServer,
    } from 'stores/rooms';
    import { setTitle, showDropdownMouse } from 'utilities/main';
    import {
        DropdownTypes,
        currentDropdownId,
        dropdownVisible,
    } from 'stores/dropdowns';
    import { goto } from '$app/navigation';

    export let serverData: Server;

    async function enterServer(): Promise<void> {
        if ($currentServer?.serverId == serverData.serverId) return;

        $currentChannel = undefined;
        $currentRoomId = undefined;
        $currentRoomData = undefined;

        $isInServer = true;
        $currentServer = serverData;

        $currentRoomMessages = [];

        goto(`/${serverData.invite}`);

        setTitle(serverData.name);
    }

    function showOptions(): void {
        $tempCurrentServer = serverData;

        showDropdownMouse(DropdownTypes.ServerTempSettings, $mousePos);
    }
</script>

{#if serverData.icon}
    <img
        class={`${
            $currentRoomId == serverData.serverId ||
            ($tempCurrentServer.serverId == serverData.serverId &&
                $dropdownVisible &&
                $currentDropdownId == DropdownTypes.ServerTempSettings)
                ? 'active'
                : ''
        } ${$isMobile ? 'mobile' : ''}`}
        on:click={enterServer}
        on:keydown={enterServer}
        id="icon"
        src={`${serverData.icon}/tr:w-96:h-96`}
        alt={`${serverData.name}\'s icon'`}
        draggable={false}
        on:contextmenu={(ev) => {
            showOptions();

            ev.preventDefault();
        }}
    />
{:else}
    <span
        class={`placeholder ${
            $currentServer?.serverId == serverData.serverId ||
            ($tempCurrentServer?.serverId == serverData.serverId &&
                $dropdownVisible &&
                $currentDropdownId == DropdownTypes.ServerTempSettings)
                ? 'placeholder-active'
                : ''
        } ${$isMobile ? 'mobile-placeholder' : ''}`}
        on:click={enterServer}
        on:keydown={enterServer}
        id="icon"
        on:contextmenu={(ev) => {
            showOptions();

            ev.preventDefault();
        }}
    >
        <h1>{serverData.name[0]}{serverData.name[1] || ''}</h1></span
    >
{/if}

<style>
    #icon {
        width: 48px;
        height: 48px;
        cursor: pointer;
        margin: 0;
        padding: 0;
        transition: 125ms;
        margin-bottom: 10px;
        user-select: none;
    }

    img {
        border-radius: 25px;
    }

    #icon:hover {
        border-radius: 15px;
    }

    #icon:active {
        transform: translateY(2px);
    }

    .placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--primary);
        border-radius: 25px;
        border: 3px solid transparent;
    }

    .mobile-placeholder {
        background: var(--tertiary);
    }

    .placeholder h1 {
        font-size: 1.1rem;
        font-weight: 600;
        transition: 125ms;
        color: var(--text);
    }

    .placeholder:hover h1 {
        color: var(--text);
    }

    .active {
        border-radius: 15px;
    }

    .placeholder-active {
        border-radius: 15px;
        border: 3px solid var(--text);
    }

    .placeholder-active h1 {
        color: var(--text);
    }
</style>
