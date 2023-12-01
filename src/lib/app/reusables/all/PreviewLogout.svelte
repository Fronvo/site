<script lang="ts">
    import type { FronvoAccount } from 'interfaces/all';

    export let profileData: FronvoAccount;
</script>

<div class="switch-container">
    {#if profileData?.avatar}
        <img
            id="avatar"
            src={profileData.avatar}
            alt={`${profileData.username}'s avatar`}
            draggable={false}
        />
    {:else}
        <svg
            id="avatar"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
            ><path
                fill="var(--branding)"
                d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0ZM96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0Z"
            /></svg
        >
    {/if}

    <div class="bottom-container">
        <h1 id="username">{profileData?.profileId}</h1>
    </div>
</div>

<style>
    .switch-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        cursor: default;
        width: 70%;
        padding: 8px;
        border-radius: 5px;
        margin-bottom: 10px;
        border: 2px solid var(--primary);
        border-radius: 10px;
    }

    div h1 {
        margin: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    #avatar {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 36px;
        height: 36px;
        border-radius: 30px;
        margin-right: 8px;
    }

    .bottom-container {
        display: flex;
        flex-direction: column;
    }

    #username {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.1rem;
        color: var(--text);
    }
</style>
