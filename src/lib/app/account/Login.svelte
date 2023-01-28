<script lang="ts">
    import type { FronvoError } from 'interfaces/all';
    import {
        accountPanelAnimDuration,
        accountRegisterTab,
        accountResetPasswordTab,
    } from 'stores/account';
    import { loginSucceeded } from 'stores/main';
    import { socket } from 'stores/all';
    import { onMount, onDestroy } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import { setKey } from 'utilities/global';
    import { dismissModal } from 'utilities/main';
    import { homePosts } from 'stores/home';

    let email: string;
    let password: string;
    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let loginButton: HTMLButtonElement;
    let isLoggingIn = false;
    let isErrorVisible = false;
    let errorMessage: string;

    function keyListener(ev: KeyboardEvent): void {
        if (ev.key == 'Enter') {
            login();
        }

        if (ev.ctrlKey || ev.altKey) return;

        if (!email) {
            emailInput.focus();
            return;
        }

        passwordInput.focus();
    }

    onMount(() => {
        emailInput = document.getElementById('email-input') as HTMLInputElement;
        passwordInput = document.getElementById(
            'password-input'
        ) as HTMLInputElement;
        loginButton = document.getElementById(
            'login-button'
        ) as HTMLButtonElement;

        document.addEventListener('keypress', keyListener);
    });

    onDestroy(() => {
        document.removeEventListener('keypress', keyListener);
    });

    function login(): void {
        isLoggingIn = true;

        function toggleUI(state: boolean): void {
            emailInput.disabled = !state;
            passwordInput.disabled = !state;
            loginButton.disabled = !state;

            isLoggingIn = !state;
        }

        function setError(error: FronvoError): void {
            isErrorVisible = true;
            errorMessage = error.err.msg;
        }

        function attemptLogin(): void {
            socket.emit('login', { email, password }, ({ err, token }) => {
                if (err) {
                    setError({ err });
                    toggleUI(true);
                } else {
                    setKey('token', token);
                    $homePosts = undefined;
                    $loginSucceeded = true;

                    dismissModal();
                }
            });
        }

        toggleUI(false);

        attemptLogin();
    }

    function changeTab(): void {
        if (isLoggingIn) return;

        $accountRegisterTab = true;
    }

    function resetPasswordTab(): void {
        $accountResetPasswordTab = true;
    }
</script>

<div
    class="account-container"
    transition:scale={{ duration: accountPanelAnimDuration, start: 1.1 }}
>
    <h1 id="header">Login to account</h1>

    {#if isErrorVisible}
        <h1 id="error-header" in:fade={{ duration: 500 }}>
            {errorMessage}
        </h1>
    {/if}

    <h1 id="input-header">Email</h1>
    <input id="email-input" bind:value={email} maxlength={120} />

    <h1 id="input-header">Password</h1>
    <input
        id="password-input"
        bind:value={password}
        type="password"
        maxlength={90}
    />

    <h1 id="reset-redirect" on:click={resetPasswordTab}>Reset password</h1>

    <br />

    <button id="login-button" on:click={login}>Login</button>

    <h1 id="register-redirect" on:click={changeTab}>New to Fronvo?</h1>
</div>

<style>
    .account-container {
        position: fixed;
        border-radius: 10px;
        background: rgb(111, 28, 236);
        padding: 20px 30px 20px 30px;
        box-shadow: 0 0 5px black;
        text-align: center;
        width: 550px;
    }

    .account-container #header {
        color: white;
        text-align: center;
        font-size: 3rem;
        margin: 10px 10px 40px 10px;
    }

    .account-container #error-header {
        color: red;
        font-size: 2rem;
        margin: 0;
        width: 100%;
    }

    .account-container #email-input,
    .account-container #password-input {
        color: white;
        background: transparent;
        border-radius: 12px;
        border: 3px solid white;
    }

    .account-container #input-header {
        color: white;
        margin: 0;
        margin-bottom: 5px;
        font-size: 2.1rem;
        text-align: start;
    }

    .account-container input {
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 95%;
    }

    .account-container #reset-redirect {
        color: white;
        cursor: pointer;
        margin: 0;
        transition: 250ms color;
        font-size: 2rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: max-content;
    }

    .account-container #reset-redirect:hover {
        color: rgb(233, 206, 255);
    }

    .account-container button {
        font-size: 2.5rem;
        margin-top: 25px;
        width: 90%;
        border: 3px solid white;
        padding: 7px;
    }

    .account-container #register-redirect {
        color: white;
        cursor: pointer;
        margin-top: 40px;
        margin-bottom: 0;
        transition: 250ms color;
        font-size: 2rem;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .account-container #register-redirect:hover {
        color: rgb(233, 206, 255);
    }

    @media screen and (max-width: 720px) {
        .account-container {
            width: 450px;
        }

        .account-container #header {
            font-size: 2.5rem;
        }

        .account-container #error-header {
            font-size: 1.7rem;
        }

        .account-container #input-header {
            font-size: 1.7rem;
        }

        .account-container input {
            font-size: 1.7rem;
        }

        .account-container #reset-redirect {
            font-size: 1.7rem;
            cursor: default;
        }

        .account-container button {
            font-size: 2.2rem;
            cursor: default;
        }

        .account-container #register-redirect {
            font-size: 1.7rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .account-container {
            width: 350px;
        }

        .account-container #header {
            font-size: 1.8rem;
        }

        .account-container #error-header {
            font-size: 1.4rem;
        }

        .account-container #input-header {
            font-size: 1.4rem;
        }

        .account-container input {
            font-size: 1.4rem;
        }

        .account-container #reset-redirect {
            font-size: 1.4rem;
        }

        .account-container button {
            font-size: 1.7rem;
        }

        .account-container #register-redirect {
            font-size: 1.4rem;
        }
    }
</style>
