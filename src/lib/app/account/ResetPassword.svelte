<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import type { FronvoError } from 'interfaces/socket/all';
    import {
        accountResetPasswordTab,
        accountResetPasswordVerifyTab,
    } from 'stores/app/account';
    import { socket } from 'stores/global';
    import { onMount } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import { setEnterHandle } from 'utilities/global';

    let email: string;
    let emailInput: HTMLInputElement;
    let resetButton: HTMLButtonElement;
    let isResetting = false;
    let isErrorVisible = false;
    let errorMessage: string;

    onMount(() => {
        emailInput = document.getElementById('email-input') as HTMLInputElement;
        resetButton = document.getElementById(
            'reset-button'
        ) as HTMLButtonElement;

        setEnterHandle(emailInput, resetButton);
    });

    function reset(): void {
        isResetting = true;

        function toggleUI(state: boolean): void {
            emailInput.disabled = !state;
            resetButton.disabled = !state;

            isResetting = !state;
        }

        function setError(error: FronvoError): void {
            isErrorVisible = true;
            errorMessage = error.err.msg;
        }

        function attemptReset(): void {
            // Little hack to recieve required field messages
            socket.emit('resetPassword', { email }, ({ err }) => {
                if (err) {
                    setError({ err });
                    toggleUI(true);
                } else {
                    // Move on to verification
                    $accountResetPasswordVerifyTab = true;
                }
            });
        }

        toggleUI(false);

        attemptReset();
    }

    function loginTab(): void {
        if (isResetting) return;

        $accountResetPasswordTab = false;
    }
</script>

<svelte:head>
    <title>Fronvo | Reset password</title>
</svelte:head>

<Center absolute>
    <div
        class="reset-container"
        in:scale={{ duration: 750, start: 0.9, delay: 300 }}
        out:scale={{ duration: 400, start: 0.9 }}
    >
        <h1 id="header">Reset password</h1>

        {#if isErrorVisible}
            <h1 id="error-header" in:fade={{ duration: 500 }}>
                {errorMessage}
            </h1>
        {/if}

        <h1 id="input-header">Email</h1>
        <input id="email-input" bind:value={email} maxlength={120} />

        <br />

        <button id="reset-button" on:click={reset}>Send reset email</button>

        <h1 id="login-redirect" on:click={loginTab}>Back to login</h1>
    </div>
</Center>

<style>
    .reset-container {
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
    }

    .reset-container button {
        font-size: 2.5rem;
        margin-top: 25px;
        width: 90%;
        border: 3px solid white;
        padding: 7px;
    }

    .reset-container #login-redirect {
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

    .reset-container #login-redirect:hover {
        color: rgb(233, 206, 255);
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
            cursor: default;
        }

        .reset-container #login-redirect {
            font-size: 1.7rem;
            cursor: default;
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

        .reset-container #login-redirect {
            font-size: 1.4rem;
        }
    }
</style>
