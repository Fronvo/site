<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import type { FronvoError } from 'interfaces/socket/all';
    import {
        accountRegisterTab,
        accountResetPasswordTab,
    } from 'stores/app/account';
    import { socket } from 'stores/global';
    import { onMount } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import { setEnterHandle } from 'utilities/global';

    let newPassword: string;
    let passwordInput: HTMLInputElement;
    let updateButton: HTMLButtonElement;
    let isErrorVisible = false;
    let errorMessage: string;

    onMount(() => {
        passwordInput = document.getElementById(
            'password-input'
        ) as HTMLInputElement;
        updateButton = document.getElementById(
            'update-button'
        ) as HTMLButtonElement;

        setEnterHandle(passwordInput, updateButton);
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
                console.log(err);

                if (err) {
                    setError({ err });
                    toggleUI(true);
                } else {
                    // Complete action, redirect to login
                    $accountResetPasswordTab = false;
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

<Center absolute>
    <div
        class="reset-container"
        in:scale={{ duration: 750, start: 0.9, delay: 300 }}
        out:scale={{ duration: 400, start: 0.9 }}
    >
        <h1 id="header">Set new password</h1>

        {#if isErrorVisible}
            <h1 id="error-header" in:fade={{ duration: 500 }}>
                {errorMessage}
            </h1>
        {/if}

        <h1 id="input-header">New password</h1>
        <input id="password-input" bind:value={newPassword} maxlength={30} />

        <br />

        <button id="update-button" on:click={reset}>Update password</button>
    </div>
</Center>

<style>
    .reset-container {
        border-radius: 10px;
        background: rgb(100, 0, 255);
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
    }

    @media screen and (max-width: 700px) {
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
