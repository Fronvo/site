<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Channel } from 'interfaces/all';
    import {
        DropdownTypes,
        currentDropdownId,
        dropdownVisible,
    } from 'stores/dropdowns';
    import { mousePos, socket } from 'stores/main';
    import { targetChannelModal } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import {
        channelRenamingId,
        currentChannel,
        currentRoomLoaded,
        currentRoomMessages,
        currentServer,
    } from 'stores/rooms';
    import { onDestroy, onMount } from 'svelte';
    import type { Unsubscriber } from 'svelte/motion';
    import { setTitle, showDropdownMouse } from 'utilities/main';

    export let channel: Channel;

    let newName: string;
    let isRenaming = false;

    let inputContainer: HTMLInputElement;

    let unsubscribe: Unsubscriber;

    function enterChannel(): void {
        if (isRenaming) return;

        if ($currentChannel?.channelId == channel.channelId) return;

        $currentChannel = channel;
        $currentRoomLoaded = false;
        $currentRoomLoaded = true;
        $currentRoomMessages = [];

        goto(
            `/${encodeURIComponent($currentServer.invite)}/${encodeURIComponent(
                channel.name
            )}`
        );

        setTitle(`#${channel.name} | ${$currentServer.name}`);
    }

    function showChannelOptions(): void {
        if (isRenaming) return;

        $targetChannelModal = channel;

        showDropdownMouse(DropdownTypes.Channel, $mousePos);
    }

    function renameChannel(): void {
        $channelRenamingId = undefined;

        setTimeout(() => {
            isRenaming = false;
        }, 50);

        if (newName.trim() == channel.name) {
            return;
        }

        if (newName.trim().length == 0) {
            newName = channel.name;

            return;
        }

        channel.name = newName;

        // Update current channel too
        if ($currentChannel?.channelId == channel.channelId) {
            $currentChannel = undefined;
        }

        socket.emit('renameChannel', {
            serverId: $currentServer.serverId,
            channelId: channel.channelId,
            name: newName,
        });
    }

    onMount(() => {
        unsubscribe = channelRenamingId.subscribe((id) => {
            if (!id || id != channel.channelId) return;

            if (inputContainer) {
                newName = channel.name;

                isRenaming = true;

                setTimeout(() => {
                    inputContainer.focus();

                    inputContainer.onkeydown = (ev) => {
                        if (ev.key == 'Escape') {
                            newName = channel.name;
                            $channelRenamingId = undefined;
                        } else if (ev.key == 'Enter') renameChannel();
                    };

                    inputContainer.onblur = renameChannel;
                }, 50);
            }
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });
</script>

<div
    class={`prop-container ${
        ($currentChannel && $currentChannel?.channelId == channel.channelId) ||
        ($targetChannelModal?.channelId == channel.channelId &&
            $dropdownVisible &&
            $currentDropdownId == DropdownTypes.Channel)
            ? 'active'
            : ''
    } ${$channelRenamingId == channel.channelId ? 'renaming' : ''}`}
    on:click={enterChannel}
    on:keydown={enterChannel}
    on:contextmenu={(ev) => {
        if ($ourData.profileId != $currentServer.ownerId) return;

        showChannelOptions();

        ev.preventDefault();
    }}
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        ><path
            fill-rule="evenodd"
            d="M10.723 3.2a.75.75 0 1 0-1.446-.4L7.763 8.25H4a.75.75 0 1 0 0 1.5h3.347l-1.528 5.5H2a.75.75 0 0 0 0 1.5h3.402L4.277 20.8a.75.75 0 0 0 1.446.4l1.236-4.45h7.443l-1.125 4.05a.75.75 0 0 0 1.446.4l1.236-4.45H20a.75.75 0 1 0 0-1.5h-3.624l1.527-5.5H22a.75.75 0 0 0 0-1.5h-3.68l1.403-5.05a.75.75 0 1 0-1.446-.4l-1.514 5.45H9.32l1.403-5.05Zm4.096 12.05l1.528-5.5H8.903l-1.527 5.5h7.443Z"
            clip-rule="evenodd"
        /></svg
    >

    <input bind:this={inputContainer} bind:value={newName} maxlength={20} />

    <h1 id="name">{channel.name}</h1>
</div>

<style>
    .prop-container {
        display: flex;
        align-items: center;
        margin-bottom: 2px;
        border-radius: 5px;
        padding-left: 10px;
        padding-right: 30px;
        margin-left: 10px;
        overflow: hidden;
        cursor: pointer;
        height: 38px;
        text-align: center;
        transition: 125ms;
    }

    .prop-container:hover {
        background: var(--secondary);
    }

    .prop-container:active {
        background: var(--secondary);
    }

    .active {
        background: var(--secondary);
    }

    .prop-container:hover #name,
    .active #name {
        color: var(--text);
    }

    .preview:hover {
        background: var(--bg);
    }

    .renaming {
        background: transparent;
        cursor: default;
    }

    .renaming:hover {
        background: transparent;
    }

    svg {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        margin-right: 5px;
        fill: var(--gray);
    }

    #name {
        min-width: 140px;
        max-width: 140px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.95rem;
        text-align: start;
        transition: 125ms color;
        margin-left: 5px;
        color: var(--text_gray);
    }

    input {
        display: none;
        padding: 0;
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 3px;
        background: transparent;
        min-width: 140px;
        max-width: 140px;
        font-size: 0.95rem;
        border-radius: 3px;
        border: 2px solid var(--secondary);
        text-align: start;
        transition: 125ms;
        font-weight: 500;
    }

    .renaming input {
        display: initial;
    }

    .renaming #name {
        display: none;
    }

    @keyframes shimmer {
        100% {
            -webkit-mask-position: left;
        }
    }
</style>
