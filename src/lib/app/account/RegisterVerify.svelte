<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import type { FronvoError } from 'interfaces/socket/all';
    import { hasLoggedIn, tokenInvalid } from 'stores/app/global';
    import { socket } from 'stores/global';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { setKey } from 'utilities/global';

    let code: string;
    let isErrorVisible = false;
    let errorMessage: string;
    let codeInput: HTMLInputElement;
    let submitButton: HTMLButtonElement;

    onMount(() => {
        codeInput = document.getElementById('code-input') as HTMLInputElement;
        submitButton = document.getElementById(
            'submit-button'
        ) as HTMLButtonElement;
    });

    function verify(): void {
        function toggleUI(state: boolean): void {
            codeInput.disabled = !state;
            submitButton.disabled = !state;
        }

        function setError(error: FronvoError): void {
            isErrorVisible = true;
            errorMessage = error.err.msg;
        }

        function attemptVerify(): void {
            socket.emit('registerVerify', { code }, ({ err, token }) => {
                if (err) {
                    setError({ err });
                    toggleUI(true);
                } else {
                    setKey('token', token);
                    $tokenInvalid = false;
                    $hasLoggedIn = true;
                }
            });
        }

        toggleUI(false);

        attemptVerify();
    }
</script>

<svelte:head>
    <title>Fronvo | Verify</title>
</svelte:head>

<Center>
    <div class="verify-container">
        <h1 id="header">Register Verification</h1>

        <h1 id="info">
            A 6-digit verification code has been sent to your email
        </h1>

        {#if isErrorVisible}
            <h1 in:fade={{ duration: 500 }} id="error-header">
                {errorMessage}
            </h1>
        {/if}

        <input id="code-input" bind:value={code} maxlength={6} />

        <br />

        <button id="submit-button" on:click={verify}>Submit</button>
    </div>
</Center>

<style>
    .verify-container {
        border-radius: 10px;
        background: rgb(100, 0, 255);
        padding: 15px 30px 15px 30px;
        box-shadow: 0 0 5px black;
        text-align: center;
        width: 550px;
    }

    .verify-container #header {
        color: white;
        text-align: center;
        font-size: 3rem;
        margin: 10px 10px 20px 10px;
    }

    .verify-container #info {
        font-size: 1.8rem;
        color: white;
    }

    .verify-container #error-header {
        color: red;
        font-size: 2rem;
        margin-bottom: 20px;
        width: 100%;
        word-wrap: break-word;
    }

    .verify-container input {
        font-size: 3rem;
        width: 40%;
        height: 50px;
        text-align: center;
    }

    .verify-container button {
        font-size: 2.3rem;
        margin-top: 20px;
        width: 50%;
    }

    @media screen and (max-width: 700px) {
        .verify-container {
            width: 450px;
        }

        .verify-container #header {
            font-size: 2.3rem;
        }

        .verify-container #info {
            font-size: 1.6rem;
        }

        .verify-container #error-header {
            font-size: 1.7rem;
        }

        .verify-container input {
            font-size: 2.5rem;
        }

        .verify-container button {
            font-size: 2.2rem;
        }
    }

    @media screen and (max-width: 520px) {
        .verify-container {
            width: 350px;
        }

        .verify-container #header {
            font-size: 1.7rem;
        }

        .verify-container #info {
            font-size: 1.4rem;
        }

        .verify-container #error-header {
            font-size: 1.4rem;
        }

        .verify-container input {
            font-size: 1.8rem;
        }

        .verify-container button {
            font-size: 1.7rem;
        }
    }
</style>
