<script lang="ts">
    import type { FronvoError } from 'interfaces/all';
    import {
        accountPanelAnimDuration,
        accountRegisterTab,
        accountResetPasswordFinalTab,
        accountResetPasswordTab,
        accountResetPasswordVerifyTab,
    } from 'stores/account';
    import { socket } from 'stores/all';
    import { onMount, onDestroy } from 'svelte';
    import { fade, scale } from 'svelte/transition';

    let newPassword: string;
    let passwordInput: HTMLInputElement;
    let updateButton: HTMLButtonElement;
    let isErrorVisible = false;
    let errorMessage: string;

    function keyListener(ev: KeyboardEvent): void {
        if (ev.key == 'Enter') {
            reset();
        }

        if (ev.ctrlKey || ev.altKey) return;

        passwordInput.focus();
    }

    onMount(() => {
        passwordInput = document.getElementById(
            'password-input'
        ) as HTMLInputElement;
        updateButton = document.getElementById(
            'update-button'
        ) as HTMLButtonElement;

        document.addEventListener('keypress', keyListener);
    });

    onDestroy(() => {
        document.removeEventListener('keypress', keyListener);
    });

    function reset(): void {
        function toggleUI(state: boolean): void {
            passwordInput.disabled = !state;
            updateButton.disabled = !state;
        }

        function setError(error: FronvoError): void {
            isErrorVisible = true;
            errorMessage = error.err.msg;
        }

        function attemptReset(): void {
            // Little hack to recieve required field messages
            socket.emit('resetPasswordFinal', { newPassword }, ({ err }) => {
                if (err) {
                    setError({ err });
                    toggleUI(true);
                } else {
                    // Complete action, redirect to login
                    $accountResetPasswordTab = false;
                    $accountResetPasswordVerifyTab = false;
                    $accountResetPasswordFinalTab = false;
                    $accountRegisterTab = false;
                }
            });
        }

        toggleUI(false);

        attemptReset();
    }
</script>

<svelte:head>
    <title>Fronvo | Set new password</title>
</svelte:head>

<div
    class="reset-container"
    transition:scale={{ duration: accountPanelAnimDuration, start: 1.1 }}
>
    <h1 id="header">Set new password</h1>

    {#if isErrorVisible}
        <h1 id="error-header" in:fade={{ duration: 500 }}>
            {errorMessage}
        </h1>
    {/if}

    <h1 id="input-header">New password</h1>
    <input
        id="password-input"
        bind:value={newPassword}
        type="password"
        maxlength={90}
    />

    <br />

    <button id="update-button" on:click={reset}>Update password</button>
</div>

<style>
    .reset-container {
        position: fixed;
        border-radius: 10px;
        background: rgb(111, 28, 236);
        padding: 20px 30px 20px 30px;
        box-shadow: 0 0 5px black;
        text-align: center;
        width: 550px;
    }

    .reset-container #header {
        color: white;
        text-align: center;
        font-size: 3rem;
        margin: 10px 10px 40px 10px;
    }

    .reset-container #error-header {
        color: red;
        font-size: 2rem;
        margin: 0;
        width: 100%;
    }

    .reset-container #input-header {
        color: white;
        margin: 0;
        margin-bottom: 5px;
        font-size: 2.1rem;
        text-align: start;
    }

    .reset-container input {
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 95%;
        color: white;
        background: transparent;
        border-radius: 12px;
        border: 3px solid white;
    }

    .reset-container button {
        font-size: 2.5rem;
        margin-top: 25px;
        width: 90%;
        cursor: default;
        border: 3px solid white;
        padding: 7px;
    }

    @media screen and (max-width: 720px) {
        .reset-container {
            width: 450px;
        }

        .reset-container #header {
            font-size: 2.5rem;
        }

        .reset-container #error-header {
            font-size: 1.7rem;
        }

        .reset-container #input-header {
            font-size: 1.7rem;
        }

        .reset-container input {
            font-size: 1.7rem;
        }

        .reset-container button {
            font-size: 2.2rem;
        }
    }

    @media screen and (max-width: 520px) {
        .reset-container {
            width: 350px;
        }

        .reset-container #header {
            font-size: 1.8rem;
        }

        .reset-container #error-header {
            font-size: 1.4rem;
        }

        .reset-container #input-header {
            font-size: 1.4rem;
        }

        .reset-container input {
            font-size: 1.4rem;
        }

        .reset-container button {
            font-size: 1.7rem;
        }
    }
</style>
