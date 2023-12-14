<script lang="ts">
    import { goto } from '$app/navigation';
    import { promotedToRVerify } from 'stores/index';
    import { currentToken, socket } from 'stores/main';
    import { onMount } from 'svelte';
    import { quartOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import { initSocket } from 'utilities/main';

    let codeInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;

    let code: string;
    let password: string;

    let mountReady = false;

    onMount(() => {
        initSocket();

        setTimeout(() => {
            codeInput.addEventListener('keydown', (e) => {
                if (e.key == 'Enter') reset();
            });

            passwordInput.addEventListener('keydown', (e) => {
                if (e.key == 'Enter') reset();
            });
        }, 0);

        mountReady = true;
    });

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
                    if (err.msg.toLowerCase().includes('code')) {
                        setTimeout(() => {
                            codeInput.style.border = '2px solid red';
                        }, 0);
                    } else {
                        setTimeout(() => {
                            passwordInput.style.border = '2px solid red';
                        }, 0);
                    }

                    return;
                }

                $promotedToRVerify = false;

                goto('/login', {
                    replaceState: true,
                });
            }
        );
    }
</script>

{#if mountReady}
    <div
        class="main-container"
        in:fly={{
            duration: 500,
            y: 50,
            opacity: 0,
            easing: quartOut,
            delay: 250,
        }}
    >
        <h1 id="top">Account setup</h1>
        <h1 id="descriptor">Check your email for a password reset code.</h1>

        <div class="credentials-container">
            <h1 id="input-descriptor">Verification code</h1>
            <input
                bind:this={codeInput}
                class="modal-input"
                type="text"
                maxlength={6}
                bind:value={code}
            />

            <h1 id="input-descriptor">New password</h1>
            <input
                bind:this={passwordInput}
                class="modal-input"
                type="password"
                bind:value={password}
            />
        </div>

        <button id="login" on:click={reset}>Reset password</button>
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
        flex-direction: column;
        z-index: 0;
        background: rgba(170, 170, 170, 0.25);
        backdrop-filter: blur(15px);
        box-shadow: 0 0 5px rgb(125, 125, 125, 0.25);
        user-select: none;
    }

    .credentials-container {
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    #top {
        font-size: 3rem;
        font-weight: 600;
        text-align: center;
        margin: 0;
    }

    #descriptor {
        font-size: 1.25rem;
        margin: 0;
        margin-bottom: 30px;
        color: var(--text);
    }

    #input-descriptor {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 800;
        text-transform: uppercase;
    }

    input {
        width: 450px;
        font-size: 1.3rem;
        margin-top: 5px;
        padding: 7px;
        padding-left: 5px;
        padding-right: 5px;
        color: white;
        background: rgba(200, 200, 200, 0.25);
        backdrop-filter: blur(5px);
        border: 2px solid transparent;
        transition: 150ms border;
    }

    input:focus {
        border: 2px solid var(--branding);
    }

    button {
        width: 450px;
        background: var(--branding);
        box-shadow: none;
        font-size: 1.6rem;
        border-radius: 5px;
        margin-top: 15px;
        margin-left: 7px;
        color: white;
        padding: 8px;
    }

    button:hover {
        background: var(--branding);
        color: white;
    }

    button:active {
        opacity: 0.8;
    }

    button:disabled {
        opacity: 0.5;
    }

    @media screen and (max-width: 1050px) {
        .main-container {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

        .credentials-container {
            width: initial;
        }
    }

    @media screen and (max-width: 850px) {
        #top {
            font-size: 2.5rem;
        }

        #descriptor {
            font-size: 1.1rem;
        }

        #input-descriptor {
            font-size: 1rem;
        }

        input {
            font-size: 1.15rem;
            margin-left: 0;
        }

        button {
            font-size: 1.4rem;
        }
    }

    @media screen and (max-width: 600px) {
        #top {
            font-size: 1.7rem;
        }

        #descriptor {
            font-size: 0.8rem;
        }

        #input-descriptor {
            font-size: 0.8rem;
        }

        input {
            width: 300px;
            font-size: 0.9rem;
        }

        button {
            width: 300px;
            font-size: 0.9rem;
            margin-left: 0;
            margin-right: 5px;
        }
    }
</style>
