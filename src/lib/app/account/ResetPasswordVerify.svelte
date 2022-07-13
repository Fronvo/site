<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import type { FronvoError } from 'interfaces/socket/all';
    import { accountResetPasswordFinalTab } from 'stores/app/account';
    import { socket } from 'stores/global';
    import SvelteSegmentedInput from 'svelte-segmented-input';
    import { fade, scale } from 'svelte/transition';

    let code: string;
    let isErrorVisible = false;
    let errorMessage: string;

    function reset(): void {
        function setError(error: FronvoError): void {
            isErrorVisible = true;
            errorMessage = error.err.msg;
        }

        function attemptReset(): void {
            // Little hack to recieve required field messages
            socket.emit('resetPasswordVerify', { code }, ({ err }) => {
                if (err) {
                    setError({ err });
                } else {
                    // Move on to verification
                    $accountResetPasswordFinalTab = true;
                }
            });
        }

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

        <div id="desktop-code">
            <SvelteSegmentedInput
                bind:value={code}
                on:valueEntered={reset}
                length={6}
                style={{
                    fontSize: '2.2rem',
                    borderRadius: '10px',
                    borderWidth: '3px',
                    borderColorActive: 'rgb(255, 255, 255)',
                    textColor: 'white',
                    inputWidth: '100%',
                    padding: '10px 10px 10px 15px',
                }}
            />
        </div>

        <input id="mobile-code" bind:value={code} maxlength={6} />

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
        width: 50%;
        text-align: center;
        margin-top: 20px;
        padding: 0;
    }

    .reset-container #mobile-code {
        display: none;
    }

    .reset-container button {
        font-size: 2.3rem;
        margin-top: 20px;
        width: 50%;
        cursor: default;
    }

    .reset-container #submit-button {
        display: none;
    }

    @media screen and (max-width: 720px) {
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

        .reset-container #desktop-code {
            display: none;
        }

        .reset-container #mobile-code {
            font-size: 1.8rem;
            display: initial;
        }

        .reset-container button {
            font-size: 1.7rem;
        }

        .reset-container #submit-button {
            display: initial;
        }
    }
</style>
