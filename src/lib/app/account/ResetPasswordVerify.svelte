<script lang="ts">
    import Center from '$lib/app/Center.svelte';
    import type { FronvoError } from 'interfaces/all';
    import {
        accountPanelAnimDuration,
        accountResetPasswordFinalTab,
    } from 'stores/account';
    import { socket } from 'stores/all';
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

<div
    class="reset-container"
    transition:scale={{ duration: accountPanelAnimDuration, start: 1.1 }}
>
    <h1 id="header">Reset verification</h1>

    <h1 id="info">A 6-digit verification code has been sent to your email</h1>

    {#if isErrorVisible}
        <h1 id="error-header" in:fade={{ duration: 500 }}>
            {errorMessage}
        </h1>
    {/if}

    <SvelteSegmentedInput
        bind:value={code}
        on:valueEntered={reset}
        length={6}
        style={{
            fontSize: '2rem',
            borderRadius: '10px',
            borderWidth: '2px',
            borderColorActive: 'rgb(255, 255, 255)',
            textColor: 'white',
            inputWidth: '100%',
            padding: '10px 10px 10px 10px',
        }}
    />

    <button on:click={reset}>Reset password</button>
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

    .reset-container button {
        font-size: 2rem;
        margin-top: 20px;
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
            font-size: 1.8rem;
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

        .reset-container button {
            font-size: 1.5rem;
        }
    }
</style>
