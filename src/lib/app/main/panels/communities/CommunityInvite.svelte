<script lang="ts">
    import { targetCommunityData } from 'stores/communities';
    import { dataSaver, socket } from 'stores/all';
    import { fade } from 'svelte/transition';
    import { loadCommunitiesPanel } from 'utilities/communities';

    let isJoining = false;

    function joinCommunity(): void {
        if (isJoining) return;

        isJoining = true;

        socket.emit(
            'joinCommunity',
            { communityId: $targetCommunityData.communityId },
            async ({ err }) => {
                if (!err) {
                    // Update community panel
                    await loadCommunitiesPanel();
                } else {
                    isJoining = false;
                }
            }
        );
    }

    function formatDate(): string {
        return new Date($targetCommunityData.creationDate).toLocaleDateString(
            undefined,
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            }
        );
    }

    async function rejectInvite(): Promise<void> {
        if (isJoining) return;

        await loadCommunitiesPanel();
    }
</script>

{#if $targetCommunityData}
    <div class="invite-container" in:fade={{ duration: 500, delay: 250 }}>
        <h1 id="invite-info">You have been invited to a community!</h1>

        <div
            class="community-container"
            in:fade={{ duration: 500, delay: 250 }}
        >
            <img
                id="avatar"
                src={$targetCommunityData.icon && !$dataSaver
                    ? $targetCommunityData.icon
                    : '/svgs/profile/avatar.svg'}
                alt={`${$targetCommunityData.name} community avatar`}
                draggable={false}
            />
            <h1 id="name">{$targetCommunityData.name}</h1>

            <h1 id="description">{$targetCommunityData.description}</h1>
            <h1 id="creation-date">Created <span>{formatDate()}</span></h1>
            <h1 id="owner">
                Owned by <span>{$targetCommunityData.ownerId}</span>
            </h1>
            <h1 id="members">
                <span>{$targetCommunityData.members.length}</span>
                member{$targetCommunityData.members.length != 1 ? 's' : ''}
            </h1>
        </div>

        <div class="options-container">
            <button on:click={joinCommunity}>Join</button>

            <button on:click={rejectInvite}>Reject</button>
        </div>
    </div>
{/if}

<style>
    #invite-info {
        font-size: 2.5rem;
        margin: 0;
        margin-bottom: 10px;
        color: var(--text_color);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
    }

    .invite-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 95vh;
    }

    .community-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px var(--accent_shadow_color);
        width: 450px;
        height: min-content;
        border-radius: 10px;
        padding: 10px;
        transition: 400ms background;
        cursor: pointer;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .community-container:hover {
        background-position: right center;
    }

    .community-container #avatar {
        width: 128px;
        height: 128px;
        margin-bottom: 5px;
    }

    .community-container #name {
        color: var(--profile_info_color);
        font-size: 2.5rem;
        margin: 0;
        text-align: center;
    }

    .community-container #description {
        color: var(--profile_info_color);
        font-size: 2rem;
        text-align: center;
        flex: 1;
    }

    .community-container #creation-date {
        margin: 0;
        margin-bottom: 15px;
        font-size: 1.9rem;
    }

    .community-container #creation-date span {
        color: var(--profile_info_color);
    }

    .community-container #owner {
        margin: 0;
        margin-bottom: 15px;
        font-size: 1.9rem;
    }

    .community-container #owner span {
        color: var(--profile_info_color);
    }

    .community-container #members {
        margin: 0;
        font-size: 1.9rem;
    }

    .community-container #members span {
        color: var(--profile_info_color);
    }

    .options-container {
        display: flex;
        margin-top: 50px;
    }

    .options-container button {
        font-size: 2.2rem;
        margin-right: 20px;
    }

    @media screen and (max-width: 720px) {
        #invite-info {
            font-size: 2rem;
        }

        .invite-container {
            justify-content: initial;
        }

        .community-container {
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 5px;
            cursor: default;
        }

        .community-container #name {
            font-size: 2.2rem;
        }

        .community-container #description {
            font-size: 1.8rem;
        }

        .community-container #creation-date {
            font-size: 1.6rem;
        }

        .community-container #owner {
            font-size: 1.6rem;
        }

        .community-container #members {
            font-size: 1.6rem;
        }

        .options-container button {
            font-size: 1.8rem;
        }
    }

    @media screen and (max-width: 520px) {
        #invite-info {
            font-size: 1.8rem;
        }

        .community-container {
            width: 280px;
        }

        .community-container #avatar {
            width: 86px;
            height: 86px;
        }

        .community-container #name {
            font-size: 2rem;
        }

        .community-container #description {
            font-size: 1.5rem;
        }

        .community-container #creation-date {
            font-size: 1.4rem;
        }

        .community-container #owner {
            font-size: 1.4rem;
        }

        .community-container #members {
            font-size: 1.4rem;
        }

        .options-container {
            margin-top: 25px;
        }

        .options-container button {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
