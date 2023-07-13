<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    let mountReady = false;

    onMount(() => (mountReady = true));
</script>

{#if mountReady}
    <div class="main-container" in:fade={{ duration: 250 }}>
        <h1 id="descriptor">Reset password</h1>

        <input class="modal-input" type="text" placeholder="Email address" />

        <div class="choices-container">
            <button id="reset">Send email</button>
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

    @media screen and (max-width: 850px) {
        #descriptor {
            font-size: 2.2rem;
        }

        input {
            font-size: 1.15rem;
        }

        button {
            font-size: 1.3rem;
        }

        #reset {
            width: 130px;
        }
    }

    @media screen and (max-width: 600px) {
        #descriptor {
            font-size: 1.6rem;
        }

        input {
            font-size: 0.9rem;
        }

        .choices-container {
            margin-top: 10px;
        }

        button {
            font-size: 0.9rem;
        }

        #reset {
            width: 110px;
        }
    }
</style>
