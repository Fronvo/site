<script lang="ts">
    import { accountRegisterVerifyTab } from 'stores/app/account';
    import { homePosts } from 'stores/app/home';
    import { loginSucceeded, modalAnimDuration } from 'stores/app/main';
    import { targetProfile, userData } from 'stores/app/profile';
    import { socket } from 'stores/global';
    import { ModalTypes } from 'types/app/main';
    import { dismissModal, showModal } from 'utilities/app/main';
    import { removeKey } from 'utilities/global';

    function logout(): void {
        dismissModal();

        setTimeout(() => {
            socket.emit('logout', ({ err }) => {
                if (err) return;

                removeKey('token');
                $accountRegisterVerifyTab = false;
                $loginSucceeded = false;

                // Also reset userData, update smoothly on re-login
                $userData = undefined;
                $targetProfile = undefined;

                // And home posts
                $homePosts = undefined;
            });
        }, modalAnimDuration);
    }
</script>

<div class="settings-container">
    <div class="header-container">
        <h1 id="header">Control Center</h1>
    </div>

    <hr />

    <div class="data-container">
        <button on:click={() => showModal(ModalTypes.EditProfile)}
            >Edit Profile</button
        >
        <button on:click={() => showModal(ModalTypes.CreatePost)}
            >Create Post</button
        >
        <button on:click={() => showModal(ModalTypes.FindProfiles)}
            >Find Profiles</button
        >
        <button on:click={logout}>Logout</button>
    </div>

    <button id="close" on:click={() => dismissModal()}>Close</button>
</div>

<style>
    hr {
        width: 100px;
    }

    .settings-container {
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
        flex: 1;
        justify-content: center;
        align-items: center;
    }

    .data-container button {
        width: max-content;
        font-size: 2.2rem;
        margin-bottom: 20px;
    }

    .data-container button:nth-last-child(1) {
        margin-bottom: 0;
    }

    #close {
        font-size: 2.2rem;
        margin-bottom: 15px;
    }

    @media screen and (max-width: 720px) {
        .header-container #header {
            font-size: 2.4rem;
        }

        .data-container button {
            font-size: 1.8rem;
            margin-bottom: 15px;
            cursor: default;
        }

        .data-container button:nth-last-child(1) {
            margin-bottom: 0;
        }

        #close {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2rem;
        }

        .data-container button {
            font-size: 1.5rem;
        }

        #close {
            font-size: 1.5rem;
        }
    }
</style>
