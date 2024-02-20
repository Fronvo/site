<script lang="ts">
    import { goto } from '$app/navigation';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';
    import { promotedToRVerify } from 'stores/index';
    import { socket } from 'stores/main';
    import { onMount } from 'svelte';
    import { quartOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import { initSocket } from 'utilities/main';

    let email: string;
    let errorMessage: string;

    let mountReady = false;

    function reset(): void {
        if (!email) return;

        socket.emit(
            'resetPassword',
            {
                email: email ? email : '',
            },
            ({ err }) => {
                if (err) {
                    errorMessage = err.msg;

                    return;
                }

                $promotedToRVerify = true;

                goto('/rverify', {
                    replaceState: true,
                });
            }
        );
    }

    onMount(() => {
        initSocket();

        mountReady = true;
    });
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
        <h1 id="descriptor">Reset password</h1>

        <ErrorHeader {errorMessage} />

        <h1 id="input-descriptor">Email address</h1>
        <input bind:value={email} class="modal-input" type="email" />

        <div class="choices-container">
            <button id="reset" on:click={reset}>Send email</button>
        </div>

        <h1 id="back"><a href="/login">Back to login</a></h1>
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
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        flex-direction: column;
        z-index: 0;
        user-select: none;
    }

    #descriptor {
        font-size: 2.5rem;
        margin: 0;
        color: var(--text);
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

    .choices-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
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

    #back {
        display: flex;
        align-items: center;
        font-size: 1.1rem;
        margin: 0;
        margin-top: 50px;
        cursor: pointer;
        margin-left: 10px;
    }

    #back a {
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
    }

    @media screen and (max-width: 850px) {
        #descriptor {
            font-size: 1.9rem;
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

        #back {
            font-size: 1rem;
            cursor: default;
            margin-left: 0;
        }
    }

    @media screen and (max-width: 600px) {
        #descriptor {
            font-size: 1.4rem;
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

        #back {
            font-size: 0.7rem;
        }
    }
</style>
