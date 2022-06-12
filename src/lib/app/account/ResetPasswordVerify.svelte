<script lang="ts">
    import type { FronvoError } from 'src/interfaces/socket/all';
    import { accountResetPasswordFinalTab } from 'src/stores/app/account';
    import { socket } from 'src/stores/global';
    import { setEnterHandle } from 'src/utilities/global';
    import { onMount } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import Center from '../Center.svelte';

    let code: string;
    let codeInput: HTMLInputElement;
    let submitButton: HTMLButtonElement;
    let isErrorVisible = false;
    let errorMessage: string;

    onMount(() => {
        codeInput = document.getElementById('code-input') as HTMLInputElement;
        submitButton = document.getElementById(
            'submit-button'
        ) as HTMLButtonElement;

        setEnterHandle(codeInput, submitButton);
    });

    function reset(): void {
        function toggleUI(state: boolean): void {
            codeInput.disabled = !state;
            submitButton.disabled = !state;
        }

        function setError(error: FronvoError): void {
            isErrorVisible = true;
            errorMessage = error.err.msg;
        }

        function attemptReset(): void {
            // Little hack to recieve required field messages
            socket.emit('resetPasswordVerify', { code }, ({ err }) => {
                console.log(err);

                if (err) {
                    setError({ err });
                    toggleUI(true);
                } else {
                    // Move on to verification
                    $accountResetPasswordFinalTab = true;
                }
            });
        }

        toggleUI(false);

        attemptReset();
    }
</script>

<svelte:head>
    <title>Fronvo | Reset password verification</title>
</svelte:head>

<Center absolute>
    <div
        class="reset-container"
        in:scale={{ duration: 750, start: 0.9, delay: 300 }}
        out:scale={{ duration: 400, start: 0.9 }}
    >
        <h1 id="header">Reset verification</h1>

        <h1 id="info">
            A 6-digit verification code has been sent to your email
        </h1>

        {#if isErrorVisible}
            <h1 id="error-header" in:fade={{ duration: 500 }}>
                {errorMessage}
            </h1>
        {/if}

        <input id="code-input" bind:value={code} maxlength={6} />

        <br />

        <button id="submit-button" on:click={reset}>Submit</button>
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
        margin: 10px 10px 30px 10px;
    }

    .reset-container #info {
        font-size: 1.8rem;
        color: white;
    }

    .reset-container #error-header {
        color: red;
        font-size: 2rem;
        width: 100%;
    }

    .reset-container input {
        font-size: 3rem;
        width: 40%;
        height: 50px;
        text-align: center;
        margin-top: 20px;
    }

    .reset-container button {
        font-size: 2.3rem;
        margin-top: 20px;
        width: 50%;
    }

    @media screen and (max-width: 700px) {
        .reset-container {
            width: 450px;
        }

        .reset-container #header {
            font-size: 2.5rem;
        }

        .reset-container #info {
            font-size: 1.6rem;
        }

        .reset-container #error-header {
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

        .reset-container #info {
            font-size: 1.4rem;
        }

        .reset-container #error-header {
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
