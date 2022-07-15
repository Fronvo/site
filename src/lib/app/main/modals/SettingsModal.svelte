<script lang="ts">
    import ThemeSwitch from '$lib/all/ThemeSwitch.svelte';
    import Close from '$lib/svgs/Close.svelte';
    import { accountRegisterVerifyTab } from 'stores/app/account';
    import {
        loginSucceeded,
        modalAnimDuration,
        modalVisible,
    } from 'stores/app/main';
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
            });
        }, modalAnimDuration);
    }
</script>

<div class="header-container">
    <Close />
    <h1 id="header">Settings</h1>
</div>

<hr />

<div class="options-container">
    <div>
        <h1>Theme</h1>
        <ThemeSwitch />
    </div>

    <div>
        <button on:click={logout}>Logout</button>
    </div>
</div>

<style>
    hr {
        width: 100px;
        margin-bottom: 20px;
    }

    .header-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header-container #header {
        font-size: 3rem;
        margin: 0;
        padding-right: 40px;
    }

    .options-container div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 25px;
        flex-wrap: wrap;
    }

    .options-container div h1 {
        margin: 0;
        margin-right: 15px;
        font-size: 2.4rem;
    }

    .options-container div button {
        font-size: 2.2rem;
    }

    @media screen and (max-width: 720px) {
        .header-container #header {
            font-size: 2.7rem;
        }

        .options-container div h1 {
            font-size: 2.1rem;
        }

        .options-container div button {
            font-size: 1.8rem;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2.3rem;
        }

        .options-container div h1 {
            font-size: 1.8rem;
        }

        .options-container div button {
            font-size: 1.6rem;
        }
    }
</style>
