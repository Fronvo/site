<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import type { FronvoAccount } from 'interfaces/all';
    import { dataSaver, socket } from 'stores/all';
    import { dropdownVisible, targetCommunityMember } from 'stores/main';
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { DropdownTypes, type ModalData } from 'types/main';
    import {
        dismissDropdown,
        dismissModal,
        setProgressBar,
        showDropdown,
    } from 'utilities/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    // Cap at 20 max loaded
    let loadingFinished = false;
    const bansInfo: Writable<FronvoAccount[]> = writable([]);

    async function loadBannedMembers(): Promise<void> {
        return new Promise((resolve) => {
            socket.emit('showBannedMembers', ({ bannedMembers }) => {
                // Save data
                if ($dataSaver) {
                    bannedMembers = bannedMembers.splice(0, 10);
                }

                $bansInfo = bannedMembers;

                resolve();
            });
        });
    }

    function editProfile(accountIndex: number): void {
        if ($dropdownVisible) {
            dismissDropdown();
        } else {
            $targetCommunityMember = $bansInfo[accountIndex];

            showDropdown(DropdownTypes.CommunityMemberUnban);
        }
    }

    onMount(async () => {
        setProgressBar(true);

        await loadBannedMembers();

        loadingFinished = true;

        setProgressBar(false);
    });

    const data: ModalData = {
        titlePreSpan: $bansInfo.length,
        title: 'Banned members',

        actions: [
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    {#if loadingFinished}
        {#if $bansInfo.length == 0}
            <Center absolute>
                <h1 class="modal-header">No banned users</h1>
            </Center>
        {:else}
            <div class="members-items-container">
                {#each $bansInfo as { username, following, followers, avatar, isFollower, isPrivate, isSelf }, i}
                    <div on:click={() => editProfile(i)}>
                        <img
                            id="avatar"
                            src={avatar && !$dataSaver
                                ? avatar
                                : '/svgs/profile/avatar.svg'}
                            alt={`${username}'s avatar`}
                            draggable={false}
                        />
                        <h1 id="username">{username}</h1>

                        <h1 id="following">
                            <span
                                >{isFollower || isSelf || !isPrivate
                                    ? following.length
                                    : '?'}</span
                            > following
                        </h1>

                        <h1 id="followers">
                            <span
                                >{isFollower || isSelf || !isPrivate
                                    ? followers.length
                                    : '?'}</span
                            > followers
                        </h1>
                    </div>
                {/each}
            </div>
        {/if}
    {/if}
</ModalTemplate>

<style>
    .members-items-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        overflow-y: auto;
        flex: 1;
    }

    .members-items-container div {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: transparent;
        box-shadow: 0 0 10px var(--accent_shadow_color);
        width: 200px;
        margin-top: 15px;
        margin-bottom: 15px;
        margin-right: 10px;
        margin-left: 10px;
        height: 235px;
        overflow: hidden;
        border-radius: 5px;
        padding: 10px;
        transition: 200ms;
        cursor: pointer;
    }

    .members-items-container div:hover {
        opacity: 0.8;
    }

    .members-items-container div h1 {
        margin: 0;
    }

    .members-items-container div h1 span {
        color: var(--profile_info_color);
    }

    .members-items-container div #username {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.9rem;
        color: var(--profile_info_color);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .members-items-container div #following,
    .members-items-container div #followers {
        font-size: 1.7rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .members-items-container div #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-members: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 100px;
        height: 100px;
        border-radius: 10px;
    }

    @media screen and (max-width: 1100px) {
        .members-items-container {
            flex-direction: column;
            justify-content: start;
            flex-wrap: nowrap;
        }

        .members-items-container div {
            width: 300px;
            height: 75px;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 10px;
            margin-bottom: 5px;
            cursor: default;
        }

        .members-items-container div:hover {
            opacity: 1;
        }

        .members-items-container div:nth-child(1) {
            margin-left: 10px;
        }

        .members-items-container div #username {
            font-size: 1.7rem;
            cursor: default;
        }

        .members-items-container div #following,
        .members-items-container div #followers {
            display: none;
        }

        .members-items-container div #avatar {
            width: 64px;
            height: 64px;
            margin-right: 5px;
        }
    }

    @media screen and (max-width: 520px) {
        .members-items-container div {
            height: 65px;
        }

        .members-items-container div #username {
            font-size: 1.5rem;
        }

        .members-items-container div #avatar {
            width: 58px;
            height: 58px;
        }
    }
</style>
