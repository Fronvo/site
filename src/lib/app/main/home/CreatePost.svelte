<script lang="ts">
    import { ourData } from 'stores/profile';
    import { onMount } from 'svelte';
    import { toast } from 'svelte-sonner';
    import { setProgressBar } from 'utilities/main';

    let content = '';

    let input: HTMLTextAreaElement;
    let share: HTMLButtonElement;

    function addImage(): void {}

    function addGif(): void {}

    function sharePost(): void {
        if (input.disabled) return;

        input.disabled = true;
        share.disabled = true;

        setProgressBar(true);

        setTimeout(() => {
            setProgressBar(false);

            input.disabled = false;
            share.disabled = false;

            toast('BETA feature not completed');
        }, 2500);
    }

    onMount(() => {
        if (input) {
            input.style.height = '55px';
            input.style.height = `${input.scrollHeight}px`;

            input.onkeydown = () => {
                setTimeout(() => {
                    if (content.length > 0) {
                        share.disabled = false;
                    } else {
                        share.disabled = true;
                    }

                    input.style.height = '55px';
                    input.style.height = `${input.scrollHeight}px`;
                }, 0);
            };
        }

        if (share) {
            share.disabled = true;
        }
    });
</script>

<div class="post-container">
    <div class="first-container">
        {#if $ourData.avatar}
            <img
                id="avatar"
                src={$ourData.avatar}
                alt={`${$ourData.username}'s avatar`}
                draggable={false}
            />
        {:else}
            <svg
                id="avatar"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 256 256"
                ><path
                    fill="var(--text)"
                    d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0ZM96 120a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm97.76 66.41a79.66 79.66 0 0 0-36.06-28.75a48 48 0 1 0-59.4 0a79.66 79.66 0 0 0-36.06 28.75a88 88 0 1 1 131.52 0Z"
                /></svg
            >
        {/if}

        <textarea
            bind:this={input}
            bind:value={content}
            placeholder={`What\'s up, ${$ourData.username}?`}
            maxlength={500}
        />
    </div>

    <div class="bottom-container">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            on:click={addImage}
            on:keydown={addImage}
            ><path
                fill="var(--branding)"
                fill-rule="evenodd"
                d="M3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464ZM16 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm-9.68 3.104a1.55 1.55 0 0 1 2.184.073l2.648 2.81a2.294 2.294 0 0 0 3.042.266a1.567 1.567 0 0 1 2.02.123l2.268 2.166a.75.75 0 0 0 1.036-1.084L17.25 15.29a3.067 3.067 0 0 0-3.953-.24a.795.795 0 0 1-1.054-.093l-2.647-2.81a3.05 3.05 0 0 0-4.296-.143l-.81.752a.75.75 0 1 0 1.02 1.1l.81-.753Z"
                clip-rule="evenodd"
            /></svg
        >

        <svg
            id="gif"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            on:click={addGif}
            on:keydown={addGif}
            ><g fill="var(--branding)"
                ><path
                    fill-rule="evenodd"
                    d="M15.328 7.542H8.672c-3.374 0-5.062 0-6.01.987c-.948.987-.725 2.511-.278 5.56l.422 2.892c.35 2.391.525 3.587 1.422 4.303c.898.716 2.22.716 4.867.716h5.81c2.646 0 3.97 0 4.867-.716c.897-.716 1.072-1.912 1.422-4.303l.422-2.892c.447-3.049.67-4.573-.278-5.56c-.948-.987-2.636-.987-6.01-.987Zm-.747 8.252c.559-.346.559-1.242 0-1.588l-3.371-2.09c-.543-.337-1.21.101-1.21.794v4.18c0 .693.667 1.13 1.21.794l3.371-2.09Z"
                    clip-rule="evenodd"
                /><path
                    d="M8.51 2h6.98c.232 0 .41 0 .566.015c1.108.109 2.015.775 2.4 1.672H5.543c.384-.897 1.291-1.563 2.399-1.672C8.099 2 8.277 2 8.51 2Z"
                    opacity=".4"
                /><path
                    d="M6.31 4.723c-1.39 0-2.53.84-2.911 1.953a2.587 2.587 0 0 0-.023.07c.398-.12.812-.199 1.232-.253c1.08-.138 2.446-.138 4.032-.138h6.892c1.586 0 2.951 0 4.032.138a7.69 7.69 0 0 1 1.232.253a2.453 2.453 0 0 0-.023-.07c-.38-1.114-1.521-1.953-2.912-1.953H6.311Z"
                    opacity=".7"
                /></g
            ></svg
        >

        <span id="placeholder" />

        {#if content.length > 0}
            <h1 id="max">{content.length} / 500</h1>
        {/if}

        <button bind:this={share} on:click={sharePost}>Share</button>
    </div>
</div>

<style>
    .post-container {
        width: 600px;
        display: flex;
        flex-direction: column;
        align-items: start;
        align-self: center;
        margin-top: 0px;
        cursor: default;
        padding-bottom: 5px;
        border: 1px solid var(--primary);
        border-top: none;
        padding-left: 15px;
        padding-right: 15px;
        transition: 150ms background;
        margin-top: 65px;
        z-index: 0;
    }

    .first-container {
        display: flex;
        align-items: center;
        justify-content: start;
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    .bottom-container {
        width: calc(100% - 40px);
        display: flex;
        align-items: end;
        justify-content: start;
        padding-top: 5px;
        padding-bottom: 10px;
        margin-left: calc(40px);
    }

    #avatar {
        width: 40px;
        height: 40px;
        border-radius: 30px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: 150ms;
    }

    #max {
        margin: 0;
        font-size: 0.9rem;
        margin-right: 10px;
        color: var(--text_gray);
    }

    #placeholder {
        flex: 1;
    }

    textarea {
        background: transparent;
        width: 100%;
        max-width: 500px;
        color: var(--text);
        margin: 0;
        font-size: 1.2rem;
        text-align: start;
        margin-left: 7px;
        margin-top: 20px;
        min-height: 55px;
        max-height: 400px;
        transition: none;
    }

    textarea:disabled {
        background: transparent;
        opacity: 0.5;
    }

    button {
        background: var(--branding);
        transition: 150ms;
        width: 70px;
        font-size: 1rem;
        box-shadow: none;
        border-radius: 15px;
    }

    button:hover {
        background: var(--branding_darken);
    }

    button:active {
        opacity: 0.75;
    }

    button:disabled {
        opacity: 0.75;
        cursor: default;
    }

    button:disabled:hover {
        background: var(--branding);
    }

    svg {
        width: 34px;
        height: 34px;
        padding: 6px;
        margin-right: 2.5px;
        margin-left: 2.5px;
        margin-bottom: 3px;
        border-radius: 15px;
    }

    svg:hover {
        background: var(--branding_trans);
    }
</style>
