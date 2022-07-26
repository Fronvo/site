<script lang="ts">
    import { modalVisible } from 'stores/app/main';
    import { socket } from 'stores/global';
    import { fade } from 'svelte/transition';
    import { loadProfilePanel } from 'utilities/app/profile';

    let title: string;
    let content: string;
    let isSharing = false;
    let errorMessage: string;

    function sharePost(): void {
        if (isSharing) return;

        isSharing = true;

        socket.emit(
            'createPost',
            {
                title,
                content,
            },
            ({ err }) => {
                if (err) {
                    errorMessage = err.msg;
                    isSharing = false;

                    return;
                }

                // Update, new posts
                loadProfilePanel();

                $modalVisible = false;
            }
        );
    }
</script>

<div class="edit-container">
    <div class="header-container">
        <h1 id="header">Create Post</h1>
    </div>

    <hr />

    <div class="data-container">
        {#if errorMessage}
            <h1 id="error-header" in:fade={{ duration: 500 }}>
                {errorMessage}
            </h1>
        {/if}

        <h1 id="input-header">Title</h1>
        <input bind:value={title} maxlength={50} />

        <h1 id="input-header">Content</h1>
        <textarea bind:value={content} maxlength={256} rows={6} />
    </div>

    <div class="options-container">
        <button on:click={sharePost}>Share</button>

        <button
            on:click={() => {
                if (!isSharing) $modalVisible = false;
            }}>Discard</button
        >
    </div>
</div>

<style>
    hr {
        width: 100px;
    }

    .edit-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        align-items: center;
    }

    .header-container {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .header-container #header {
        font-size: 3rem;
        margin: 0;
        padding-right: 5px;
    }

    .data-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        width: 50%;
        min-width: 500px;
    }

    .data-container #error-header {
        color: red;
        font-size: 2rem;
        margin: 0;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
    }

    .data-container #input-header {
        color: var(--theme-profile_info_color);
        margin: 0;
        font-size: 2.2rem;
    }

    .data-container input,
    .data-container textarea {
        font-size: 2rem;
        margin: 0 5px 20px 5px;
        width: 95%;
        background: var(--theme-modal_input_bg_color);
    }

    .options-container {
        display: flex;
        margin-bottom: 15px;
        margin-top: 50px;
    }

    .options-container button {
        font-size: 2.2rem;
        margin-right: 20px;
    }

    @media screen and (max-width: 720px) {
        .header-container #header {
            font-size: 2.4rem;
        }

        .data-container {
            width: 400px;
            min-width: auto;
        }

        .data-container #error-header {
            font-size: 1.7rem;
        }

        .data-container #input-header {
            font-size: 1.7rem;
        }

        .data-container input,
        .data-container textarea {
            font-size: 1.7rem;
        }

        .options-container button {
            font-size: 1.8rem;
            cursor: default;
        }
    }

    @media screen and (max-width: 520px) {
        .header-container #header {
            font-size: 2rem;
        }

        .data-container {
            width: 300px;
        }

        .data-container #error-header {
            font-size: 1.4rem;
        }

        .data-container #input-header {
            font-size: 1.4rem;
        }

        .data-container input,
        .data-container textarea {
            font-size: 1.4rem;
        }

        .options-container button {
            font-size: 1.5rem;
            margin-top: 5px;
        }
    }
</style>
