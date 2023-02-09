<script lang="ts">
    import { joinedCommunity } from 'stores/communities';
    import { cachedAccountData, targetCommunityMember } from 'stores/main';
    import { dataSaver, socket } from 'stores/all';
    import { dismissModal, setProgressBar } from 'utilities/main';
    import { loadProfilePanel } from 'utilities/profile';
    import { fetchCommunity } from 'utilities/communities';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';

    async function viewProfile(): Promise<void> {
        dismissModal();

        await loadProfilePanel(
            $cachedAccountData,
            $targetCommunityMember.profileId
        );
    }

    function hasChatPerms(): boolean {
        return $joinedCommunity.acceptedChatRequests.includes(
            $targetCommunityMember.profileId
        );
    }

    function updateChatPerms(): void {
        setProgressBar(true);

        const newChatPermState = !hasChatPerms();

        socket.emit(
            'updateChatRequest',
            {
                profileId: $targetCommunityMember.profileId,
                accepted: newChatPermState,
            },
            async () => {
                $joinedCommunity = await fetchCommunity(
                    $joinedCommunity.communityId
                );

                dismissModal();
                setProgressBar(false);
            }
        );
    }

    const data: ModalData = {
        title: 'Edit Member',
        noSeperator: true,

        actions: [
            {
                title: 'Close',
                callback: dismissModal,
            },
        ],
    };
</script>

<ModalTemplate {data}>
    <img
        id="avatar"
        alt={`${$targetCommunityMember.username}'s avatar`}
        src={$targetCommunityMember.avatar && !$dataSaver
            ? $targetCommunityMember.avatar
            : '/svgs/profile/avatar.svg'}
        draggable={false}
    />
    <h1 id="username">{$targetCommunityMember.username}</h1>

    {#if $targetCommunityMember.bio}
        <h1 id="bio">{$targetCommunityMember.bio}</h1>
    {/if}

    <button class="modal-button" on:click={viewProfile}>View profile</button>

    <br />

    <button class="modal-button" on:click={updateChatPerms}
        >{hasChatPerms() ? 'Revoke' : 'Give'} chat permission</button
    >
</ModalTemplate>

<style>
    #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 100px;
        height: 100px;
        border-radius: 10px;
    }

    #username {
        font-size: 2.3rem;
        margin: 0;
        margin-right: 10px;
        margin-left: 10px;
        color: var(--profile_info_color);
        text-align: center;
    }

    #bio {
        font-size: 1.4rem;
        margin: 0;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        color: var(--profile_info_color);
        text-align: center;
        white-space: pre-wrap;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
    }

    @media screen and (max-width: 720px) {
        #avatar {
            width: 80px;
            height: 80px;
        }

        #username {
            font-size: 1.8rem;
        }

        #bio {
            font-size: 1.2rem;
        }
    }

    @media screen and (max-width: 520px) {
        #avatar {
            width: 100px;
            height: 100px;
        }

        #username {
            font-size: 1.5rem;
        }

        #bio {
            font-size: 1rem;
        }
    }
</style>
