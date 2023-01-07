<script lang="ts">
    import Loading from '$lib/app/Loading.svelte';
    import type { FronvoAccount } from 'interfaces/all';
    import { joinedCommunity } from 'stores/communities';
    import { ModalTypes, type ModalData } from 'types/main';
    import { targetCommunityMember } from 'stores/main';
    import { dismissModal, fetchUser, showModal } from 'utilities/main';
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
            $joinedCommunity.ownerId ==
            (profileId ? profileId : $ourProfileData.profileId)
        );
    }

    async function loadFollowInfo() {
        // Fetch all community members, notify UI once finished

        for (const memberIndex in memberInfoCopy) {
            fetchUser(memberInfoCopy[memberIndex]).then((user) => {
                memberInfo.push(user);

                // Finish loading
                if (memberInfo.length == memberInfoCopy.length) {
                    loadingFinished = true;
                }
            });
        }
    }

    async function viewProfile(accountIndex: number): Promise<void> {
        dismissModal();

        await loadProfilePanel(memberInfo[accountIndex].profileId);
    }

    function editProfile(accountIndex: number): void {
        dismissModal(() => {
            $targetCommunityMember = memberInfo[accountIndex];

            showModal(ModalTypes.EditCommunityMember);
        });
    }

    onMount(async () => {
        await loadFollowInfo();
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
                    on:click={() =>
                        isOwner() && !($ourProfileData.profileId == profileId)
                            ? editProfile(i)
                            : viewProfile(i)}
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
    {:else}
        <Loading text="Loading..." />
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
        background: var(--accent_bg_color);
        box-shadow: 0 0 5px var(--accent_shadow_color);
        width: 300px;
        margin-top: 15px;
        margin-bottom: 15px;
        margin-right: 10px;
        margin-left: 10px;
        height: min-content;
        border-radius: 10px;
        padding: 10px;
        transition: 400ms background;
        cursor: pointer;
    }

    .members-items-container div h1 {
        margin: 0;
    }

    .members-items-container div h1 span {
        color: var(--profile_info_color);
    }

    .members-items-container div #username {
        font-size: 2.5rem;
        color: var(--profile_info_color);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .members-items-container div .owner-div #username {
        color: gold;
    }

    .members-items-container div #following,
    .members-items-container div #followers {
        font-size: 2.1rem;
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
        width: 128px;
        height: 128px;
        border-radius: 10px;
    }

    @media screen and (max-width: 1085px) {
        .members-items-container div {
            width: 300px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            margin: 10px;
            margin-bottom: 5px;
            cursor: default;
        }

        .members-items-container div:nth-child(1) {
            margin-left: 10px;
        }

        .members-items-container div #username {
            font-size: 1.7rem;
            cursor: default;
        }

        .members-items-container div #following,
        #followers {
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
            width: 280px;
            margin-right: 0;
            margin-bottom: 10px;
            padding: 5px;
        }

        .members-items-container div #username {
            font-size: 1.7rem;
        }

        .members-items-container div #following,
        .members-items-container div #followers {
            font-size: 1.7rem;
        }
    }
</style>
