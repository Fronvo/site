<script lang="ts">
    import { currentToken, isMobile, secondarySocket } from 'stores/main';
    import { ModalTypes } from 'stores/modals';
    import { setKey } from 'utilities/global';
    import { removeSavedAcount, showModal } from 'utilities/main';

    export let avatar: string;
    export let profileId: string;
    export let token: string;

    function login(): void {
        // First, validate the token
        secondarySocket.emit('loginToken', { token }, ({ err }) => {
            if (!err) {
                // Then, update localStorage and refresh fronvo
                setKey('token', token);

                location.href = '/profile';
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

<div class={`switch-container ${$isMobile ? 'mobile' : ''}`}>
    <img
        id="avatar"
        src={avatar ? avatar : '/images/avatar.png'}
        alt={`${profileId}'s avatar`}
        draggable={false}
    />

    <div class="bottom-container">
        <h1 id="username">{profileId}</h1>

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
        backdrop-filter: none;
        font-weight: 500;
    }

    #login {
        color: white;
        margin-right: 10px;
        background: rgb(125, 125, 125, 0.15);
        backdrop-filter: blur(10px);
        font-weight: 600;
    }

    #login:hover {
        background: rgb(125, 125, 125, 0.3);
    }

    #remove {
        color: white;
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
        color: white;
    }

    #indicator {
        text-align: start;
        font-size: 0.8rem;
        font-weight: 700;
        color: white;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    @media screen and (max-width: 850px) {
        .mobile {
            width: 90%;
        }

        .mobile #username {
            font-size: 0.9rem;
        }

        .mobile #indicator {
            font-size: 0.65rem;
        }

        .mobile button {
            font-size: 0.8rem;
        }
    }
</style>
