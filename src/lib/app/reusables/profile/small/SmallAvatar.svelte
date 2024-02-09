<script lang="ts">
    import { cachedAccountData } from 'stores/main';
    import { ModalTypes, targetProfileModal } from 'stores/modals';
    import { currentRoomData } from 'stores/rooms';
    import { findCachedAccount, showModal } from 'utilities/main';

    export let profileId: string;
    export let avatar: string;

    async function viewProfile(): Promise<void> {
        // Deleted user
        if (!$currentRoomData.dmUser.profileId) return;

        $targetProfileModal = await findCachedAccount(
            profileId,
            $cachedAccountData
        );

        showModal(ModalTypes.Profile);
    }
</script>

<div class="top-container">
    {#if avatar}
        <img
            id="avatar"
            on:click={viewProfile}
            on:keydown={viewProfile}
            src={avatar}
            alt={`${avatar}`}
            draggable={false}
        />
    {:else}
        <img
            on:click={viewProfile}
            on:keydown={viewProfile}
            src="/images/avatar.png"
            draggable={false}
            alt="Avatar"
            id="avatar"
        />
    {/if}
</div>

<style>
    .top-container {
        display: flex;
        align-items: center;
        flex: 1;
        width: 100%;
    }

    #avatar {
        width: 80px;
        height: 80px;
        border-radius: 100px;
        transition: 150ms;
        margin-left: 20px;
        transform: translateY(-40px);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
    }

    #avatar:hover {
        filter: brightness(80%);
    }
</style>
