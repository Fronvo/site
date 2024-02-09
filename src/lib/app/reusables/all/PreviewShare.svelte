<script lang="ts">
    import { socket } from 'stores/main';

    export let avatar: string;
    export let profileId: string;
    export let postId: string;

    let shared = false;

    function sharePost(): void {
        if (shared) return;

        shared = true;

        socket.emit('sendPost', {
            profileId,
            postId,
        });
    }
</script>

<div class="switch-container">
    <img
        id="avatar"
        src={avatar ? avatar : '/images/avatar.png'}
        alt={`${profileId}'s avatar`}
        draggable={false}
    />

    <div class="bottom-container">
        <h1 id="username">{profileId}</h1>
    </div>

    <button disabled={shared} id="share" on:click={sharePost}
        >{shared ? 'Post shared' : 'Share post'}</button
    >
</div>

<style>
    .switch-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        cursor: default;
        width: 75%;
        padding: 8px;
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

    button {
        font-size: 1rem;
        box-shadow: none;
        transition: 125ms;
        background: transparent;
        font-weight: 600;
    }

    #share {
        color: white;
        margin-right: 10px;
        background: var(--primary);
    }

    #share:hover {
        background: var(--tertiary);
    }

    #share:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    #share:disabled:hover {
        background: var(--primary);
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
        cursor: default;
    }

    .bottom-container {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    #username {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 1.1rem;
        text-align: start;
        color: white;
    }
</style>
