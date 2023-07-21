<script lang="ts">
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';
    import { cachedAccountData, currentToken, socket } from 'stores/main';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { setKey } from 'utilities/global';
    import { redirectApp } from 'utilities/index';
    import { performLogin } from 'utilities/main';

    let code: string;
    let identifier: string;
    let errorMessage: string;

    let mountReady = false;

    function join(): void {
        if (!code || !identifier) return;

        socket.emit(
            'registerVerify',
            {
                code: code ? code : '',
                profileId: identifier ? identifier : '',
            },
            async ({ err, token }) => {
                if (err) {
                    errorMessage = err.msg;
                    return;
                }

                setKey('token', token);

                redirectApp();

                $currentToken = token;

                await performLogin(token, $cachedAccountData);
            }
        );
    }

    onMount(() => (mountReady = true));
</script>

{#if mountReady}
    <div class="main-container" in:fade={{ duration: 250 }}>
        <h1 id="descriptor">Account setup</h1>

        <ErrorHeader {errorMessage} />

        <h1 id="info">
            Enter the 6-digit verification code sent to your email
        </h1>
        <input
            bind:value={code}
            class="modal-input"
            type="text"
            placeholder="Verification code"
            maxlength={6}
        />

        <h1 id="info">Choose the identifier you will FOREVER use on Fronvo</h1>

        <div class="single-line">
            <h1>@</h1>
            <input
                bind:value={identifier}
                class="modal-input"
                type="text"
                maxlength={20}
            />
        </div>

        <div class="choices-container">
            <button id="join" on:click={join}>Join Fronvo</button>
        </div>
    </div>
{/if}

<style>
    .main-container {
        position: fixed;
        height: max-content;
        margin: auto;
        top: 0;
        right: 15px;
        left: 15px;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        z-index: 0;
    }

    #descriptor {
        font-size: 2.5rem;
        margin: 0;
        color: var(--text);
    }

    #info {
        margin: 0;
        margin-top: 30px;
        font-size: 1.2rem;
    }

    .single-line {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }

    h1 {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .single-line h1 {
        margin: 0;
        font-size: 1.9rem;
    }

    .single-line input {
        margin-left: 5px;
        padding-left: 5px;
    }

    input {
        font-size: 1.3rem;
        margin-top: 10px;
        padding: 7px;
        padding-left: 20px;
        padding-right: 20px;
        color: var(--text);
        border: 2px solid transparent;
        transition: 150ms border;
    }

    input:focus {
        border: 2px solid #0e62ff;
    }

    .choices-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }

    button {
        background: #0e62ff;
        box-shadow: 0 0 5px #0e62ff;
        font-size: 1.4rem;
        border-radius: 15px;
        font-weight: 500;
        color: white;
    }

    button:active {
        opacity: 0.7;
    }

    button:disabled {
        opacity: 0.75;
    }

    #join {
        width: 150px;
        margin-right: 15px;
    }
</style>
