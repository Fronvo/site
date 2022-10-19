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
                            : '/svgs/profile/default.svg'}
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
        background: var(--nav_bg_color);
        box-shadow: 0 0 10px var(--nav_shadow_color);
        width: 350px;
        height: min-content;
        border-radius: 10px;
        padding: 10px;
        margin-right: 25px;
        margin-bottom: 20px;
        transition: 400ms background;
        cursor: pointer;
        background-size: 200% auto;
        background-image: linear-gradient(
            to right,
            rgba(0, 0, 0, 1%) 0%,
            rgba(146, 73, 255, 20%) 51%,
            rgba(0, 0, 0, 1%) 100%
        );
    }

    .members-items-container div:hover {
        background-position: right center;
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

    @media screen and (max-width: 720px) {
        .members-items-container div {
            width: 300px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 5px;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: default;
        }

        .members-items-container div:first-child {
            padding-top: 0;
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
