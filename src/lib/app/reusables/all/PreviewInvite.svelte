<script lang="ts">
    import { socket } from 'stores/main';
    import { dmsList } from 'stores/rooms';
    import { findAccountDMId } from 'utilities/rooms';

    export let avatar: string;
    export let profileId: string;
    export let invite: string;
    export let isInServer: boolean;

    let invited = false;

    async function inviteFriend(): Promise<void> {
        if (invited) return;

        invited = true;

        socket.emit('sendMessage', {
            roomId: await findAccountDMId(profileId, $dmsList),
            message: `/invite/${invite}`,
        });
    }
</script>

<div class={`invite-container ${isInServer ? 'hide' : ''}`}>
    <img
        id="avatar"
        src={avatar ? avatar : '/images/avatar.png'}
        alt={`${profileId}'s avatar`}
        draggable={false}
    />

    <div class="bottom-container">
        <h1 id="username">{profileId}</h1>
    </div>

    <button disabled={invited} id="invite" on:click={inviteFriend}
        >{invited ? 'Invite sent' : 'Send invite'}</button
    >
</div>

<style>
    .invite-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        background: transparent;
        cursor: default;
        width: 75%;
        padding: 8px;
    }

    .hide {
        display: none;
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

    #invite {
        color: white;
        margin-right: 10px;
        background: rgb(125, 125, 125, 0.15);
    }

    #invite:hover {
        background: rgb(125, 125, 125, 0.3);
    }

    #invite:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    #invite:disabled:hover {
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
