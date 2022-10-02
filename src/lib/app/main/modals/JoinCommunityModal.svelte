<script lang="ts">
    import { goto } from '$app/navigation';
    import {
        joinedCommunity,
        targetCommunity,
        targetCommunityData,
    } from 'stores/app/communities';
    import { socket } from 'stores/global';
    import { fade } from 'svelte/transition';
    import { dismissModal } from 'utilities/app/main';

    let inviteCode: string;
    let isJoining = false;
    let canJoin = true;
    let errorMessage: string;

    function joinCommunity(): void {
        if (!canJoin || isJoining) return;

        isJoining = true;

        socket.emit(
            'joinCommunity',
            {
                communityId: inviteCode,
            },
            ({ communityData, err }) => {
                if (err) {
                    errorMessage = err.msg;
                    isJoining = false;

                    return;
                }

                // Update community panel
                $targetCommunity = undefined;
                $targetCommunityData = undefined;
                $joinedCommunity = communityData;

                goto(`/community/${$joinedCommunity.communityId}`, {
                    replaceState: true,
                });

                dismissModal();
            }
        );
    }
</script>

<div class="create-container">
    <div class="header-container">
        <h1 id="header">Join Community</h1>
    </div>

    <hr />

    <div class="data-container">
        {#if errorMessage}
            <h1 id="error-header" in:fade={{ duration: 500 }}>
                {errorMessage}
            </h1>
        {/if}

        <h1 id="input-header">Invite code</h1>
        <!-- svelte-ignore a11y-autofocus -->
        <input autofocus bind:value={inviteCode} maxlength={15} />
    </div>

    <div class="options-container">
        <button on:click={joinCommunity}>Join</button>

        <button
            on:click={() => {
                if (!isJoining) dismissModal();
            }}>Discard</button
        >
    </div>
</div>

<style>
    hr {
        width: 100px;
    }

    .create-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
        overflow-y: auto;
    }

    .header-container {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .header-container #header {
        font-size: 3rem;
        margin: 0;
        padding-right: 5px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .data-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        justify-content: center;
        width: 50%;
        min-width: 500px;
    }

    .data-container #error-header {
        color: red;
        font-size: 2rem;
        margin: 0;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    .data-container #input-header {
        color: var(--profile_info_color);
        margin: 0;
        font-size: 2.2rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .data-container input {
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 70%;
        max-width: 400px;
        text-align: center;
        background: var(--modal_input_bg_color);
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

        .data-container {
            width: 400px;
            min-width: auto;
        }

        .data-container #error-header {
            font-size: 1.7rem;
        }

        .data-container #input-header {
            font-size: 1.7rem;
        }

        .data-container input {
            font-size: 1.7rem;
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

        .data-container {
            width: 300px;
        }

        .data-container #error-header {
            font-size: 1.4rem;
        }

        .data-container #input-header {
            font-size: 1.4rem;
        }

        .data-container input {
            font-size: 1.4rem;
        }

        .options-container button {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
