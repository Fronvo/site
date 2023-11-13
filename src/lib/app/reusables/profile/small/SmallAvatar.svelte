<script lang="ts">
    import { ModalTypes, targetProfileModal } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { showModal } from 'utilities/main';

    export let avatar: string;

    function viewProfile(): void {
        $targetProfileModal = $ourData;

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
            src="/images/avatar.svg"
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

    img {
        border: 20px solid var(--primary);
    }

    #avatar {
        width: 90px;
        height: 90px;
        border: 5px solid var(--primary);
        border-radius: 100px;
        transition: 150ms;
        margin-left: 20px;
        transform: translateY(-40px);
        background: var(--modal_content_bg);
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
