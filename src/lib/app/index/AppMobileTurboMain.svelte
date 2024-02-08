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

                                if (profileData.isTurbo) {
                                    errorMessage =
                                        'This account is already a Turbo member.';

                                    socket.emit('logout');

                                    return;
                                } else {
                                    setKey('token', token);

                                    $currentToken = token;

                                    goto('/mobile-turbo-final', {
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
        <h1 id="gradient">Apply for Fronvo Turbo</h1>

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
        width: max-content;
        height: max-content;
        margin: auto;
        top: 0;
        right: 15px;
        left: 15px;
        bottom: 0;
        padding: 30px;
        padding-bottom: 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        flex-direction: column;
        z-index: 0;
        user-select: none;
    }

    #gradient {
        font-size: 1.6rem;
        font-weight: 600;
        color: white;
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
        color: white;
        background: rgb(255, 255, 255, 0.075);
        border: 2px solid transparent;
        transition: 150ms border;
    }

    input:focus {
        border: 2px solid white;
    }

    input {
        width: 90%;
        font-size: 0.9rem;
        margin-top: 10px;
        padding: 7px;
        color: white;
        background: rgb(255, 255, 255, 0.075);
        border: 2px solid transparent;
        transition: 150ms border;
    }

    input:focus {
        border: 2px solid white;
    }

    .choices-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }

    button {
        width: 450px;
        background: transparent;
        backdrop-filter: blur(10px);
        border-radius: 5px;
        background: rgb(255, 255, 255, 0.075);
        box-shadow: 0 0 100px rgb(15, 15, 15);
        box-shadow: none;
        transition: 150ms;
        color: white;
    }

    button:hover {
        background: rgb(255, 255, 255, 0.15);
        color: white;
    }

    button:active {
        opacity: 0.8;
    }

    button:disabled {
        opacity: 0.5;
    }

    #login {
        width: 110px;
        font-size: 1.1rem;
    }
</style>
