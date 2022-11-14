<script lang="ts">
    import { socket } from 'stores/all';
    import { fade } from 'svelte/transition';
    import { dismissModal } from 'utilities/main';
    import { loadCommunitiesPanel } from 'utilities/communities';
    import type { ModalData } from 'types/main';
    import ModalTemplate from '../ModalTemplate.svelte';

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
            async ({ err }) => {
                if (err) {
                    errorMessage = err.msg;
                    isJoining = false;

                    return;
                }

                dismissModal();

                // Update community panel
                await loadCommunitiesPanel();
            }
        );
    }

    const data: ModalData = {
        title: 'Join Community',

        actions: [
            {
                title: 'Join',
                callback: joinCommunity,
            },
            {
                title: 'Dismiss',
                callback: dismissModal,
            },
        ],

        removeTransparency: true,
    };
</script>

<ModalTemplate {data}>
    {#if errorMessage}
        <h1 id="error-header" in:fade={{ duration: 500 }}>
            {errorMessage}
        </h1>
    {/if}

    <h1 id="input-header">Invite code</h1>
    <!-- svelte-ignore a11y-autofocus -->
    <input autofocus bind:value={inviteCode} maxlength={15} />
</ModalTemplate>

<style>
    #error-header {
        color: red;
        font-size: 2rem;
        margin: 0;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    #input-header {
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

    input {
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 70%;
        max-width: 400px;
        text-align: center;
        background: var(--modal_input_bg_color);
    }

    @media screen and (max-width: 720px) {
        #error-header {
            font-size: 1.7rem;
        }

        #input-header {
            font-size: 1.7rem;
        }

        input {
            font-size: 1.7rem;
        }
    }

    @media screen and (max-width: 520px) {
        #error-header {
            font-size: 1.4rem;
        }

        #input-header {
            font-size: 1.4rem;
        }

        input {
            font-size: 1.4rem;
        }
    }
</style>
