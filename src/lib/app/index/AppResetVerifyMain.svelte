<script lang="ts">
    import { goto } from '$app/navigation';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';
    import { promotedToRVerify } from 'stores/index';
    import { socket } from 'stores/main';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    let code: string;
    let password: string;
    let errorMessage: string;

    let mountReady = false;

    function reset(): void {
        if (!code || !password) return;

        socket.emit(
            'resetPasswordVerify',
            {
                code: code ? code : '',
                password: password ? password : '',
            },
            async ({ err }) => {
                if (err) {
                    errorMessage = err.msg;
                    return;
                }

                $promotedToRVerify = false;

                goto('/app', {
                    replaceState: true,
                });
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

        <h1 id="info">Choose your new password</h1>

        <input
            bind:value={password}
            class="modal-input"
            type="password"
            maxlength={90}
        />

        <div class="choices-container">
            <button id="reset" on:click={reset}>Reset password</button>
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

    h1 {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    input {
        font-size: 1.3rem;
        margin-top: 10px;
        padding: 7px;
        padding-left: 20px;
        padding-right: 20px;
        color: var(--text);
        background: var(--i_bg);
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

    #reset {
        width: 200px;
        margin-right: 15px;
    }
</style>
