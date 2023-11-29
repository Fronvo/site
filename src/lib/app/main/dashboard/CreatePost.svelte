<script lang="ts">
    import { DropdownTypes } from 'stores/dropdowns';
    import { homePosts } from 'stores/home';
    import { cachedAccountData, socket } from 'stores/main';
    import {
        ModalTypes,
        targetImageModal,
        targetTenorCallback,
    } from 'stores/modals';
    import { ourData } from 'stores/profile';
    import { onMount } from 'svelte';
    import { toast } from 'svelte-sonner';
    import { scale } from 'svelte/transition';
    import { isAcceptedImage, showDropdown, showModal } from 'utilities/main';
    import { loadProfile } from 'utilities/profile';
    import { uploadImage } from 'utilities/rooms';

    let content = '';
    let attachment = '';
    let attachmentBase64: any;
    let gif = '';

    let input: HTMLTextAreaElement;
    let share: HTMLButtonElement;
    let gifElement: HTMLDivElement;

    function addImage(): void {
        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = async (_) => {
            let file = Array.from(input.files)[0];

            if (file.size > ($ourData.isPRO ? 3000000 : 1000000)) {
                toast(`Image is above ${$ourData.isPRO ? 3 : 1}MB.`);
                return;
            }

            if (isAcceptedImage(file.type)) {
                // One of each
                gif = '';

                attachment = window.URL.createObjectURL(file);

                const reader = new FileReader();

                reader.addEventListener('load', async () => {
                    attachmentBase64 = reader.result;

                    setTimeout(() => {
                        share.disabled = false;
                    }, 0);
                });

                reader.readAsDataURL(file);
            } else {
                toast('Unsupported file type.');
            }
        };

        input.click();
    }

    function setupImagePasting(): void {
        setTimeout(() => {
            if (!input) return;

            input.addEventListener('paste', (ev) => {
                if (ev.clipboardData.files.length > 0) {
                    const file = ev.clipboardData.files[0];

                    if (file.size > ($ourData.isPRO ? 3000000 : 1000000)) {
                        toast(`Image is above ${$ourData.isPRO ? 3 : 1}MB.`);
                        return;
                    }

                    if (isAcceptedImage(file.type)) {
                        // One of each
                        gif = '';

                        attachment = window.URL.createObjectURL(file);

                        const reader = new FileReader();

                        reader.addEventListener('load', async () => {
                            attachmentBase64 = reader.result;

                            setTimeout(() => {
                                share.disabled = false;
                            }, 0);
                        });

                        reader.readAsDataURL(file);
                    } else {
                        toast('Unsupported file type.');
                    }
                }
            });
        }, 0);
    }

    function addGif(): void {
        $targetTenorCallback = (url: string) => {
            // One of each
            attachment = '';

            gif = url;

            setTimeout(() => {
                share.disabled = false;
            }, 0);
        };

        showDropdown(DropdownTypes.Gif, gifElement, 'bottom', -25, 12);
    }

    function showImage(): void {
        $targetImageModal = attachment;

        showModal(ModalTypes.Image);
    }

    function showGif(): void {
        $targetImageModal = gif;

        showModal(ModalTypes.Image);
    }

    function resetMedia(): void {
        attachment = '';
        attachmentBase64 = '';
        gif = '';

        setTimeout(() => {
            if (content.length == 0) {
                share.disabled = true;
            }
        }, 0);
    }

    async function sharePost(): Promise<void> {
        if (input.disabled) return;

        input.disabled = true;
        share.disabled = true;

        socket.emit('canPost', async ({ canPost }) => {
            if (!canPost) {
                input.disabled = false;
                share.disabled = false;

                showModal(ModalTypes.GoPRO);
            } else {
                socket.emit(
                    'sharePost',
                    {
                        content,
                        attachment: attachmentBase64
                            ? await uploadImage(
                                  attachmentBase64,
                                  $ourData.isPRO
                              )
                            : '',
                        gif,
                    },
                    () => {
                        input.value = '';
                        input.disabled = false;

                        gif = '';
                        attachment = '';
                        attachmentBase64 = '';

                        loadProfile($cachedAccountData);
                    }
                );
            }
        });
    }

    onMount(() => {
        if (input) {
            input.style.height = '55px';
            input.style.height = `${input.scrollHeight}px`;

            input.onkeydown = (ev) => {
                setTimeout(() => {
                    if (ev.ctrlKey) return;

                    if (content.length > 0) {
                        share.disabled = false;
                    } else {
                        share.disabled = true;
                    }

                    input.style.height = '55px';
                    input.style.height = `${input.scrollHeight}px`;
                }, 0);
            };

            setupImagePasting();
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
            <img
                id="avatar"
                src={'/images/avatar.svg'}
                alt={`${$ourData.username}'s avatar`}
                draggable={false}
            />
        {/if}

        <textarea
            bind:this={input}
            bind:value={content}
            placeholder={`What\'s up, ${$ourData.username}?`}
            maxlength={500}
        />
    </div>

    {#if attachment}
        <img
            in:scale={{ duration: 250, start: 0.95 }}
            id="media-img"
            src={attachment}
            alt="Post attachment"
            draggable={false}
            on:click={showImage}
            on:keydown={showImage}
        />
    {:else if gif}
        <img
            in:scale={{ duration: 250, start: 0.95 }}
            id="media-img"
            src={gif}
            alt="Post GIF"
            draggable={false}
            on:click={showGif}
            on:keydown={showGif}
        />
    {/if}

    <div class="bottom-container">
        <div class="action" on:click={addImage} on:keydown={addImage}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><path
                    fill-rule="evenodd"
                    d="M3.464 3.464C2 4.93 2 7.286 2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22c4.714 0 7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464ZM16 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm-9.68 3.104a1.55 1.55 0 0 1 2.184.073l2.648 2.81a2.294 2.294 0 0 0 3.042.266a1.567 1.567 0 0 1 2.02.123l2.268 2.166a.75.75 0 0 0 1.036-1.084L17.25 15.29a3.067 3.067 0 0 0-3.953-.24a.795.795 0 0 1-1.054-.093l-2.647-2.81a3.05 3.05 0 0 0-4.296-.143l-.81.752a.75.75 0 1 0 1.02 1.1l.81-.753Z"
                    clip-rule="evenodd"
                /></svg
            >

            <h1>Add image</h1>
        </div>

        <div
            class="action"
            on:click={addGif}
            on:keydown={addGif}
            bind:this={gifElement}
        >
            <svg
                id="gif"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                ><g
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

            <h1>Search for GIFs</h1>
        </div>

        {#if gif || attachment}
            <div
                class="action danger"
                on:click={resetMedia}
                on:keydown={resetMedia}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    ><path
                        fill-rule="evenodd"
                        d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd"
                    /></svg
                >

                <h1>Clear media</h1>
            </div>
        {/if}

        <span id="placeholder" />

        {#if content.length > 0}
            <h1 id="max">{content.length} / 500</h1>
        {/if}

        <button bind:this={share} on:click={sharePost}
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                ><path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M12 15.75a.75.75 0 0 0 .75-.75V4.027l1.68 1.961a.75.75 0 1 0 1.14-.976l-3-3.5a.75.75 0 0 0-1.14 0l-3 3.5a.75.75 0 1 0 1.14.976l1.68-1.96V15c0 .414.336.75.75.75Z"
                    clip-rule="evenodd"
                /><path
                    fill="currentColor"
                    d="M16 9c-.702 0-1.053 0-1.306.169a1 1 0 0 0-.275.275c-.169.253-.169.604-.169 1.306V15a2.25 2.25 0 1 1-4.5 0v-4.25c0-.702 0-1.053-.169-1.306a1 1 0 0 0-.275-.275C9.053 9 8.702 9 8 9c-2.828 0-4.243 0-5.121.879C2 10.757 2 12.17 2 14.999v1c0 2.83 0 4.243.879 5.122C3.757 22 5.172 22 8 22h8c2.828 0 4.243 0 5.121-.879C22 20.242 22 18.828 22 16v-1c0-2.829 0-4.243-.879-5.121C20.243 9 18.828 9 16 9Z"
                /></svg
            >
            Share</button
        >
    </div>
</div>

<style>
    .post-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        align-self: center;
        cursor: default;
        padding-bottom: 5px;
        border-bottom: 2px solid var(--primary);
        box-shadow: 0 0 5px var(--bg);
        padding-left: 15px;
        padding-right: 15px;
        z-index: 0;
    }

    .first-container {
        display: flex;
        align-items: center;
        justify-content: start;
        width: 100%;
        height: 100%;
    }

    .bottom-container {
        width: calc(100% - 60px);
        display: flex;
        align-items: end;
        justify-content: start;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-left: calc(52px);
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

    #media-img {
        max-height: 600px;
        border-radius: 7px;
        border: 1px solid var(--primary);
        cursor: pointer;
        margin-top: 10px;
        margin-left: 50px;
        max-width: 515px;
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
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--branding);
        transition: 150ms;
        width: 100px;
        font-size: 1rem;
        font-weight: 600;
        box-shadow: none;
        border-radius: 7px;
        color: white;
    }

    button svg {
        width: 24px;
        height: 24px;
        margin-right: 5px;
    }

    button:hover {
        color: white;
        background: var(--branding_darken);
    }

    button:active {
        opacity: 0.75;
    }

    button:disabled {
        opacity: 0.75;
        cursor: default;
    }

    button:disabled svg {
        cursor: default;
    }

    button:disabled:hover {
        background: var(--branding);
    }

    .action {
        display: flex;
        align-items: center;
        background: var(--pro);
        border-radius: 7px;
        padding: 8px;
        margin-right: 10px;
        cursor: pointer;
        transition: 125ms;
        user-select: none;
    }

    .action:hover {
        box-shadow: 0 0 15px var(--pro);
    }

    .action:active {
        transform: translateY(2px);
    }

    .action svg {
        width: 24px;
        height: 24px;
        fill: white;
        margin-right: 5px;
    }

    .action h1 {
        margin: 0;
        font-size: 1rem;
        font-weight: 600;
        margin-right: 3px;
    }

    .danger {
        background: red;
    }

    .danger:hover {
        box-shadow: 0 0 15px red;
    }
</style>
