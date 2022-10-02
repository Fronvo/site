<script lang="ts">
    import { goto } from '$app/navigation';
    import {
        joinedCommunity,
        ourProfileData,
        targetCommunity,
        targetCommunityData,
    } from 'stores/app/communities';
    import { socket } from 'stores/global';
    import { loadCommunitiesPanel } from 'utilities/app/communities';
    import { dismissModal } from 'utilities/app/main';
    import Center from '$lib/app/Center.svelte';

    let isLeaving = false;

    function isOwner(): boolean {
        return $joinedCommunity.ownerId == $ourProfileData.profileId;
    }

    function leaveCommunity(): void {
        if (isLeaving) return;

        isLeaving = true;

        socket.emit('leaveCommunity', ({ err }) => {
            if (!err) {
                dismissModal(() => {
                    $joinedCommunity = undefined;
                    $targetCommunity = undefined;
                    $targetCommunityData = undefined;

                    loadCommunitiesPanel();

                    goto('/community', {
                        replaceState: true,
                    });
                });
            } else {
                isLeaving = false;
            }
        });
    }
</script>

{#if $joinedCommunity}
    <div class="leave-container">
        <div class="header-container">
            <h1 id="header">{isOwner() ? 'Delete' : 'Leave'} Community</h1>
        </div>

        <hr />

        <Center>
            <h1 id="leave-community">
                {isOwner() ? 'Delete' : 'Leave'} the
                <span>{$joinedCommunity.name}</span> community?
            </h1>
        </Center>

        <div class="options-container">
            <button on:click={leaveCommunity}
                >Yes, {isOwner() ? 'delete' : 'leave'}</button
            >

            <button
                on:click={() => {
                    if (!isLeaving) dismissModal();
                }}>No, {isOwner() ? 'keep' : 'stay'}</button
            >
        </div>
    </div>
{/if}

<style>
    hr {
        width: 100px;
    }

    .leave-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
    }

    .header-container {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .header-container #header {
        font-size: 3rem;
        margin: 0;
        padding-right: 20px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    #leave-community {
        font-size: 3rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
    }

    #leave-community span {
        color: var(--profile_info_color);
    }

    .options-container {
        display: flex;
        margin-bottom: 15px;
        margin-top: 50px;
    }

    .options-container button {
        font-size: 2.2rem;
        margin-right: 20px;
    }

    @media screen and (max-width: 720px) {
        .header-container #header {
            font-size: 2.4rem;
        }

        #leave-community {
            font-size: 2rem;
        }

        .options-container button {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2rem;
        }

        #leave-community {
            font-size: 1.7rem;
        }

        .options-container button {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
