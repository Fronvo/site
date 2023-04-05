<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { dropdownVisible, type DropdownTypes } from 'stores/dropdowns';
    import { dataSaver, socket } from 'stores/main';
    import { fade } from 'svelte/transition';
    import { dismissDropdown, showDropdown } from 'utilities/main';
    import { onDestroy, onMount } from 'svelte';
    import type { OnlineStatusUpdatedParams } from 'interfaces/account/onlineStatusUpdated';
    import {
        differenceInMinutes,
        differenceInHours,
        differenceInDays,
    } from 'date-fns';

    export let profileData: FronvoAccount;
    export let dropdown: DropdownTypes = undefined;

    export let preDropdownCallback = () => {};

    let statusElement: HTMLHeadingElement;
    let statusListener: ({}: OnlineStatusUpdatedParams) => void;

    function callDropdown(): void {
        if ($dropdownVisible) {
            dismissDropdown();
        } else {
            preDropdownCallback();
            showDropdown(dropdown);
        }
    }

    function updateStatus(state: boolean): void {
        statusElement.classList.add(state ? 'online' : 'offline');
        statusElement.classList.remove(state ? 'offline' : 'online');

        if (!state) {
            // Placeholder if lastOnline is not known, before loading minute difference
            statusElement.textContent = 'Offline';

            if (profileData.lastOnline) {
                // Placeholder
                setFormattedMinutes(profileData.lastOnline);

                // Fetch the latest lastOnline data
                socket.emit(
                    'fetchProfileData',
                    { profileId: profileData.profileId },
                    ({ profileData }) => {
                        setFormattedMinutes(profileData.lastOnline);
                    }
                );
            }

            function setFormattedMinutes(lastOnline: string): void {
                const oldDate = new Date(lastOnline);

                // First minutes
                let timeDifference = differenceInMinutes(new Date(), oldDate);
                let timeSuffix = 'm';

                // Then hours, if applicable
                if (timeDifference > 60) {
                    timeDifference = differenceInHours(new Date(), oldDate);
                    timeSuffix = 'h';

                    // Then days, if applicable
                    if (timeDifference > 24) {
                        timeDifference = differenceInDays(new Date(), oldDate);
                        timeSuffix = 'd';
                    }
                }

                statusElement.textContent = `Offline - ${timeDifference}${timeSuffix}`;
            }
        } else {
            statusElement.textContent = 'Online';
        }
    }

    onMount(() => {
        statusElement = document.getElementById(
            `status-${profileData.profileId}`
        ) as HTMLHeadingElement;

        updateStatus(profileData.online);

        statusListener = ({ profileId, online }) => {
            // Only want to monitor our status
            if (profileId != profileData.profileId) return;

            updateStatus(online);
        };

        socket.on('onlineStatusUpdated', statusListener);
    });

    onDestroy(() => {
        socket.off('onlineStatusUpdated', statusListener);
    });
</script>

<div
    class="preview-container"
    in:fade={{ duration: 150 }}
    on:click={dropdown && callDropdown}
>
    <img
        id="avatar"
        src={profileData.avatar && !$dataSaver
            ? profileData.avatar
            : '/svgs/profile/avatar.svg'}
        alt={`${profileData.username}'s avatar`}
        draggable={false}
    />

    <div class="bottom-container">
        <h1 id="username">
            {profileData?.username}
        </h1>

        <h1
            class="status online offline"
            id={`status-${profileData.profileId}`}
        >
            Status
        </h1>
    </div>
</div>

<style>
    .preview-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        overflow: hidden;
        padding: 12px;
        padding-left: 20px;
        cursor: pointer;
    }

    div:hover {
        background: var(--bg_color);
    }

    div h1 {
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    div #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 48px;
        border-radius: 10px;
        margin-right: 10px;
    }

    .bottom-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .bottom-container #username {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.5rem;
        color: var(--profile_info_color);
        width: 100%;
    }

    .bottom-container .status {
        font-size: 1.2rem;
        width: 100%;
    }

    .bottom-container .online {
        color: rgb(0, 255, 0);
    }

    .bottom-container .offline {
        color: red;
    }
</style>
