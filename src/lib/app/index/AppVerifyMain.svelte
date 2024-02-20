<script lang="ts">
    import { goto } from '$app/navigation';
    import { cachedAccountData, currentToken, socket } from 'stores/main';
    import { onMount } from 'svelte';
    import { quartOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import { setKey } from 'utilities/global';
    import { redirectApp } from 'utilities/index';
    import { initSocket, performLogin } from 'utilities/main';

    let codeInput: HTMLInputElement;
    let identifierInput: HTMLInputElement;

    let code: string;
    let identifier: string;

    let mountReady = false;

    onMount(() => {
        initSocket();

        setTimeout(() => {
            codeInput.addEventListener('keydown', (e) => {
                if (e.key == 'Enter') verify();
            });

            identifierInput.addEventListener('keydown', (e) => {
                if (e.key == 'Enter') verify();
            });
        }, 0);

        mountReady = true;
    });

    function verify(): void {
        if (!code || !identifier) return;

        socket.emit(
            'registerVerify',
            {
                code: code ? code : '',
                profileId: identifier ? identifier : '',
            },
            async ({ err, token }) => {
                if (err) {
                    if (err.msg.toLowerCase().includes('code')) {
                        setTimeout(() => {
                            codeInput.style.border = '2px solid red';
                        }, 0);
                    } else {
                        setTimeout(() => {
                            identifierInput.style.border = '2px solid red';
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
        <h1 id="top">Account setup</h1>
        <h1 id="descriptor">Check your email for a verification code.</h1>

        <div class="credentials-container">
            <h1 id="input-descriptor">Verification code</h1>
            <input
                bind:this={codeInput}
                class="modal-input"
                type="text"
                maxlength={6}
                bind:value={code}
            />

            <h1 id="input-descriptor">Account handle</h1>

            <div class="single">
                <h1>@</h1>
                <input
                    bind:this={identifierInput}
                    class="modal-input"
                    bind:value={identifier}
                />
            </div>
        </div>

        <button id="login" on:click={verify}>Verify</button>
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
        color: var(--text);
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

    .single {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .single h1 {
        margin: 0;
        margin-bottom: 10px;
        font-size: 1.8rem;
    }

    .single input {
        width: calc(450px - 26px);
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

        .single h1 {
            font-size: 1.5rem;
        }

        .single input {
            width: calc(450px - 26px);
            margin-left: 5px;
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

        .single h1 {
            font-size: 1.3rem;
        }

        .single input {
            width: calc(300px - 23px);
        }
    }
</style>
