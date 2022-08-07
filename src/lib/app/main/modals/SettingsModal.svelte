<script lang="ts">
    import ThemeSwitch from '$lib/all/ThemeSwitch.svelte';
    import Close from '$lib/svgs/Close.svelte';
    import { accountRegisterVerifyTab } from 'stores/app/account';
    import {
        loginSucceeded,
        modalAnimDuration,
        modalVisible,
    } from 'stores/app/main';
    import { targetProfile, userData } from 'stores/app/profile';
    import { socket } from 'stores/global';
    import { removeKey } from 'utilities/global';

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
        <h1 id="header">Settings</h1>
    </div>

    <hr />

    <div class="data-container">
        <div>
            <h1>Exit your account</h1>
            <button on:click={logout}>Logout</button>
        </div>
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
        width: 50%;
        min-width: 500px;
    }

    .data-container div {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        align-items: center;
        margin-bottom: 25px;
        flex-wrap: wrap;
    }

    .data-container div h1 {
        margin: 0;
        margin-right: 15px;
        font-size: 2.4rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .data-container div button {
        font-size: 2.2rem;
    }

    #close {
        font-size: 2.2rem;
        margin-bottom: 15px;
    }

    @media screen and (max-width: 720px) {
        .header-container #header {
            font-size: 2.4rem;
        }

        .data-container {
            width: 400px;
            min-width: auto;
        }

        .data-container div h1 {
            font-size: 2.1rem;
        }

        .data-container div button {
            font-size: 1.8rem;
            cursor: default;
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

        .data-container {
            width: 300px;
        }

        .data-container div h1 {
            font-size: 1.8rem;
        }

        .data-container div button {
            font-size: 1.5rem;
        }

        #close {
            font-size: 1.5rem;
        }
    }
</style>
