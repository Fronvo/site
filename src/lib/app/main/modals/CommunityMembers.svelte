<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';
    import { joinedCommunity } from 'stores/communities';
    import { DropdownTypes, type ModalData } from 'types/main';
    import {
        cachedAccountData,
        dropdownVisible,
        targetCommunityMember,
    } from 'stores/main';
    import {
        dismissDropdown,
        dismissModal,
        fetchUser,
        findCachedAccount,
        setProgressBar,
        showDropdown,
    } from 'utilities/main';
    import { loadProfilePanel } from 'utilities/profile';
    import { dataSaver } from 'stores/all';
    import { ourProfileData } from 'stores/profile';
    import ModalTemplate from '../ModalTemplate.svelte';
    import { onMount } from 'svelte';

    let memberInfo: FronvoAccount[] = [];
    const memberInfoCopy = $dataSaver
        ? $joinedCommunity.members.slice(0, 20)
        : $joinedCommunity.members;
    let loadingFinished = false;

    function isOwner(profileId?: string): boolean {
        return (
            $joinedCommunity.ownerId == (profileId || $ourProfileData.profileId)
        );
    }

    async function loadCommunityMembers() {
        setProgressBar(true);

        // Fetch all community members, notify UI once finished
        for (const memberIndex in memberInfoCopy) {
            const targetUser = findCachedAccount(
                memberInfoCopy[memberIndex],
                $cachedAccountData
            );

            if (targetUser) {
                memberInfo.push(targetUser);

                checkLoadingFinished();
            } else {
                // Not cached, fetch
                fetchUser(memberInfoCopy[memberIndex]).then((user) => {
                    memberInfo.push(user);

                    // Update cache
                    $cachedAccountData.push(user);

                    checkLoadingFinished();
                });
            }
        }

        function checkLoadingFinished(): void {
            // Finish loading
            if (memberInfo.length == memberInfoCopy.length) {
                loadingFinished = true;
                setProgressBar(false);
            }
        }
    }

    function editProfile(accountIndex: number): void {
        if ($dropdownVisible) {
            dismissDropdown();
        } else {
            $targetCommunityMember = memberInfo[accountIndex];

            showDropdown(DropdownTypes.CommunityMember);
        }
    }

    onMount(async () => {
        await loadCommunityMembers();
    });

    const data: ModalData = {
        titlePreSpan: $joinedCommunity.members.length,
        title: 'Members',

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
        <div class="members-items-container">
            {#each memberInfo as { profileId, username, following, followers, avatar, isFollower, isPrivate, isSelf }, i}
                <div
                    class={isOwner(profileId) ? 'owner-div' : ''}
                    on:click={() => editProfile(i)}
                >
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

    .members-items-container .owner-div {
        box-shadow: 0 0 10px var(--text_color);
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
