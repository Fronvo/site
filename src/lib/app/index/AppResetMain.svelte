<script lang="ts">
    import { goto } from '$app/navigation';
    import ErrorHeader from '$lib/app/reusables/all/ErrorHeader.svelte';
    import { promotedToRVerify } from 'stores/index';
    import { socket } from 'stores/main';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { initSocket } from 'utilities/main';

    let email: string;
    let errorMessage: string;

    let mountReady = false;

    function join(): void {
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

    function goBack(): void {
        goto('/app');
    }

    onMount(() => {
        initSocket();

        mountReady = true;
    });
</script>

{#if mountReady}
    <div class="main-container" in:fade={{ duration: 250 }}>
        <h1 id="descriptor">Reset password</h1>

        <ErrorHeader {errorMessage} />

        <input
            bind:value={email}
            class="modal-input"
            type="text"
            placeholder="Email address"
        />

        <div class="choices-container">
            <button id="reset" on:click={join}>Send email</button>
        </div>

        <h1 id="mixed" on:click={goBack} on:keydown={goBack}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                ><g fill="var(--branding)"
                    ><path
                        d="M11.596 8.303L8.165 11.63a.499.499 0 0 0 0 .74l6.63 6.43c.414.401 1.205.158 1.205-.37v-5.723l-4.404-4.404Z"
                    /><path
                        d="M16 11.293V5.57c0-.528-.791-.771-1.205-.37l-2.482 2.406L16 11.293Z"
                        opacity=".75"
                    /></g
                ></svg
            >Back
        </h1>
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
        font-weight: 300;
        color: white;
    }

    button:hover {
        background: #0e62ff;
        box-shadow: 0 0 5px #0e62ff;
        font-size: 1.4rem;
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

    #reset {
        width: 150px;
        margin-right: 15px;
    }

    #mixed {
        display: flex;
        align-items: center;
        font-size: 1.4rem;
        margin: 0;
        margin-top: 50px;
        margin-right: 32px;
        cursor: pointer;
    }

    #mixed:hover svg {
        transform: translateX(-2.5px);
    }

    #mixed svg {
        width: 36px;
        height: 36px;
        transition: 200ms;
    }
</style>
