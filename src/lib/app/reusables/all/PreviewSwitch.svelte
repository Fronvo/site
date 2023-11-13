<script lang="ts">
    import { currentToken, secondarySocket } from 'stores/main';
    import { ModalTypes } from 'stores/modals';
    import { setKey } from 'utilities/global';
    import { removeSavedAcount, showModal } from 'utilities/main';
    import { resetLocalTheme } from 'utilities/themes';

    export let avatar: string;
    export let username: string;
    export let token: string;

    function login(): void {
        // First, validate the token
        secondarySocket.emit('loginToken', { token }, ({ err }) => {
            if (!err) {
                // Then, update localStorage and refresh fronvo
                setKey('token', token);

                resetLocalTheme();

                location.href = '/app';
            } else {
                // Token is invalid, remove
                remove();
            }
        });
    }

    function remove(): void {
        removeSavedAcount(token);

        showModal(ModalTypes.SwitchAccounts);
    }
</script>

<div class="switch-container">
    {#if avatar}
        <img
            id="avatar"
            src={avatar}
            alt={`${username}'s avatar`}
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
        <h1 id="username">{username}</h1>

        <!-- Only valid comparison -->
        {#if token == $currentToken}
            <h1 id="indicator">Active</h1>
        {/if}
    </div>

    {#if $currentToken != token}
        <button id="login" on:click={login}>Login</button>
        <button id="remove" on:click={remove}>Remove</button>
    {/if}
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
        background: var(--bg);
        border-top: 2px solid var(--primary);
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
    }

    #login {
        color: white;
        margin-right: 10px;
        background: var(--branding);
    }

    #login:hover {
        background: var(--branding_darken);
    }

    #remove:hover {
        color: red;
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
        color: var(--text);
    }

    #indicator {
        text-align: start;
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--branding);
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>
