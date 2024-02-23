<script lang="ts">
    import { goto } from '$app/navigation';
    import { cachedAccountData, currentToken, socket } from 'stores/main';
    import { onMount } from 'svelte';
    import { quartOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import { setKey } from 'utilities/global';
    import { redirectApp } from 'utilities/index';
    import { initSocket, performLogin } from 'utilities/main';

    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;

    let email: string;
    let password: string;

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

        setTimeout(() => {
            emailInput.style.border = '2px solid transparent';
            passwordInput.style.border = '2px solid transparent';
        }, 0);

        socket.emit(
            'login',
            { email: email || '', password: password || '' },
            async ({ err, token }) => {
                if (err) {
                    if (err.msg.toLowerCase().includes('email')) {
                        setTimeout(() => {
                            emailInput.style.border = '2px solid red';
                        }, 0);
                    } else if (err.msg.toLowerCase().includes('password')) {
                        setTimeout(() => {
                            passwordInput.style.border = '2px solid red';
                        }, 0);
                    } else if ((err.name = 'ACCOUNT_404')) {
                        setTimeout(() => {
                            emailInput.style.border = '2px solid red';
                        }, 0);
                    }

                    return;
                }

                setKey('token', token);

                redirectApp();

                goto('/app', {
                    replaceState: true,
                });

                $currentToken = token;

                await performLogin(token, $cachedAccountData);
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
        <h1 id="top">Welcome back to Fronvo</h1>
        <h1 id="descriptor">Login to the safest social media below.</h1>

        <div class="credentials-container">
            <h1 id="input-descriptor">Email address</h1>
            <input
                bind:this={emailInput}
                class="modal-input"
                type="text"
                bind:value={email}
            />

            <h1 id="input-descriptor">Password</h1>
            <input
                bind:this={passwordInput}
                class="modal-input"
                type="password"
                bind:value={password}
            />
        </div>

        <button id="login" on:click={login}>Login</button>

        <div class="choices-container">
            <h1>New to Fronvo? <a href="/app">Register</a></h1>
            <h1>
                Forgot your password? <a href="/reset">Reset password</a>
            </h1>
        </div>
    </div>
{/if}

<style>
    a {
        text-decoration: underline;
    }

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

    .credentials-container {
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    #top {
        font-size: 3rem;
        font-weight: 600;
        text-align: center;
        margin: 0;
        color: white;
    }

    #descriptor {
        font-size: 1.25rem;
        margin: 0;
        margin-bottom: 30px;
        color: white;
    }

    #input-descriptor {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 800;
        text-transform: uppercase;
        color: white;
    }

    input {
        width: 450px;
        font-size: 1.3rem;
        margin-top: 5px;
        padding: 7px;
        padding-left: 5px;
        padding-right: 5px;
        color: white;
        background: rgb(255, 255, 255, 0.075);
        border: 2px solid transparent;
        transition: 150ms border;
    }

    input:focus {
        border: 2px solid white;
    }

    button {
        width: 450px;
        font-size: 1.6rem;
        margin-top: 15px;
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

    .choices-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-top: 20px;
    }

    .choices-container h1 {
        margin: 0;
        font-size: 1.1rem;
        margin-bottom: 15px;
    }

    .choices-container a {
        color: white;
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

        .choices-container h1 {
            font-size: 1rem;
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

        .choices-container h1 {
            font-size: 0.8rem;
        }
    }
</style>
