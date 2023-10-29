<script lang="ts">
    import { goto } from '$app/navigation';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';
    import { keepLoggedIn, promotedToVerify } from 'stores/index';
    import { cachedAccountData, currentToken, socket } from 'stores/main';
    import { onMount } from 'svelte';
    import Checkbox from 'svelte-checkbox';
    import { fade } from 'svelte/transition';
    import { setKey } from 'utilities/global';
    import { redirectApp } from 'utilities/index';
    import { initSocket, performLogin } from 'utilities/main';

    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let download: HTMLButtonElement;
    let pcContainer: HTMLDivElement;

    let email: string;
    let password: string;
    let errorMessage: string;

    let mountReady = false;

    onMount(() => {
        initSocket();

        setTimeout(() => {
            adjustDownload();

            emailInput.addEventListener('keydown', (e) => {
                if (e.key == 'Enter') login();
            });

            passwordInput.addEventListener('keydown', (e) => {
                if (e.key == 'Enter') login();
            });
        }, 0);

        mountReady = true;
    });

    function adjustDownload(): void {
        const val = window.navigator.userAgent.toLowerCase();

        if (val.includes('android')) {
            download.textContent = 'Get for Android (soon)';
            download.disabled = true;

            download.onclick = () => {
                window.location.href = 'market://details?id=com.fronvo';
            };

            if (document.body.clientWidth <= 600) {
                download.style.fontSize = '1.2rem';
            }

            pcContainer.style.display = 'none';

            download.style.visibility = 'visible';
        } else {
            download.style.display = 'none';
        }
    }

    function register(): void {
        if (!email || !password) return;

        socket.emit(
            'register',
            { email: email || '', password: password || '' },
            async ({ err }) => {
                if (err) {
                    errorMessage = err.msg;
                    return;
                } else {
                    $promotedToVerify = true;

                    goto('/verify', {
                        replaceState: true,
                    });
                }
            }
        );
    }

    function login(): void {
        if (!email || !password) return;

        socket.emit(
            'login',
            { email: email || '', password: password || '' },
            async ({ err, token }) => {
                if (err) {
                    errorMessage = err.msg;
                    return;
                }

                if ($keepLoggedIn) {
                    setKey('token', token);
                }

                redirectApp();

                $currentToken = token;

                await performLogin(token, $cachedAccountData);
            }
        );
    }
</script>

{#if mountReady}
    <div class="main-container" in:fade={{ duration: 250 }}>
        <h1 id="gradient">Join the most private social media</h1>
        <h1 id="descriptor">
            Fronvo is the realest chance to reclaim your freedom from big tech.
        </h1>

        <div bind:this={pcContainer} class="credentials-container">
            <ErrorHeader {errorMessage} />

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

            <a id="reset" href="/reset"><h1>Forgot password?</h1></a>

            <div class="keep-container">
                <Checkbox
                    bind:checked={$keepLoggedIn}
                    class="checkbox"
                    size="1.8rem"
                    primaryColor="var(--modal_checkbox_primary)"
                    secondaryColor="var(--modal_checkbox_secondary)"
                />

                <h1>Remember me</h1>
            </div>

            <div class="choices-container">
                <button id="login" on:click={login}>Login</button>

                <button id="register" on:click={register}>Register</button>
            </div>
        </div>

        <button bind:this={download} id="download-btn">Get for Android</button>
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

    .credentials-container {
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    #gradient {
        font-size: 3.2rem;
        font-weight: 900;
        color: transparent;
        text-align: center;
        background: linear-gradient(
            90deg,
            var(--pro) 10.42%,
            #0e62ff 54.68%,
            var(--pro) 100%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
    }

    #descriptor {
        font-size: 1.25rem;
        margin: 0;
        margin-bottom: 30px;
        color: var(--text);
    }

    input {
        width: 100%;
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
        border: 2px solid var(--pro);
    }

    .choices-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
    }

    button {
        background: #0e62ff;
        box-shadow: 0 0 5px #0e62ff;
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

    #download-btn {
        visibility: hidden;
    }

    #download-btn {
        background: var(--pro);
        box-shadow: 0 0 5px var(--pro);
        border-radius: 10px;
        margin-top: 30px;
        margin-right: 10px;
    }

    #download-btn:disabled:active {
        opacity: initial;
        transform: none;
    }

    #login {
        width: 125px;
        margin-right: 15px;
    }

    #register {
        width: 150px;
        margin-left: 15px;
    }

    #reset {
        color: var(--text);
    }

    #reset h1 {
        font-size: 1rem;
        font-weight: 900;
        margin: 0;
        margin-bottom: 10px;
        margin-left: 10px;
        color: var(--text);
    }

    .keep-container {
        display: flex;
        align-items: center;
        justify-content: start;
        margin-top: 15px;
        margin-right: 200px;
    }

    .keep-container h1 {
        color: var(--text);
        font-size: 1.3rem;
        margin: 0;
        margin-left: 10px;
    }

    @media screen and (max-width: 850px) {
        #gradient {
            font-size: 2.5rem;
        }

        #descriptor {
            font-size: 1.1rem;
        }

        input {
            font-size: 1.15rem;
        }

        button {
            font-size: 1.4rem;
        }

        #login {
            width: 100px;
        }

        #register {
            width: 125px;
        }

        a {
            cursor: default;
        }

        #reset h1 {
            font-size: 0.95rem;
            margin-right: 120px;
        }

        .keep-container {
            margin-right: 100px;
        }

        .keep-container h1 {
            font-size: 1.1rem;
        }
    }

    @media screen and (max-width: 600px) {
        #gradient {
            font-size: 1.7rem;
        }

        #descriptor {
            font-size: 0.8rem;
        }

        input {
            font-size: 0.9rem;
        }

        .choices-container {
            margin-top: 20px;
        }

        button {
            font-size: 0.9rem;
        }

        #download-btn {
            margin-top: 15px;
        }

        #login {
            width: 85px;
        }

        #register {
            width: 105px;
        }

        #reset h1 {
            font-size: 0.8rem;
        }

        .keep-container h1 {
            font-size: 0.9rem;
        }
    }
</style>
