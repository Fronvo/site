<script lang="ts">
    import { goto } from '$app/navigation';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';
    import { currentToken, socket } from 'stores/main';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { setKey } from 'utilities/global';
    import { initSocket } from 'utilities/main';

    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;

    let email: string;
    let password: string;
    let errorMessage: string;

    let mountReady = false;

    onMount(() => {
        initSocket();

        setTimeout(() => {
            emailInput.addEventListener('keydown', (e) => {
                if (e.key == 'Enter') login();
            });

            passwordInput.addEventListener('keydown', (e) => {
                if (e.key == 'Enter') login();
            });
        }, 0);

        mountReady = true;
    });

    function login(): void {
        if (!email || !password) return;

        socket.emit(
            'login',
            { email: email || '', password: password || '' },
            async ({ err, token }) => {
                if (err) {
                    errorMessage = err.msg;
                    return;
                } else {
                    socket.emit('fetchProfileId', ({ err, profileId }) => {
                        if (err) {
                            errorMessage = err.msg;
                            return;
                        }

                        socket.emit(
                            'fetchProfileData',
                            {
                                profileId,
                            },
                            ({ err, profileData }) => {
                                if (err) {
                                    errorMessage = err.msg;
                                    return;
                                }

                                if (profileData.isPRO) {
                                    errorMessage =
                                        'This account is already a PRO.';

                                    socket.emit('logout');

                                    return;
                                } else {
                                    setKey('token', token);

                                    $currentToken = token;

                                    goto('/mobile-pro-final', {
                                        replaceState: true,
                                    });
                                }
                            }
                        );
                    });
                }
            }
        );
    }
</script>

{#if mountReady}
    <div class="main-container" in:fade={{ duration: 250 }}>
        <h1 id="gradient">Apply for Fronvo PRO</h1>

        <ErrorHeader {errorMessage} size="1.1rem" />

        <input
            bind:this={emailInput}
            class="modal-input"
            type="text"
            placeholder="Email address"
            bind:value={email}
        />
        <input
            bind:this={passwordInput}
            class="modal-input"
            type="password"
            placeholder="Password"
            bind:value={password}
        />

        <div class="choices-container">
            <button id="login" on:click={login}>Login</button>
        </div>
    </div>
{/if}

<style>
    .main-container {
        position: fixed;
        height: max-content;
        margin: auto;
        width: 100%;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        z-index: 0;
    }

    #gradient {
        font-size: 1.6rem;
        font-weight: 900;
        color: transparent;
        text-align: center;
        background: linear-gradient(
            90deg,
            var(--branding) 10.42%,
            #0e62ff 54.68%,
            var(--branding) 100%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
        margin-bottom: 10px;
    }

    input {
        width: 90%;
        font-size: 0.9rem;
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
        border: 2px solid var(--branding);
    }

    .choices-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }

    button {
        background: var(--branding);
        box-shadow: 0 0 5px var(--branding);
        font-size: 1.6rem;
        border-radius: 15px;
        font-weight: 300;
        color: white;
    }

    button:active {
        opacity: 0.7;
    }

    button:disabled {
        opacity: 0.75;
    }

    button:hover {
        background: var(--branding);
        color: white;
    }

    #login {
        width: 110px;
        font-size: 1.1rem;
    }
</style>
