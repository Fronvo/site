<script lang="ts">
    import { removeKey } from 'src/utilities/global';
    import { accountRegisterVerifyTab } from 'stores/app/account';
    import {
        loginSucceeded,
        modalAnimDuration,
        modalVisible,
    } from 'stores/app/main';
    import { targetProfile, userData } from 'stores/app/profile';
    import { socket } from 'stores/global';
    import type { ModalTypes } from 'types/app/main';
    import { showModal } from 'utilities/app/main';

    function switchModal(modalName: ModalTypes) {
        $modalVisible = false;

        setTimeout(() => {
            showModal(modalName);
        }, modalAnimDuration + 15);
    }

    function logout(): void {
        $modalVisible = false;

        setTimeout(() => {
            socket.emit('logout', ({ err }) => {
                if (err) return;

                removeKey('token');
                $accountRegisterVerifyTab = false;
                $loginSucceeded = false;

                // Also reset userData, update smoothly on re-login
                $userData = undefined;
                $targetProfile = undefined;
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
        <button on:click={() => switchModal('EditProfile')}>Edit Profile</button
        >
        <button on:click={() => switchModal('CreatePost')}>Create Post</button>
        <button on:click={() => switchModal('FindProfiles')}
            >Find Profiles</button
        >
        <button on:click={logout}>Logout</button>
    </div>

    <button id="close" on:click={() => ($modalVisible = false)}>Close</button>
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
